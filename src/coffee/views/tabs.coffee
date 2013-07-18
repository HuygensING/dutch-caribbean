define (require) ->
	Backbone = require 'backbone'

	class TabsList extends Backbone.View
		initialize: ->
			@render()

		render: ->
			