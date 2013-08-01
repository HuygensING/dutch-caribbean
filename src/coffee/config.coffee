define (require) ->
	config =
		baseURL: 'http://repository.huygens.knaw.nl/'
		appRootElement: '#app'
		homeElement: '#app'
		resultRows: 15
		facetedSearchHost: 'http://repository.huygens.knaw.nl/'
		searchPath: 'search'
		archiverURL: (id) -> "/creator/#{id}"
		archiverResultsURL: "/creator/results"
		archiveURL: (id) -> "/archive/#{id}"
		archiveResultsURL: "/archive/results"
		legislationURL: (id) -> "/legislation/#{id}"
		legislationResultsURL: "/legislation/results"
		facetNames:
			facet_s_refcode: 'Code Repository'
			facet_s_subject: 'Subject'
			facet_s_person: 'Person'
			facet_s_place: 'Geography'
			facet_s_date: 'Date'
			facet_s_begin_date: 'Begin date'
			facet_s_end_date: 'End date'
			facet_s_type: 'Identity type'
			facet_sort_text: 'Text'
			facet_s_period: 'Period'
		sortableFieldNames:
			facet_sort_date: 'Date'
			facet_sort_title: 'Title'
			facet_sort_name: 'Name'
			facet_sort_period: 'Period'
		resources:
			legislation:
				label: 'atlglegislation'
			archive:
				label: 'atlgarchive'
			creator:
				label: 'atlgarchiver'

	# config.baseURL = 'http://repository.huygens.knaw.nl'

	config.resources.legislation.url = (id) -> "#{config.baseURL}/resources/atlglegislations/#{id}"
	config.resources.archive.url = (id) -> "#{config.baseURL}/resources/atlgarchives/#{id}"
	config.resources.creator.url = (id) -> "#{config.baseURL}/resources/atlgarchivers/#{id}"

	config