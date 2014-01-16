(function() {
  define(function(require) {
    var Backbone, MainRouter;
    Backbone = require('backbone');
    MainRouter = require('routers/main');
    return {
      initialize: function() {
        var mainRouter;
        Backbone.View.prototype.navigate = Backbone.history.navigate;
        mainRouter = new MainRouter();
        Backbone.history.start({
          pushState: true
        });
        return $(document).on('click', 'a:not([target])', function(e) {
          var href;
          href = $(this).attr('href');
          if (href != null) {
            e.preventDefault();
            return Backbone.history.navigate(href, {
              trigger: true
            });
          }
        });
      }
    };
  });

}).call(this);
