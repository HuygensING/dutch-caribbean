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

			fs = new FacetedSearch
				el: @$ config.facetedSearchElement
				baseUrl: config.facetedSearchHost
				searchUrl: config.searchPath
				defaultQuery:
					term: '*'
					typeString: 'person'
					sort: 'id'

			@