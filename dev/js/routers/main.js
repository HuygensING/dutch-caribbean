(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(function(require) {
    var Backbone, MainRouter, Pubsub, Views, currentUser, home, viewManager, _ref;
    Backbone = require('backbone');
    viewManager = require('managers/view');
    Pubsub = require('pubsub');
    currentUser = require('models/currentUser');
    Views = {
      Home: require('views/home'),
      Creator: require('views/creator'),
      Archive: require('views/archive'),
      Legislation: require('views/legislation')
    };
    home = new Views.Home({
      el: '#home'
    });
    return MainRouter = (function(_super) {
      __extends(MainRouter, _super);

      function MainRouter() {
        _ref = MainRouter.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      MainRouter.prototype.initialize = function() {
        var _this = this;
        _.extend(this, Pubsub);
        this.on('route', this.show, this);
        this.subscribe('navigate:entry', function(route) {
          return _this.navigate(route, {
            trigger: true
          });
        });
        return this.subscribe('navigate:url', function(url) {
          return _this.navigate(url);
        });
      };

      MainRouter.prototype['routes'] = {
        'creator/results': 'home_creator',
        'creator/:id': 'creator',
        'archive/results': 'home_archive',
        'archive/:id': 'archive',
        'legislation/results': 'home_legislation',
        'legislation/:id': 'legislation',
        '': 'home'
      };

      MainRouter.prototype.home = function() {
        return this.showHome();
      };

      MainRouter.prototype.home_creator = function() {
        return this.showHome('creator');
      };

      MainRouter.prototype.home_archive = function() {
        return this.showHome('archive');
      };

      MainRouter.prototype.home_legislation = function() {
        return this.showHome('legislation');
      };

      MainRouter.prototype.creator = function(id) {
        return this.showFiche(Views.Creator, {
          id: id
        });
      };

      MainRouter.prototype.archive = function(id) {
        return this.showFiche(Views.Archive, {
          id: id
        });
      };

      MainRouter.prototype.legislation = function(id) {
        return this.showFiche(Views.Legislation, {
          id: id
        });
      };

      MainRouter.prototype.showHome = function(activeTab) {
        $('#fiche').hide();
        home.showTab(activeTab);
        return $('#home').show();
      };

      MainRouter.prototype.showFiche = function(view, options) {
        var v;
        $('#home').hide();
        v = new view(_.extend(options, {
          el: '#fiche'
        }));
        v.render();
        return $('#fiche').show();
      };

      return MainRouter;

    })(Backbone.Router);
  });

}).call(this);
