define (require) ->
	config = require 'config'
	# router = require 'routers/main'

	pubsub = require 'managers/pubsub'

	BaseView = require 'views/base'
	FacetedSearch = require 'faceted-search'
	Templates =
		Home: require 'text!html/home.html'

	Views =
		ArchiveSearch: require 'views/archive-search'
		CreatorSearch: require 'views/creator-search'
		LegislationSearch: require 'views/legislation-search'

	resultsCache = require 'models/results-cache'

	class Home extends Backbone.View
		events:
			'click .tabs li.archives': 'showArchives'
			'click .tabs li.creators': 'showCreators'
			'click .tabs li.legislations': 'showLegislation'

		initialize: (options) ->
			super

			_.extend @, pubsub

			@activeTab = if options?.activeTab then options.activeTab else 'archive'
			@render()

		showTab: (tab) ->
			@showActive(tab || 'archive')
			# @navigate "/#{tab}/results"
			if tab
				@publish 'navigate:url', "/#{tab}/results"

		showArchives: ->
			@showActive('archive')
			@publish 'navigate:url', '/archive/results'
		showCreators: ->
			@showActive('creator')
			@publish 'navigate:url', '/creator/results'
		showLegislation: ->
			@showActive('legislation')
			@publish 'navigate:url', '/legislation/results'

		showActive: (cls) ->
			@$(".search-views > div:not(.#{cls}s.search)").hide()
			@$(".search-views .#{cls}s.search").show()
			@$('.tabs li').removeClass('active').filter(".#{cls}s").addClass('active')

		render: ->
			tpl = _.template Templates.Home
			@$el.html tpl()

			new Views.ArchiveSearch el: @$('.archives.search')
			new Views.CreatorSearch el: @$('.creators.search')
			new Views.LegislationSearch el: @$('.legislations.search')

			@$(".search-views > .search:not(#{@activeTab})").hide()
			@$(".tabs li#{@activeTab}").addClass 'active'

			@