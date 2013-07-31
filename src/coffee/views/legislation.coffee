define (require) ->
	config = require 'config'
	BaseView = require 'views/base'

	Models =
		Legislation: require 'models/legislation'

	Templates =
		Legislation: require 'text!html/legislation.html'

	class Legislation extends BaseView
		className: 'fiche'
		initialize: (options) ->
			super

			if options and options.id?
				@model = new Models.Legislation
					_id: options.id
				@model.fetch()
			@model.on 'sync', @render, @
			@render()

		render: ->
			console.log "LEG", @$el, @model.attributes
			tmpl = _.template Templates.Legislation
			@$el.html tmpl
				data: @model.attributes
				config: config