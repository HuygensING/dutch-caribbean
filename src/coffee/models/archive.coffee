define (require) ->
	Backbone = require 'backbone'
	config = require 'config'

	class Person extends Backbone.Model
		idAttribute: '_id'
		url: -> config.resources.archive.url(@id)
		initialize: ->
			@fetch if @id
		reference: ->
			[@get('countries')?.join(' '), @get('refCodeArchive'), @get('refCode'), @get('subCode'), @get('itemNo') || @get('series')].join ' '