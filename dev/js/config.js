(function() {
  define(function(require) {
    return {
      baseURL: 'http://demo17.huygens.knaw.nl/repository',
      appRootElement: '#app',
      homeElement: '#app',
      facetedSearchHost: 'http://demo17.huygens.knaw.nl/',
      searchPath: 'repository/search',
      resources: {
        legislation: {
          label: 'atlglegislation',
          url: function(id) {
            return "" + config.baseURL + "/resources/atlglegislation/" + id;
          }
        },
        archive: {
          label: 'atlgarchive',
          url: function(id) {
            return "" + config.baseURL + "/resources/atlgarchive/" + id;
          }
        },
        creator: {
          label: 'atlgarchiver',
          url: function(id) {
            return "" + config.baseURL + "/resources/atlgarchiver/" + id;
          }
        }
      },
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
      }
    };
  });

}).call(this);
