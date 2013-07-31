define (require) ->
	config = require 'config'
	BaseView = require 'views/base'

	Models =
		Archive: require 'models/archive'

	Templates =
		Archive: require 'text!html/archive.html'

	class Archive extends BaseView
		className: 'fiche'
		initialize: (options) ->
			# console.log 'init'
			super

			if options and options.id?
				console.log "New Archive", @options.id
				@model = new Models.Archive _id: options.id
				@model.fetch()

			@model.on 'sync', @render, @

		render: ->
			tmpl = _.template Templates.Archive
			console.log @model.attributes
			@$el.html tmpl
				data: @model.attributes
				model: @model
				config: config
