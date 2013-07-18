(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(function(require) {
    var Backbone, ResultsCache, _ref;
    Backbone = require('backbone');
    ResultsCache = (function(_super) {
      __extends(ResultsCache, _super);

      function ResultsCache() {
        _ref = ResultsCache.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      return ResultsCache;

    })(Backbone.Model);
    return new ResultsCache;
  });

}).call(this);
