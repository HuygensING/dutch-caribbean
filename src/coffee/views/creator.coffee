define (require) ->
	config = require 'config'
	BaseView = require 'views/base'

	Models =
		Creator: require 'models/creator'

	Templates =
		Creator: require 'text!html/creator.html'

	class Creator extends BaseView
		className: 'fiche'
		initialize: (options) ->
			super

			if options and options.id?
				console.log "New Creator", options.id
				@model = new Models.Creator
					_id: options.id
				@model.fetch()
			@model.on 'sync', @render, @

			@render()

		render: ->
			tmpl = _.template Templates.Creator
			@$el.html tmpl
				model: @model.attributes
				config: config
			console.log @model.attributes