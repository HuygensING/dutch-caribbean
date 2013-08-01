(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(function(require) {
    var BaseView, FacetedSearch, Home, Templates, Views, config, pubsub, resultsCache, _ref;
    config = require('config');
    pubsub = require('managers/pubsub');
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
        'click .tabs li.legislations': 'showLegislation'
      };

      Home.prototype.initialize = function(options) {
        Home.__super__.initialize.apply(this, arguments);
        _.extend(this, pubsub);
        this.activeTab = (options != null ? options.activeTab : void 0) ? options.activeTab : 'archive';
        return this.render();
      };

      Home.prototype.showTab = function(tab) {
        this.showActive(tab || 'archive');
        if (tab) {
          return this.publish('navigate:url', "/" + tab + "/results");
        }
      };

      Home.prototype.showArchives = function() {
        this.showActive('archive');
        return this.publish('navigate:url', '/archive/results');
      };

      Home.prototype.showCreators = function() {
        this.showActive('creator');
        return this.publish('navigate:url', '/creator/results');
      };

      Home.prototype.showLegislation = function() {
        this.showActive('legislation');
        return this.publish('navigate:url', '/legislation/results');
      };

      Home.prototype.showActive = function(cls) {
        this.$(".search-views > div:not(." + cls + "s.search)").hide();
        this.$(".search-views ." + cls + "s.search").show();
        return this.$('.tabs li').removeClass('active').filter("." + cls + "s").addClass('active');
      };

      Home.prototype.render = function() {
        var tpl;
        tpl = _.template(Templates.Home);
        this.$el.html(tpl());
        new Views.ArchiveSearch({
          el: this.$('.archives.search')
        });
        new Views.CreatorSearch({
          el: this.$('.creators.search')
        });
        new Views.LegislationSearch({
          el: this.$('.legislations.search')
        });
        this.$(".search-views > .search:not(" + this.activeTab + ")").hide();
        this.$(".tabs li" + this.activeTab).addClass('active');
        return this;
      };

      return Home;

    })(Backbone.View);
  });

}).call(this);
