define (require) ->
	Backbone = require 'backbone'
	Pubsub = require 'pubsub'
	currentUser = require 'models/currentUser'

	Views =
		Home: require 'views/home'
		Creator: require 'views/creator'
		Archive: require 'views/archive'
		Legislation: require 'views/legislation'

	home = new Views.Home el: '#home'

	class MainRouter extends Backbone.Router
		initialize: ->
			_.extend @, Pubsub
			@on 'route', @show, @

			@subscribe 'navigate:entry', (route) => @navigate route, trigger: true
			@subscribe 'navigate:url', (url) => @navigate url

		'routes':
			'creator/results': 'home_creator'
			'creator/:id': 'creator'
			'archive/results': 'home_archive'
			'archive/:id': 'archive'
			'legislation/results': 'home_legislation'
			'legislation/:id': 'legislation'
			'': 'home'

		home: ->
			@showHome()

		home_creator: ->
			@showHome('creator')
		home_archive: ->
			@showHome('archive')
		home_legislation: ->
			@showHome('legislation')

		creator: (id) ->
			@showFiche Views.Creator, id: id
		archive: (id) ->
			@showFiche Views.Archive, id: id
		legislation: (id) ->
			@showFiche Views.Legislation, id: id

		showHome: (activeTab) ->
			$('#fiche').hide()
			
			home.showTab activeTab
			# @navigate "/#{activeTab}/results"
			$('#home').show()

		showFiche: (view, options) ->
			$('#home').hide()
			v = new view _.extend(options, el: '#fiche')
			v.render()
			$('#fiche').show()