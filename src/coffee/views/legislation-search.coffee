define (require) ->
	config = require 'config'
	SearchView = require 'views/search'
	FacetedSearch = require 'faceted-search'
	Templates =
		Search: require 'text!html/faceted-search-and-results.html'
		Results: require 'text!html/legislation-results.html'

	class Search extends SearchView
		resultClicked: (ev) ->
			@publish 'navigate:entry', 'legislation/'+ev.currentTarget.id

		resultsTemplate: _.template Templates.Results
		facetedSearch: new FacetedSearch
			name: 'legislation'
			baseUrl: config.facetedSearchHost
			searchUrl: config.searchPath
			queryOptions:
				resultRows: config.resultRows
				term: '*'
				typeString: config.resources.legislation.label
				sort: 'facet_sort_date'
			excludeFacets: [
				'facet_s_begin_date'
				'facet_s_end_date'
			]
			facetOrder: [
				'facet_s_period'
				'facet_s_date'
				'facet_s_place'
				'facet_s_subject'
				'facet_s_person'
			]
			facetTitles: config.facetNames
