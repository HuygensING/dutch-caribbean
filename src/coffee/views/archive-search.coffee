define (require) ->
	config = require 'config'
	SearchView = require 'views/search'
	FacetedSearch = require 'faceted-search'
	Templates =
		Search: require 'text!html/faceted-search-and-results.html'
		Results: require 'text!html/archive-results.html'

	class Search extends SearchView
		resultClicked: (ev) ->
			@publish 'navigate:entry', 'archive/'+ev.currentTarget.id

		resultsTemplate: _.template Templates.Results
		facetedSearch: new FacetedSearch
			baseUrl: config.facetedSearchHost
			searchUrl: config.searchPath
			queryOptions:
				resultRows: config.resultRows
				term: '*'
				typeString: config.resources.archive.label
				sort: 'facet_sort_title'
			excludeFacets: [
				'facet_s_begin_date'
				'facet_s_end_date'
			]
			facetOrder: [
				'facet_s_period'
				'facet_s_begin_date'
				'facet_s_end_date'
				'facet_s_place'
				'facet_s_subject'
				'facet_s_person'
				'facet_s_refcode'
			]
			facetTitles: config.facetNames