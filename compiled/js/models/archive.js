(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(function(require) {
    var Backbone, Person, config, _ref;
    Backbone = require('backbone');
    config = require('config');
    return Person = (function(_super) {
      __extends(Person, _super);

      function Person() {
        _ref = Person.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      Person.prototype.idAttribute = '_id';

      Person.prototype.url = function() {
        return config.resources.archive.url(this.id);
      };

      Person.prototype.initialize = function() {
        if (this.id) {
          return this.fetch;
        }
      };

      Person.prototype.reference = function() {
        var _ref1;
        return [(_ref1 = this.get('countries')) != null ? _ref1.join(' ') : void 0, this.get('refCodeArchive'), this.get('refCode'), this.get('subCode'), this.get('itemNo') || this.get('series')].join(' ');
      };

      return Person;

    })(Backbone.Model);
  });

}).call(this);
