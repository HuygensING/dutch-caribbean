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

      MainRouter.prototype.view = null;

      MainRouter.prototype.query = {};

      MainRouter.prototype.show = function(route, params) {
        viewManager.clear();
        viewManager.show(new this.view(this.query));
        return this.query = {};
      };

      MainRouter.prototype.initialize = function() {
        _.extend(this, Pubsub);
        return this.on('route', this.show, this);
      };

      MainRouter.prototype['routes'] = {
        '': 'home',
        'creator/:id': 'creator',
        'archive/:id': 'archive',
        'legislation/:id': 'legislation'
      };

      MainRouter.prototype.home = function() {
        return this.view = Views.Home;
      };

      MainRouter.prototype.creator = function(id) {
        this.view = Views.Creator;
        return this.query = {
          id: id
        };
      };

      MainRouter.prototype.archive = function(id) {
        this.view = Views.Archive;
        return this.query = {
          id: id
        };
      };

      MainRouter.prototype.legislation = function(id) {
        this.view = Views.Legislation;
        return this.query = {
          id: id
        };
      };

      return MainRouter;

    })(Backbone.Router);
  });

}).call(this);
