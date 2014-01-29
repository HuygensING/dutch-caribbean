define (require) ->
	config =
		debug: false
		appRootElement: '#app'
		homeElement: '#app'
		resultRows: 15
		facetedSearchHost: 'http://test-database.dutch-caribbean.huygens.knaw.nl/api/search'
		# facetedSearchHost: 'http://dc.dev/api/search'
		searchPath: 'search'
		archiverURL: (id) -> "/creator/#{id}"
		archiverResultsURL: "/creator/results"
		archiveURL: (id) -> "/archive/#{id}"
		archiveResultsURL: "/archive/results"
		legislationURL: (id) -> "/legislation/#{id}"
		legislationResultsURL: "/legislation/results"
		abbreviationsURL: "http://dutch-caribbean.huygens.knaw.nl/wp-content/uploads/2013/08/Afkortingen-Caribische-Wereld.pdf"		
		facetNames:
			dynamic_s_refcode: 'Code Repository'
			dynamic_s_subject: 'Subject'
			dynamic_s_person: 'Person'
			dynamic_s_place: 'Geography'
			dynamic_s_date: 'Date'
			dynamic_s_begin_date: 'Begin date'
			dynamic_s_end_date: 'End date'
			dynamic_s_type: 'Identity type'
			dynamic_sort_text: 'Text'
			dynamic_s_period: 'Period'
		sortableFieldNames:
			dynamic_sort_date: 'Date'
			dynamic_sort_title: 'Title'
			dynamic_sort_name: 'Name'
			dynamic_sort_period: 'Period'
		resources:
			legislation:
				label: 'dcarlegislation'
			archive:
				label: 'dcararchive'
			creator:
				label: 'dcararchiver'

	# config.baseURL = 'http://repository.huygens.knaw.nl'

	config.resources.legislation.url = (id) -> "#{config.facetedSearchHost}/../domain/dcarlegislations/#{id}"
	config.resources.archive.url = (id) -> "#{config.facetedSearchHost}/../domain/dcararchives/#{id}"
	config.resources.creator.url = (id) -> "#{config.facetedSearchHost}/../domain/dcararchivers/#{id}"

	config