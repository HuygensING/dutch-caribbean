module.exports = (grunt) ->

	##############
	### CONFIG ###
	##############

	grunt.initConfig
		connect:
			compiled:
				options:
					base: 'compiled'
					port: 9000
					livereload: true

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
		
		rsync:
			options:
				args: ["--verbose"]
				exclude: [".git*"]
				recursive: true
			compiled:
				options:
					src: ["./src/static/"]
					dest: "./compiled"

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
						'compiled/css/main.css'
						'compiled/lib/faceted-search/compiled/css/main.css'
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
