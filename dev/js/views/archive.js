(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(function(require) {
    var Archive, BaseView, Models, Templates, config, _ref;
    config = require('config');
    BaseView = require('views/base');
    Models = {
      Archive: require('models/archive')
    };
    Templates = {
      Archive: require('text!html/archive.html')
    };
    return Archive = (function(_super) {
      __extends(Archive, _super);

      function Archive() {
        _ref = Archive.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      Archive.prototype.className = 'model-view';

      Archive.prototype.initialize = function(options) {
        Archive.__super__.initialize.apply(this, arguments);
        if (options && (options.id != null)) {
          console.log("New Archive", this.options.id);
          this.model = new Models.Archive({
            _id: options.id
          });
          this.model.fetch();
        }
        return this.model.on('sync', this.render, this);
      };

      Archive.prototype.render = function() {
        var tmpl;
        tmpl = _.template(Templates.Archive);
        console.log(this.model.attributes);
        return this.$el.html(tmpl({
          model: this.model.attributes,
          config: config
        }));
      };

      return Archive;

    })(BaseView);
  });

}).call(this);
