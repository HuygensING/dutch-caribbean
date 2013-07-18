define (require) ->
	config = require 'config'
	BaseView = require 'views/base'
	FacetedSearch = require 'faceted-search'
	Templates =
		Home: require 'text!html/home.html'

	class Home extends BaseView
		initialize: ->
			super
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
					typeString: config.resources.creator
					sort: 'id'
			creatorSearch.$el
			creatorSearch.on 'faceted-search:results', (results) =>
				console.log results

			@