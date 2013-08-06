define (require) ->
	Backbone = require 'backbone'

	class ResultsList extends Backbone.View
		initialize: ->
			@render()

		render: ->
			if JSON?
				@$('.results').html JSON.stringify @data