define (require) ->
	config = require 'config'
	$ = require 'jquery'
	BaseView = require 'views/base'
	FacetedSearch = require 'faceted-search'
	Templates =
		Search: require 'text!html/faceted-search-and-results.html'
		Results: require 'text!html/legislation-results.html'

	resultsCache = require 'models/results-cache'

	class Search extends BaseView
		events: ->
			'click .results .body li': 'resultClicked'
			'click .results .next': 'nextResults'
			'click .results .previous': 'previousResults'
			'change .sort select': 'sortResults'

		resultClicked: (ev) ->
			@publish 'navigate:entry', 'legislation/'+ev.currentTarget.id
		nextResults: ->
			@legislationSearch.next()
		previousResults: ->
			@legislationSearch.prev()
		sortResults: (e) ->
			@sortBy = $(e.currentTarget).val()
			@legislationSearch.sortResultsBy(@sortBy)

		initialize: ->
			super

			@render()

		renderSortableFields: ->
			if @sortableFields
				select = $('<select>')
				for f in @sortableFields
					option = $('<option>')
						.attr(value: f)
						.text(config.sortableFieldNames[f])
					option.attr('selected','selected') if @sortBy and @sortBy is f
					select.append(option)

				@$('.heading .sort').html select

			@

		renderResults: (response) ->
			@$('.results h3').html response.numFound + ' legislations'
			rtpl = _.template Templates.Results
			@$('.results .body').html rtpl results: response.results
			@$('.results .cursor .next').toggle @legislationSearch.hasNext()
			@$('.results .cursor .previous').toggle @legislationSearch.hasPrev()

		render: ->
			tpl = _.template Templates.Search
			@$el.html tpl type: 'LEGISLATION'

			firstTime = true

			@legislationSearch = new FacetedSearch
				el: @$('.faceted-search')
				baseUrl: config.facetedSearchHost
				searchUrl: config.searchPath
				queryOptions:
					resultRows: config.resultRows
					term: '*'
					typeString: config.resources.legislation.label
			@legislationSearch.on 'faceted-search:results', (response) =>
				# resultsCache.set 'archives', response
				# console.log firstTime
				if not firstTime
					if 'sortableFields' of response
						@sortableFields = response.sortableFields
					@renderResults response

				firstTime = false

				@renderSortableFields()

				### RENDER FACET TITLES ###
				_.each @$('.facet h3'), (h3) =>
					name = h3.getAttribute 'data-name'
					if name?
						h3.innerHTML = config.facetNames[name]

				### CHANGE FACET ORDER ###
				order = ['facet_s_date', 'facet_s_place', 'facet_s_subject', 'facet_s_person']

				for facetName in order.reverse()
					@$('.facets').prepend @$('h3[data-name="'+facetName+'"]').parents('.facet')