define (require) ->
	Backbone = require 'backbone'
	config = require 'config'

	class Person extends Backbone.Model
		idAttribute: '_id'
		url: -> config.resources.archive.url(@id)
		initialize: ->
			@fetch if @id