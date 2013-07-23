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

		renderResults: (response) ->
			# console.log response
			@$('.results h3').html response.numFound + ' Archives found'

			ul = document.createElement('ul')
			_.each response.results, (result) =>
				li = document.createElement 'li'
				li.innerHTML = result.nameEng
				li.id = result._id
				small = document.createElement 'small'
				small.innerHTML = '('+result.beginDate+'-'+result.endDate+')'
				li.appendChild small
				ul.appendChild li

			@$('.results .body').html ul

		render: ->
			tpl = _.template Templates.Search
			@$el.html tpl type: 'CREATOR'

			creatorSearch = new FacetedSearch
				el: @$('.faceted-search')
				baseUrl: config.facetedSearchHost
				searchUrl: config.searchPath
				queryOptions:
					term: '*'
					typeString: config.resources.creator.label
					sort: 'id'

			creatorSearch.on 'faceted-search:results', (response) =>
				# resultsCache.set 'archives', response
				@renderResults response