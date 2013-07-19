(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(function(require) {
    var BaseView, FacetedSearch, Search, Templates, config, resultsCache, _ref;
    config = require('config');
    BaseView = require('views/base');
    FacetedSearch = require('faceted-search');
    Templates = {
      Search: require('text!html/faceted-search-and-results.html')
    };
    resultsCache = require('models/results-cache');
    return Search = (function(_super) {
      __extends(Search, _super);

      function Search() {
        _ref = Search.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      Search.prototype.initialize = function() {
        return this.render();
      };

      Search.prototype.renderResults = function(results) {
        console.log(results);
        return this.$('.results').html('myresults');
      };

      Search.prototype.render = function() {
        var archiveSearch, tpl,
          _this = this;
        tpl = _.template(Templates.Search);
        this.$el.html(tpl({
          type: 'ARCHIVE'
        }));
        archiveSearch = new FacetedSearch({
          el: this.$('.faceted-search'),
          baseUrl: config.facetedSearchHost,
          searchUrl: config.searchPath,
          queryOptions: {
            term: '*',
            typeString: config.resources.archive.label,
            sort: 'id'
          }
        });
        archiveSearch.on('faceted-search:results', function(results) {
          resultsCache.set('archives', results);
          return _this.renderResults(results);
        });
        return this.$('button').click(function(ev) {
          return Backbone.history.navigate('archive/AVE0000000077', {
            trigger: true
          });
        });
      };

      return Search;

    })(BaseView);
  });

}).call(this);
