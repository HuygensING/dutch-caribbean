(function() {
  define(function(require) {
    var Backbone, Collections, ViewManager, config;
    Backbone = require('backbone');
    config = require('config');
    Collections = {
      'View': require('collections/view')
    };
    ViewManager = (function() {
      var currentViews, selfDestruct;

      currentViews = new Collections.View();

      ViewManager.prototype.debugCurrentViews = currentViews;

      selfDestruct = function(view) {
        if (!currentViews.has(view)) {
          console.error('Unknown view!');
          return false;
        }
        if (view.destroy) {
          return view.destroy();
        } else {
          return view.remove();
        }
      };

      function ViewManager() {
        this.main = $(config.appRootElement);
      }

      ViewManager.prototype.clear = function(view) {
        if (view) {
          selfDestruct(view);
          return currentViews.remove(view.cid);
        } else {
          currentViews.each(function(model) {
            return selfDestruct(model.get('view'));
          });
          return currentViews.reset();
        }
      };

      ViewManager.prototype.register = function(view) {
        if (view) {
          return currentViews.add({
            'id': view.cid,
            'view': view
          });
        }
      };

      ViewManager.prototype.show = function(view) {
        var html;
        html = view == null ? '' : view.$el;
        return this.main.html(html);
      };

      return ViewManager;

    })();
    return new ViewManager();
  });

}).call(this);
