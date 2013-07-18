define (require) ->
	config = require 'config'
	BaseView = require 'views/base'
	FacetedSearch = require 'faceted-search'
	Templates =
		Home: require 'text!html/home.html'

	resultsCache = require 'models/results-cache'

	class Home extends BaseView
		initialize: (options) ->
			super

			@activeTab = if options.activeTab then options.activeTab else '.creator-search'

			@render()

		render: ->
			tpl = _.template Templates.Home
			@$el.html tpl()

			creatorSearch = new FacetedSearch
				el: @$('.creator-search .faceted-search')
				baseUrl: config.facetedSearchHost
				searchUrl: config.searchPath
				queryOptions:
					term: '*'
					typeString: config.resources.creator.label
					sort: 'id'

			creatorSearch.on 'faceted-search:results', (results) =>
				resultsCache.set 'creators', results
				console.log results

			archiveSearch = new FacetedSearch
				el: @$('.archive-search .faceted-search')
				baseUrl: config.facetedSearchHost
				searchUrl: config.searchPath
				queryOptions:
					term: '*'
					typeString: config.resources.archive.label
					sort: 'id'
			archiveSearch.on 'faceted-search:results', (results) =>
				resultsCache.set 'archives', results
				console.log results

			legislationSearch = new FacetedSearch
				el: @$('.legislation-search .faceted-search')
				baseUrl: config.facetedSearchHost
				searchUrl: config.searchPath
				queryOptions:
					term: '*'
					typeString: config.resources.legislation.label

			@