(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(function(require) {
    var BaseView, Creator, Models, Templates, config, _ref;
    config = require('config');
    BaseView = require('views/base');
    Models = {
      Creator: require('models/creator')
    };
    Templates = {
      Creator: require('text!html/creator.html')
    };
    return Creator = (function(_super) {
      __extends(Creator, _super);

      function Creator() {
        _ref = Creator.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      Creator.prototype.className = 'fiche';

      Creator.prototype.initialize = function(options) {
        Creator.__super__.initialize.apply(this, arguments);
        if (options && (options.id != null)) {
          if (config.debug) {
            console.log("New Creator", options.id);
          }
          this.model = new Models.Creator({
            _id: options.id
          });
          this.model.fetch();
        }
        this.model.on('sync', this.render, this);
        return this.render();
      };

      Creator.prototype.render = function() {
        var tmpl;
        tmpl = _.template(Templates.Creator);
        this.$el.html(tmpl({
          data: this.model.attributes,
          model: this.model,
          config: config
        }));
        if (config.debug) {
          return console.log(this.model.attributes);
        }
      };

      return Creator;

    })(BaseView);
  });

}).call(this);
