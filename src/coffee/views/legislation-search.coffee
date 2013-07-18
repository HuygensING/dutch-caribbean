define (require) ->
	config = require 'config'
	BaseView = require 'views/base'
	FacetedSearch = require 'faceted-search'
	Templates =
		Search: require 'text!html/faceted-search-and-results.html'

	resultsCache = require 'models/results-cache'

	class Search extends BaseView
		initialize: ->
			@render()

		renderResults: ->
			console.log @resultsCache

		render: ->
			tpl = _.template Templates.Search
			@$el.html tpl type: 'LEGISLATION'

			legislationSearch = new FacetedSearch
				el: @$('.faceted-search')
				baseUrl: config.facetedSearchHost
				searchUrl: config.searchPath
				queryOptions:
					term: '*'
					typeString: config.resources.legislation.label
			legislationSearch.on 'faceted-search:results', (results) =>
				resultsCache.set 'archives', results
				console.log results

			@renderResults()

