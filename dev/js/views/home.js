(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(function(require) {
    var BaseView, FacetedSearch, Home, Templates, Views, config, resultsCache, _ref;
    config = require('config');
    BaseView = require('views/base');
    FacetedSearch = require('faceted-search');
    Templates = {
      Home: require('text!html/home.html')
    };
    Views = {
      ArchiveSearch: require('views/archive-search'),
      CreatorSearch: require('views/creator-search'),
      LegislationSearch: require('views/legislation-search')
    };
    resultsCache = require('models/results-cache');
    return Home = (function(_super) {
      __extends(Home, _super);

      function Home() {
        _ref = Home.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      Home.prototype.events = {
        'click .tabs li.archives': 'showArchives',
        'click .tabs li.creators': 'showCreators',
        'click .tabs li.legislation': 'showLegislation'
      };

      Home.prototype.initialize = function(options) {
        Home.__super__.initialize.apply(this, arguments);
        this.activeTab = options.activeTab ? options.activeTab : '.creator-search';
        return this.render();
      };

      Home.prototype.showArchives = function() {
        this.$('.search-views > div:not(.archive-search)').hide();
        this.$('.search-views .archive-search').show();
        return this.$('.tabs li').removeClass('active').filter('.archives').addClass('active');
      };

      Home.prototype.showCreators = function() {
        this.$('.search-views > div:not(.creator-search)').hide();
        this.$('.search-views .creator-search').show();
        return this.$('.tabs li').removeClass('active').filter('.creators').addClass('active');
      };

      Home.prototype.showLegislation = function() {
        this.$('.search-views > div:not(.legislation-search)').hide();
        this.$('.search-views .legislation-search').show();
        return this.$('.tabs li').removeClass('active').filter('.legislation').addClass('active');
      };

      Home.prototype.render = function() {
        var tpl;
        tpl = _.template(Templates.Home);
        this.$el.html(tpl());
        new Views.ArchiveSearch({
          el: this.$('.archive-search')
        });
        new Views.CreatorSearch({
          el: this.$('.creator-search')
        });
        new Views.LegislationSearch({
          el: this.$('.legislation-search')
        });
        this.$('.creator-search, .legislation-search').hide();
        this.$('.tabs li.archives').addClass('active');
        return this;
      };

      return Home;

    })(BaseView);
  });

}).call(this);
