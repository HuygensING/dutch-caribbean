define (require) ->
	Backbone = require 'backbone'

	class ResultsList extends Backbone.View
		initialize: ->
			@render()

		render: ->
			@$('.results').html JSON.stringify @data