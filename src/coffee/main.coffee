require.config 
  paths:
    'jquery': '../lib/jquery/jquery'
    'underscore': '../lib/underscore-amd/underscore'
    'backbone': '../lib/backbone-amd/backbone'
    'domready': '../lib/requirejs-domready/domReady'
    'text': '../lib/requirejs-text/text'
    'faceted-search': '../lib/faceted-search/stage/js/main'
    'es5-shim': '../lib/es5-shim/es5-shim.min'
    'managers': '../lib/managers/dev'
    'html': '../html'

  shim:
    'underscore':
      exports: '_'
    'backbone':
      deps: ['underscore', 'jquery']
      exports: 'Backbone'

require ['es5-shim', 'domready', 'app'], (e5s, domready, app) ->
  domready ->
    app.initialize()