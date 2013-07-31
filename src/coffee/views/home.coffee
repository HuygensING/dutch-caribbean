define (require) ->
	config = require 'config'
	# router = require 'routers/main'
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

			@activeTab = if options?.activeTab then options.activeTab else '.archives'
			@render()

		showArchives: ->
			@showActive('.archives')
		showCreators: ->
			@showActive('.creators')
		showLegislation: ->
			@showActive('.legislations')

		showActive: (cls) ->
			@$(".search-views > div:not(#{cls}.search)").hide()
			@$(".search-views #{cls}.search").show()
			@$('.tabs li').removeClass('active').filter(cls).addClass('active')

		render: ->
			tpl = _.template Templates.Home
			@$el.html tpl()

			new Views.ArchiveSearch el: @$('.archives.search')
			new Views.CreatorSearch el: @$('.creators.search')
			new Views.LegislationSearch el: @$('.legislations.search')

			@$(".search-views > .search:not(#{@activeTab})").hide()
			@$(".tabs li#{@activeTab}").addClass 'active'

			@