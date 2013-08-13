define (require) ->
	config = require 'config'
	SearchView = require 'views/search'
	FacetedSearch = require 'faceted-search'
	Templates =
		Search: require 'text!html/faceted-search-and-results.html'
		Results: require 'text!html/creator-results.html'

	class Search extends SearchView
		resultClicked: (ev) ->
			@publish 'navigate:entry', 'creator/'+ev.currentTarget.id

		resultsTemplate: _.template Templates.Results
		facetedSearch: new FacetedSearch
			name: 'creator'
			baseUrl: config.facetedSearchHost
			searchUrl: config.searchPath
			queryOptions:
				resultRows: config.resultRows
				term: '*'
				typeString: config.resources.creator.label
				sort: 'facet_sort_name'
			excludeFacets: [
				'facet_s_begin_date'
				'facet_s_end_date'
			]
			facetOrder: [
				'facet_s_period'
				'facet_s_begin_date'
				'facet_s_end_date'
				'facet_s_type'
				'facet_s_place'
				'facet_s_subject'
				'facet_s_person'
			]
			facetTitles: config.facetNames
