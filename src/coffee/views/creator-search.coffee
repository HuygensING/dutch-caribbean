define (require) ->
	config = require 'config'
	BaseView = require 'views/base'
	FacetedSearch = require 'faceted-search'
	Templates =
		Search: require 'text!html/faceted-search-and-results.html'
		Results: require 'text!html/creator-results.html'

	resultsCache = require 'models/results-cache'

	class Search extends BaseView
		events: ->
			'click .results .body li': 'resultClicked'
			'click .results .next': 'nextResults'
			'click .results .previous': 'previousResults'
			'change .sort select': 'sortResults'

		resultClicked: (ev) ->
			@publish 'navigate:entry', 'creator/'+ev.currentTarget.id
		nextResults: ->
			@creatorSearch.next()
		previousResults: ->
			@creatorSearch.prev()
		sortResults: (e) ->
			@sortBy = $(e.currentTarget).val()
			@creatorSearch.sortResultsBy(@sortBy)

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
			# console.log response
			@$('.results h3').html response.numFound + ' creators'
			rtpl = _.template Templates.Results
			@$('.results .body').html rtpl results: response.results
			@$('.results .cursor .next').toggle @creatorSearch.hasNext()
			@$('.results .cursor .previous').toggle @creatorSearch.hasPrev()

		render: ->
			tpl = _.template Templates.Search
			@$el.html tpl type: 'CREATOR'

			@creatorSearch = new FacetedSearch
				el: @$('.faceted-search')
				baseUrl: config.facetedSearchHost
				searchUrl: config.searchPath
				queryOptions:
					resultRows: config.resultRows
					term: '*'
					typeString: config.resources.creator.label
					sort: 'id'

			firstTime = true

			@creatorSearch.on 'faceted-search:results', (response) =>
				# resultsCache.set 'archives', response
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
				order = ['facet_s_begin_date', 'facet_s_end_date', 'facet_s_type', 'facet_s_place', 'facet_s_subject', 'facet_s_person']

				for facetName in order.reverse()
					@$('.facets').prepend @$('h3[data-name="'+facetName+'"]').parents('.facet')