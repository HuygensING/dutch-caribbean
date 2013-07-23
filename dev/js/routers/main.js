(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(function(require) {
    var Backbone, MainRouter, Pubsub, Views, currentUser, viewManager, _ref;
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
        return this.subscribe('navigate:entry', function(route) {
          return _this.navigate(route, {
            trigger: true
          });
        });
      };

      MainRouter.prototype['routes'] = {
        '': 'home',
        'creator/results': 'home_creator',
        'creator/:id': 'creator',
        'archive/results': 'home_archive',
        'archive/:id': 'archive',
        'legislation/results': 'home_legislation',
        'legislation/:id': 'legislation'
      };

      MainRouter.prototype.home = function() {
        return viewManager.show(Views.Home);
      };

      MainRouter.prototype.creator = function(id) {
        return viewManager.show(Views.Creator, {
          id: id
        });
      };

      MainRouter.prototype.archive = function(id) {
        return viewManager.show(Views.Archive, {
          id: id
        });
      };

      MainRouter.prototype.legislation = function(id) {
        return viewManager.show(Views.Legislation, {
          id: id
        });
      };

      return MainRouter;

    })(Backbone.Router);
  });

}).call(this);
