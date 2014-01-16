(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(function(require) {
    var Backbone, TabsList, _ref;
    Backbone = require('backbone');
    return TabsList = (function(_super) {
      __extends(TabsList, _super);

      function TabsList() {
        _ref = TabsList.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      TabsList.prototype.initialize = function() {
        return this.render();
      };

      TabsList.prototype.render = function() {};

      return TabsList;

    })(Backbone.View);
  });

}).call(this);
