define (require) ->
	Backbone = require 'backbone'
	viewManager = require 'managers/view'
	Pubsub = require 'pubsub'
	currentUser = require 'models/currentUser'

	Views =
		Home: require 'views/home'
		Creator: require 'views/creator'
		Archive: require 'views/archive'
		Legislation: require 'views/legislation'

	class MainRouter extends Backbone.Router
		view: null
		query: {}

		show: (route, params) ->
			viewManager.clear() # Empty the viewManager before initializing new views
			viewManager.show new @view @query

			@query = {}

		initialize: ->
			_.extend @, Pubsub
			@on 'route', @show, @

		'routes':
			'': 'home'
			'creator/results': 'home_creator'
			'creator/:id': 'creator'
			'archive/results': 'home_archive'
			'archive/:id': 'archive'
			'legislation/results': 'home_legislation'
			'legislation/:id': 'legislation'

		home: ->
			@view = Views.Home

		creator: (id) ->
			@view = Views.Creator
			@query =
				id: id

		archive: (id) ->
			@view = Views.Archive
			@query =
				id: id

		legislation: (id) ->
			@view = Views.Legislation
			@query =
				id: id