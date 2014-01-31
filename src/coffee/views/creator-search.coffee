define (require) ->
	config = require 'config'
	SearchView = require 'views/base-search'
	FacetedSearch = require 'faceted-search'
	Templates =
		Search: require 'text!html/faceted-search-and-results.html'
		Results: require 'text!html/creator-results.html'

	class Search extends SearchView

		init: -> 
			super


		resultClicked: (ev) ->
			@publish 'navigate:entry', 'creator/'+ev.currentTarget.id

		resultsTemplate: _.template Templates.Results
		facetedSearch: new FacetedSearch
			name: 'creator'
			baseUrl: config.facetedSearchHost
			searchUrl: config.searchPath
			searchRequestOptions:
				headers:
					VRE_ID: 'DutchCaribbean'
			queryOptions:
				resultRows: config.resultRows
				term: '*'
				typeString: config.resources.creator.label
			excludeFacets: [
				'dynamic_s_begin_date'
				'dynamic_s_end_date'
			]
			facetOrder: [
				'dynamic_s_period'
				'dynamic_s_type'
				'dynamic_s_place'
				'dynamic_s_subject'
				'dynamic_s_person'
			]
			facetNameMap: config.facetNames
