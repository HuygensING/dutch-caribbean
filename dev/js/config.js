(function() {
  define(function(require) {
    var config;
    config = {
      baseURL: 'http://demo17.huygens.knaw.nl/repository',
      appRootElement: '#app',
      homeElement: '#app',
      facetedSearchHost: 'http://demo17.huygens.knaw.nl/',
      searchPath: 'repository/search',
      resources: {
        legislation: {
          label: 'atlglegislation',
          url: ''
        },
        archive: {
          label: 'atlgarchive',
          url: ''
        },
        creator: {
          label: 'atlgarchiver',
          url: ''
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
    config.archiverURL = function(id) {
      return "/creator/" + id;
    };
    config.archiveURL = function(id) {
      return "/archive/" + id;
    };
    config.legislation = function(id) {
      return "/legislation/" + id;
    };
    return config;
  });

}).call(this);
