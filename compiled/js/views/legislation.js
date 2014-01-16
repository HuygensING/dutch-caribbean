(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(function(require) {
    var BaseView, Legislation, Models, Templates, config, _ref;
    config = require('config');
    BaseView = require('views/base');
    Models = {
      Legislation: require('models/legislation')
    };
    Templates = {
      Legislation: require('text!html/legislation.html')
    };
    return Legislation = (function(_super) {
      __extends(Legislation, _super);

      function Legislation() {
        _ref = Legislation.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      Legislation.prototype.className = 'fiche';

      Legislation.prototype.initialize = function(options) {
        Legislation.__super__.initialize.apply(this, arguments);
        if (options && (options.id != null)) {
          this.model = new Models.Legislation({
            _id: options.id
          });
          this.model.fetch();
        }
        this.model.on('sync', this.render, this);
        return this.render();
      };

      Legislation.prototype.render = function() {
        var tmpl;
        if (config.debug) {
          console.log("LEG", this.$el, this.model.attributes);
        }
        tmpl = _.template(Templates.Legislation);
        return this.$el.html(tmpl({
          data: this.model.attributes,
          config: config
        }));
      };

      return Legislation;

    })(BaseView);
  });

}).call(this);
