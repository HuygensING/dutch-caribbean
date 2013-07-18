(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(function(require) {
    var Backbone, ResultsList, _ref;
    Backbone = require('backbone');
    return ResultsList = (function(_super) {
      __extends(ResultsList, _super);

      function ResultsList() {
        _ref = ResultsList.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      ResultsList.prototype.initialize = function() {
        return this.render();
      };

      ResultsList.prototype.render = function() {
        return this.$('.results').html(JSON.stringify(this.data));
      };

      return ResultsList;

    })(Backbone.View);
  });

}).call(this);
