fs = require 'fs'
path = require 'path'
shell = require 'shelljs'
colors = require 'colors'

connect_middleware = (connect, options) ->
	[
		(req, res, next) ->
			contentTypesMap =
				'.html': 'text/html'
				'.css': 'text/css'
				'.js': 'application/javascript'
				'.map': 'application/javascript' # js source maps
				'.json': 'application/json'
				'.gif': 'image/gif'
				'.jpg': 'image/jpeg'
				'.jpeg': 'image/jpeg'
				'.png': 'image/png'
				'.ico': 'image/x-icon'
				'.ttf': 'application/octet-stream'

			sendFile = (reqUrl) ->
				filePath = path.join options.base, reqUrl
				console.log "Fetching #{filePath.green}"

				res.writeHead 200,
					'Content-Type': contentTypesMap[extName] || 'text/html'
					'Content-Length': fs.statSync(filePath).size

				readStream = fs.createReadStream filePath
				readStream.pipe res

			# Create a favicon on the fly if it does not exist
			if req.url is '/favicon.ico' and not fs.existsSync(options.base + req.url)
				fs.openSync options.base + req.url, 'w'
			
			extName = path.extname req.url
			if contentTypesMap[extName]?
				sendFile req.url
			else
				sendFile 'index.html'
	]

module.exports = (grunt) ->

	##############
	### CONFIG ###
	##############

	cfg =
		production:
			deployment:
				host: 'duca-fail'
				baseDir: '/data/duca'
		test:
			deployment:
				host: 'duca-test'
				baseDir: '/data/duca'

	grunt.initConfig
		connect:
			keepalive:
				options:
					port: 9000
					base: 'compiled'
					middleware: connect_middleware
					keepalive: true

		shell:
			'bower-install':
				command: 'bower install'
			'clear-stage':
				command: 'rm -rf stage/*'
			'clear-compiled':
				command:	'rm -rf compiled/*'

		coffee:
			compile:
				files: [
					expand: true
					cwd: 'src/coffee'
					src: '**/*.coffee'
					dest: 'compiled/js'
					rename: (dest, src) -> 
						dest + '/' + src.replace(/.coffee/, '.js') # Use rename to preserve multiple dots in filenames (nav.user.coffee => nav.user.js)
				]
				options:
					bare: false # UglyHack: set a property to its default value to be able to call coffee:compile

		jade:
			compile:
				files: [
					expand: true
					cwd: 'src/jade'
					src: '**/*.jade'
					dest: 'compiled/html'
					rename: (dest, src) -> 
						dest + '/' + src.replace(/.jade/, '.html') # Use rename to preserve multiple dots in filenames (nav.user.coffee => nav.user.js)
				,
					'compiled/index.html': 'src/index.jade'
				]
				options:
					pretty: true

		stylus:
			compile:
				options:
					paths: ['src/stylus/import']
					import: ['variables', 'functions']
				files:
					'compiled/css/project.css': [
						'src/stylus/**/*.styl'
						'!src/stylus/import/*.styl'
					]
		concat:
			css:
				src: [
					'compiled/lib/normalize-css/normalize.css'
					'compiled/lib/faceted-search/compiled/css/main.css'
					'compiled/css/project.css'
				]
				dest:
					'compiled/css/main.css'
			legacy:
				src: [
					'ie-compatibility.js'
					'json2.min.js'
					'stage/js/main.js'
					'jquery-ajaxhooks.min.js'
				]
				dest: 'stage/js/main.js'

		cssmin:
			stage:
				files:
					'stage/css/main.css': [
						'compiled/lib/normalize-css/normalize.css'
						'compiled/lib/faceted-search/compiled/css/main.css'
						'compiled/css/main.css'
					]

		replace:
			html:
				src: 'compiled/index.html'
				dest: 'stage/index.html'
				replacements: [
					{
						from: '<script data-main="/js/main" src="/lib/requirejs/require.js"></script>'
						to: '<script src="/js/main.js"></script>'
					}
					{
						from: '@@timestamp'
						to: (new Date).toString()
					}
				]

		rsync:
			options:
				args: ["--verbose", "-i"]
				exclude: [".git*"]
				recursive: true
			compiled:
				options:
					src: ["./src/static/"]
					dest: "./compiled"
			stage:
				options:
					src: "./src/static/"
					dest: "./stage"
			'deploy-test':
				options:
					syncDest: true
					syncDestIgnoreExcl: true
					src: "./stage/"
					dest: "#{cfg.test.deployment.host}:#{cfg.test.deployment.baseDir}/"
			'deploy-production':
				options:
					syncDest: true
					syncDestIgnoreExcl: true
					src: "./stage/"
					dest: "#{cfg.production.deployment.host}:#{cfg.production.deployment.baseDir}/"


		requirejs:
			compile:
				options:
					baseUrl: "compiled/js"
					name: '../lib/almond/almond'
					include: 'main'
					# insertRequire: ['main']
					# exclude: ['backbone', 'jquery', 'underscore', 'helpers/fns'] # Managers and helpers should be excluded, but how?
					preserveLicenseComments: false
					out: "stage/js/main.js"
					optimize: 'none'
					paths:
						'jquery': '../lib/jquery/jquery.min'
						'underscore': '../lib/underscore-amd/underscore'
						'backbone': '../lib/backbone-amd/backbone'
						'text': '../lib/requirejs-text/text'
						'domready': '../lib/requirejs-domready/domReady'
						'faceted-search': '../lib/faceted-search/stage/js/main'
						'es5-shim': '../lib/es5-shim/es5-shim.min'
						'managers': '../lib/managers/dev'
						'html': '../html'
					wrap: true

		watch:
			options:
				livereload: true
				nospawn: true
			coffee:
				files: 'src/coffee/**/*.coffee'
				tasks: 'coffee:compile'
			jade:
				files: ['src/index.jade', 'src/jade/**/*.jade']
				tasks: 'jade:compile'
			stylus:
				files: ['src/stylus/**/*.styl']
				tasks: ['stylus:compile', 'concat:css']

	#############
	### TASKS ###
	#############

	tasks = [
		'grunt-contrib-connect'
		'grunt-contrib-coffee'
		'grunt-contrib-stylus'
		'grunt-contrib-jade'
		'grunt-contrib-watch'
		'grunt-contrib-requirejs'
		'grunt-contrib-copy'
		'grunt-contrib-uglify'
		'grunt-contrib-cssmin'
		'grunt-contrib-concat'
		'grunt-rsync'
		'grunt-shell'
		'grunt-text-replace'
	]
	grunt.loadNpmTasks task for task in tasks

	grunt.registerTask 'default', ['connect', 'watch']
	grunt.registerTask 'compile', [
		'shell:clear-compiled'							# rm -rf compiled/
		# 'rsync:compiled'
		'shell:bower-install'								# Get dependencies first, cuz css needs to be included (and maybe images?)

		'coffee:compile'
			'jade:compile'
		'stylus:compile'
		
		'concat:css'
	]

	grunt.registerTask 'build', [
		'shell:clear-stage'
		'replace:html'											# Copy and replace index.html
		'cssmin:stage'
		'requirejs:compile' # Run r.js
		'rsync:stage'
	]

	grunt.registerTask 'deploy-test', [
		'build'
		'rsync:deploy-test'
	]

	##############
	### EVENTS ###
	##############

	grunt.event.on 'watch', (action, srcPath) ->
		if srcPath.substr(0, 3) is 'src' # Make sure file comes from src/		
			type = 'coffee' if srcPath.substr(-7) is '.coffee'
			type = 'jade' if srcPath.substr(-5) is '.jade'

			if type is 'coffee'
				destPath = 'compiled' + srcPath.replace(new RegExp(type, 'g'), 'js').substr(3);

			if type is 'jade'
				destPath = 'compiled' + srcPath.replace(new RegExp(type, 'g'), 'html').substr(3);

			if type? and action is 'changed' or action is 'added'
				data = {}
				data[destPath] = srcPath

				grunt.config [type, 'compile', 'files'], data

			if type? and action is 'deleted'
				grunt.file.delete destPath

		if srcPath.substr(0, 4) is 'test' and action is 'added'
			return false
