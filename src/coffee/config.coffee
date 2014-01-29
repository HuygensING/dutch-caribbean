define (require) ->
	config =
		debug: false
		appRootElement: '#app'
		homeElement: '#app'
		resultRows: 15
		facetedSearchHost: 'http://dc.dev/api/search'
		searchPath: 'search'
		archiverURL: (id) -> "/creator/#{id}"
		archiverResultsURL: "/creator/results"
		archiveURL: (id) -> "/archive/#{id}"
		archiveResultsURL: "/archive/results"
		legislationURL: (id) -> "/legislation/#{id}"
		legislationResultsURL: "/legislation/results"
		abbreviationsURL: "http://dutch-caribbean.huygens.knaw.nl/wp-content/uploads/2013/08/Afkortingen-Caribische-Wereld.pdf"		
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