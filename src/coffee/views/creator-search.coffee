define (require) ->
	config = require 'config'
	BaseView = require 'views/base'
	FacetedSearch = require 'faceted-search'
	Templates =
		Home: require 'text!html/faceted-search-and-results.html'

	resultsCache = require 'models/results-cache'

	class Search extends BaseView
		initialize: ->
			@render()
		render: ->
			tpl = _.template Templates.Home
			@$el.html tpl()

			creatorSearch = new FacetedSearch
				el: @$('.faceted-search')
				baseUrl: config.facetedSearchHost
				searchUrl: config.searchPath
				queryOptions:
					term: '*'
					typeString: config.resources.creator.label
					sort: 'id'

			creatorSearch.on 'faceted-search:results', (results) =>
				resultsCache.set 'creators', results
				@renderResults()
				console.log results