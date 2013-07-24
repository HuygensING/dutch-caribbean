(function() {
  define(function(require) {
    var config;
    config = {
      baseURL: 'http://demo17.huygens.knaw.nl/repository',
      appRootElement: '#app',
      homeElement: '#app',
      facetedSearchHost: 'http://demo17.huygens.knaw.nl/',
      searchPath: 'repository/search',
      archiverURL: function(id) {
        return "/creator/" + id;
      },
      archiveURL: function(id) {
        return "/archive/" + id;
      },
      legislation: function(id) {
        return "/legislation/" + id;
      },
      facetNames: {
        facet_s_refcode: 'Refcode',
        facet_s_subject: 'Subject',
        facet_s_person: 'Person',
        facet_s_place: 'Geography',
        facet_s_date: 'Date',
        facet_s_begin_date: 'Begin date',
        facet_s_end_date: 'End date',
        facet_s_type: 'Identity type'
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
      return "" + config.baseURL + "/resources/atlglegislation/" + id;
    };
    config.resources.archive.url = function(id) {
      return "" + config.baseURL + "/resources/atlgarchive/" + id;
    };
    config.resources.creator.url = function(id) {
      return "" + config.baseURL + "/resources/atlgarchiver/" + id;
    };
    return config;
  });

}).call(this);
