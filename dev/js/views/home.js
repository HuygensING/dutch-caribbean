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
        var fs, tpl;
        tpl = _.template(Templates.Home);
        this.$el.html(tpl());
        fs = new FacetedSearch({
          el: this.$(config.facetedSearchElement),
          baseUrl: config.facetedSearchHost,
          searchUrl: config.searchPath,
          defaultQuery: {
            term: '*',
            typeString: 'person',
            sort: 'id'
          }
        });
        return this;
      };

      return Home;

    })(BaseView);
  });

}).call(this);
