define (require) ->
	config =
		baseURL: 'http://demo17.huygens.knaw.nl/repository'
		appRootElement: '#app'
		homeElement: '#app'
		facetedSearchHost: 'http://demo17.huygens.knaw.nl/'
		searchPath: 'repository/search'
		resources:
			legislation:
				label: 'atlglegislation'
				url: ''
			archive:
				label: 'atlgarchive'
				url: ''
			creator:
				label: 'atlgarchiver'
				url: ''

	config.resources.legislation.url = (id) ->
		"#{config.baseURL}/resources/atlglegislation/#{id}"
	config.resources.archive.url = (id) ->
		"#{config.baseURL}/resources/atlgarchive/#{id}"
	config.resources.creator.url = (id) ->
		"#{config.baseURL}/resources/atlgarchiver/#{id}"

	config.archiverURL = (id) -> "/creator/#{id}"
	config.archiveURL = (id) -> "/archive/#{id}"
	config.legislation = (id) -> "/legislation/#{id}"

	config