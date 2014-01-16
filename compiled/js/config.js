(function() {
  define(function(require) {
    var config;
    config = {
      debug: false,
      baseURL: 'http://database.dutch-caribbean.huygens.knaw.nl/api/',
      appRootElement: '#app',
      homeElement: '#app',
      resultRows: 15,
      facetedSearchHost: 'http://database.dutch-caribbean.huygens.knaw.nl/api/',
      searchPath: 'search',
      archiverURL: function(id) {
        return "/creator/" + id;
      },
      archiverResultsURL: "/creator/results",
      archiveURL: function(id) {
        return "/archive/" + id;
      },
      archiveResultsURL: "/archive/results",
      legislationURL: function(id) {
        return "/legislation/" + id;
      },
      legislationResultsURL: "/legislation/results",
      abbreviationsURL: "http://dutch-caribbean.huygens.knaw.nl/wp-content/uploads/2013/08/Afkortingen-Caribische-Wereld.pdf",
      facetNames: {
        facet_s_refcode: 'Code Repository',
        facet_s_subject: 'Subject',
        facet_s_person: 'Person',
        facet_s_place: 'Geography',
        facet_s_date: 'Date',
        facet_s_begin_date: 'Begin date',
        facet_s_end_date: 'End date',
        facet_s_type: 'Identity type',
        facet_sort_text: 'Text',
        facet_s_period: 'Period'
      },
      sortableFieldNames: {
        facet_sort_date: 'Date',
        facet_sort_title: 'Title',
        facet_sort_name: 'Name',
        facet_sort_period: 'Period'
      },
      resources: {
        legislation: {
          label: 'atlglegislation'
        },
        archive: {
          label: 'atlgarchive'
        },
        creator: {
          label: 'atlgarchiver'
        }
      }
    };
    config.resources.legislation.url = function(id) {
      return "" + config.baseURL + "/resources/atlglegislations/" + id;
    };
    config.resources.archive.url = function(id) {
      return "" + config.baseURL + "/resources/atlgarchives/" + id;
    };
    config.resources.creator.url = function(id) {
      return "" + config.baseURL + "/resources/atlgarchivers/" + id;
    };
    return config;
  });

}).call(this);
