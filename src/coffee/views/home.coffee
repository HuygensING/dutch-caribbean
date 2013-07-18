define (require) ->
	config = require 'config'
	BaseView = require 'views/base'
	FacetedSearch = require 'faceted-search'
	Templates =
		Home: require 'text!html/home.html'

	Views =
		ArchiveSearch: require 'views/archive-search'
		CreatorSearch: require 'views/creator-search'
		LegislationSearch: require 'views/legislation-search'

	resultsCache = require 'models/results-cache'

	class Home extends BaseView
		events:
			'click .tabs li.archives': 'showArchives'
			'click .tabs li.creators': 'showCreators'
			'click .tabs li.legislation': 'showLegislation'

		initialize: (options) ->
			super

			@activeTab = if options.activeTab then options.activeTab else '.creator-search'
			@render()

		showArchives: ->
			@$('.search-views > div:not(.archive-search)').hide()
			@$('.search-views .archive-search').show()
			@$('.tabs li').removeClass('active').filter('.archives').addClass('active')

		showCreators: ->
			@$('.search-views > div:not(.creator-search)').hide()
			@$('.search-views .creator-search').show()
			@$('.tabs li').removeClass('active').filter('.creators').addClass('active')

		showLegislation: ->
			@$('.search-views > div:not(.legislation-search)').hide()
			@$('.search-views .legislation-search').show()
			@$('.tabs li').removeClass('active').filter('.legislation').addClass('active')

		render: ->
			tpl = _.template Templates.Home
			@$el.html tpl()

			new Views.ArchiveSearch el: @$('.archive-search')
			new Views.CreatorSearch el: @$('.creator-search')
			new Views.LegislationSearch el: @$('.legislation-search')

			@$('.creator-search, .legislation-search').hide()
			@$('.tabs li.archives').addClass('active')

			@