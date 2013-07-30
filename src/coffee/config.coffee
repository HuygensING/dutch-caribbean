define (require) ->
	config =
		baseURL: 'http://demo17.huygens.knaw.nl/repository'
		appRootElement: '#app'
		homeElement: '#app'
		facetedSearchHost: 'http://demo17.huygens.knaw.nl/'
		searchPath: 'repository/search'
		archiverURL: (id) -> "/creator/#{id}"
		archiveURL: (id) -> "/archive/#{id}"
		legislation: (id) -> "/legislation/#{id}"
		facetNames:
			facet_s_refcode: 'Refcode'
			facet_s_subject: 'Subject'
			facet_s_person: 'Person'
			facet_s_place: 'Geography'
			facet_s_date: 'Date'
			facet_s_begin_date: 'Begin date'
			facet_s_end_date: 'End date'
			facet_s_type: 'Identity type'
		resources:
			legislation:
				label: 'atlglegislation'
			archive:
				label: 'atlgarchive'
			creator:
				label: 'atlgarchiver'

	config.resources.legislation.url = (id) -> "#{config.baseURL}/resources/atlglegislations/#{id}"
	config.resources.archive.url = (id) -> "#{config.baseURL}/resources/atlgarchives/#{id}"
	config.resources.creator.url = (id) -> "#{config.baseURL}/resources/atlgarchivers/#{id}"

	config