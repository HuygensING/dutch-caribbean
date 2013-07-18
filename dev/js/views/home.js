(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(function(require) {
    var BaseView, FacetedSearch, Home, Templates, config, _ref;
    config = require('config');
    BaseView = require('views/base');
    FacetedSearch = require('faceted-search');
    Templates = {
      Home: require('text!html/home.html')
    };
    return Home = (function(_super) {
      __extends(Home, _super);

      function Home() {
        _ref = Home.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      Home.prototype.initialize = function() {
        Home.__super__.initialize.apply(this, arguments);
        return this.render();
      };

      Home.prototype.render = function() {
        var creatorSearch, tpl,
          _this = this;
        tpl = _.template(Templates.Home);
        this.$el.html(tpl());
        creatorSearch = new FacetedSearch({
          el: this.$('.creator-search .faceted-search'),
          baseUrl: config.facetedSearchHost,
          searchUrl: config.searchPath,
          queryOptions: {
            term: '*',
            typeString: config.resources.creator,
            sort: 'id'
          }
        });
        creatorSearch.$el;
        creatorSearch.on('faceted-search:results', function(results) {
          return console.log(results);
        });
        return this;
      };

      return Home;

    })(BaseView);
  });

}).call(this);
