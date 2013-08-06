(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(function(require) {
    var FacetedSearch, Search, SearchView, Templates, config, _ref;
    config = require('config');
    SearchView = require('views/search');
    FacetedSearch = require('faceted-search');
    Templates = {
      Search: require('text!html/faceted-search-and-results.html'),
      Results: require('text!html/creator-results.html')
    };
    return Search = (function(_super) {
      __extends(Search, _super);

      function Search() {
        _ref = Search.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      Search.prototype.resultClicked = function(ev) {
        return this.publish('navigate:entry', 'legislation/' + ev.currentTarget.id);
      };

      Search.prototype.resultsTemplate = _.template(Templates.Results);

      Search.prototype.facetedSearch = new FacetedSearch({
        baseUrl: config.facetedSearchHost,
        searchUrl: config.searchPath,
        queryOptions: {
          resultRows: config.resultRows,
          term: '*',
          typeString: config.resources.creator.label,
          sort: 'facet_sort_name'
        },
        excludeFacets: ['facet_s_begin_date', 'facet_s_end_date'],
        facetOrder: ['facet_s_period', 'facet_s_begin_date', 'facet_s_end_date', 'facet_s_type', 'facet_s_place', 'facet_s_subject', 'facet_s_person'],
        facetTitles: config.facetNames
      });

      return Search;

    })(SearchView);
  });

}).call(this);
