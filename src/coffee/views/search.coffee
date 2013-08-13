define (require) ->
	config = require 'config'
	BaseView = require 'views/base'
	FacetedSearch = require 'faceted-search'
	Templates =
		Search: require 'text!html/faceted-search-and-results.html'
		Results: require 'text!html/generic-results.html'

	resultsCache = require 'models/results-cache'

	class Search extends BaseView
		events: ->
			'click .results .body li': 'resultClicked'
			'click .results .next': 'nextResults'
			'click .results .previous': 'previousResults'
			'change .sort select': 'sortResults'

		nextResults: ->
			@search.next()
		previousResults: ->
			@search.prev()
		sortResults: (e) ->
			@sortField = $(e.currentTarget).val()
			@search.sortResultsBy(@sortField)

		initialize: (@options) ->
			super

			if not @resultsTemplate
				@resultsTemplate = _.template Templates.Results
			if not @searchTemplate
				@searchTemplate = _.template Templates.Search

			@firstTime = true
			@search = @options.facetedSearch || @facetedSearch
			@search.on 'faceted-search:results', (response) =>
				if @firstTime
					# render first time page
					console.log "First time!"
				else
					if 'sortableFields' of response
						@sortableFields = response.sortableFields
					@renderResults response
				@firstTime = false
				@renderSortableFields()

			@render()

		renderSortableFields: ->
			if @sortableFields
				select = $('<select>')
				for f in @sortableFields
					option = $('<option>')
						.attr(value: f)
						.text(config.sortableFieldNames[f])
					option.attr('selected','selected') if @sortField and @sortField is f
					select.append(option)

				@$('.heading .sort').empty().append '<span>Order by&nbsp;</span>'
				@$('.heading .sort').append select

			@

		renderResults: (response) ->
			@$('.empty').hide()
			@$('.results, .heading, .cursor, .body').show()
			@$('.results h3').html response.numFound + ' results'
			@$('.results .body').html @resultsTemplate results: response.results

			console.log "SEARCH IS >>>>> ", @search

			@$('.results .cursor .position .current').text @search.currentPosition()
			@$('.results .cursor .position .total').text @search.numPages()

			@$('.results .cursor .next').toggle @search.hasNext()
			@$('.results .cursor .previous').toggle @search.hasPrev()

		render: ->
			@$el.html @searchTemplate()
			@$('.faceted-search').html @search.$el
			@