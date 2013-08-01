define (require) ->
	Backbone = require 'backbone'
	MainRouter = require 'routers/main'

	initialize: ->
		Backbone.View.prototype.navigate = Backbone.history.navigate
		
		mainRouter = new MainRouter()
		
		Backbone.history.start pushState: true

		$(document).on 'click', 'a:not([target])', (e) ->
			href = $(@).attr 'href'
			
			if href?
				e.preventDefault()
				Backbone.history.navigate href, trigger: true