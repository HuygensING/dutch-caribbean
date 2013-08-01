define (require) ->
	config = require 'config'
	BaseView = require 'views/base'
	FacetedSearch = require 'faceted-search'
	Templates =
		Search: require 'text!html/faceted-search-and-results.html'
		Results: require 'text!html/archive-results.html'

	resultsCache = require 'models/results-cache'

	class Search extends BaseView

		events: ->
			'click .results .body li': 'resultClicked'
			'click .results .next': 'nextResults'
			'click .results .previous': 'previousResults'
			'change .sort select': 'sortResults'

		resultClicked: (ev) ->
			@publish 'navigate:entry', 'archive/'+ev.currentTarget.id
		nextResults: ->
			@archiveSearch.next()
		previousResults: ->
			@archiveSearch.prev()
		sortResults: (e) ->
			@sortBy = $(e.currentTarget).val()
			@archiveSearch.sortResultsBy(@sortBy)

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
			@$('.results h3').html response.numFound + ' archives'
			rtpl = _.template Templates.Results
			@$('.results .body').html rtpl results: response.results
			@$('.results .cursor .next').toggle @archiveSearch.hasNext()
			@$('.results .cursor .previous').toggle @archiveSearch.hasPrev()

		render: ->
			tpl = _.template Templates.Search
			@$el.html tpl type: 'ARCHIVE'

			@$('.results .cursor .next, .results .cursor .previous').hide()

			firstTime = true
	
			@archiveSearch = new FacetedSearch
				el: @$('.faceted-search')
				baseUrl: config.facetedSearchHost
				searchUrl: config.searchPath
				queryOptions:
					resultRows: config.resultRows
					term: '*'
					typeString: config.resources.archive.label
					sort: 'id'
				excludeFacets: [
					'facet_s_begin_date'
					'facet_s_end_date'
				]

			@archiveSearch.on 'faceted-search:results', (response) =>
				console.log response
				# resultsCache.set 'archives', response
				if not firstTime
					if 'sortableFields' of response
						@sortableFields = response.sortableFields
					@renderResults response

				firstTime = false

				@renderSortableFields()

				### RENDER FACET TITLES ###
				# console.log config
				_.each @$('.facet h3'), (h3) =>
					name = h3.getAttribute 'data-name'
					if name?
						h3.innerHTML = config.facetNames[name]

				### CHANGE FACET ORDER ###
				order = ['facet_s_period', 'facet_s_begin_date', 'facet_s_end_date', 'facet_s_place', 'facet_s_subject', 'facet_s_person', 'facet_s_refcode']

				for facetName in order.reverse()
					@$('.facets').prepend @$('h3[data-name="'+facetName+'"]').parents('.facet')