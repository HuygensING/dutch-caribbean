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

	home = new Views.Home el: '#home'

	class MainRouter extends Backbone.Router
		# view: null
		# query: {}

		# show: (route, params) ->
		# 	viewManager.clear() # Empty the viewManager before initializing new views
		# 	viewManager.show new @view @query

		# 	@query = {}

		initialize: ->
			_.extend @, Pubsub
			@on 'route', @show, @

			@subscribe 'navigate:entry', (route) => @navigate route, trigger: true

		'routes':
			'': 'home'
			'creator/results': 'home_creator'
			'creator/:id': 'creator'
			'archive/results': 'home_archive'
			'archive/:id': 'archive'
			'legislation/results': 'home_legislation'
			'legislation/:id': 'legislation'

		home: ->
			# @view = Views.Home
			# viewManager.show Views.Home
			@showHome()

		home_creator: ->
			@showHome('.creators')
		home_archive: ->
			@showHome('archives')
		home_legislation: ->
			@showHome()

		creator: (id) ->
			@showFiche Views.Creator, id: id
		archive: (id) ->
			@showFiche Views.Archive, id: id
		legislation: (id) ->
			@showFiche Views.Legislation, id: id

		showHome: (activeTab) ->
			$('#fiche').hide()
			$('#home').show()

		showFiche: (view, options) ->
			$('#home').hide()
			v = new view _.extend(options, el: '#fiche')
			v.render()
			$('#fiche').show()