(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(function(require) {
    var BaseView, FacetedSearch, Home, Templates, config, resultsCache, _ref;
    config = require('config');
    BaseView = require('views/base');
    FacetedSearch = require('faceted-search');
    Templates = {
      Home: require('text!html/home.html')
    };
    resultsCache = require('models/results-cache');
    return Home = (function(_super) {
      __extends(Home, _super);

      function Home() {
        _ref = Home.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      Home.prototype.initialize = function(options) {
        Home.__super__.initialize.apply(this, arguments);
        this.activeTab = options.activeTab ? options.activeTab : '.creator-search';
        return this.render();
      };

      Home.prototype.render = function() {
        var archiveSearch, creatorSearch, legislationSearch, tpl,
          _this = this;
        tpl = _.template(Templates.Home);
        this.$el.html(tpl());
        creatorSearch = new FacetedSearch({
          el: this.$('.creator-search .faceted-search'),
          baseUrl: config.facetedSearchHost,
          searchUrl: config.searchPath,
          queryOptions: {
            term: '*',
            typeString: config.resources.creator.label,
            sort: 'id'
          }
        });
        creatorSearch.on('faceted-search:results', function(results) {
          resultsCache.set('creators', results);
          return console.log(results);
        });
        archiveSearch = new FacetedSearch({
          el: this.$('.archive-search .faceted-search'),
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
          return console.log(results);
        });
        legislationSearch = new FacetedSearch({
          el: this.$('.legislation-search .faceted-search'),
          baseUrl: config.facetedSearchHost,
          searchUrl: config.searchPath,
          queryOptions: {
            term: '*',
            typeString: config.resources.legislation.label
          }
        });
        return this;
      };

      return Home;

    })(BaseView);
  });

}).call(this);
