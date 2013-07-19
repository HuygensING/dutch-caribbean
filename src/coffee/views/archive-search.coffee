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

		renderResults: (results) ->
			# console.log @resultsCache
			console.log results
			@$('.results').html 'myresults'

		render: ->
			tpl = _.template Templates.Search
			@$el.html tpl type: 'ARCHIVE'
	
			archiveSearch = new FacetedSearch
				el: @$('.faceted-search')
				baseUrl: config.facetedSearchHost
				searchUrl: config.searchPath
				queryOptions:
					term: '*'
					typeString: config.resources.archive.label
					sort: 'id'
			archiveSearch.on 'faceted-search:results', (results) =>
				resultsCache.set 'archives', results
				# console.log results
				@renderResults results

			# @renderResults()
			@$('button').click (ev) =>
				Backbone.history.navigate 'archive/AVE0000000077', trigger:true