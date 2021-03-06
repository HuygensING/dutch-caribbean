#!/usr/bin/env node

var browserSync = require("browser-sync").create();
var modRewrite = require("connect-modrewrite");
var debounce = require("lodash.debounce");
var proxy = require("proxy-middleware");
var url = require('url');

var baseDir = "./";
var watchFiles = [
  baseDir + "build/development/js/*.js",
  baseDir + "build/development/css/*.css",
  baseDir + "build/development/index.html"
];

function onFilesChanged(event, file) {
  if (event === "change") {
    browserSync.reload(file);
  }
}

browserSync.watch(watchFiles, debounce(onFilesChanged, 300));

var localSolr = process.env.SOLR || "http://localhost:8983/solr";
var dcarlegislationsOptions = url.parse(localSolr + "/dcarlegislations/select");
dcarlegislationsOptions.route = "/repositorysolr/dcarlegislations";

var dcararchivesOptions = url.parse(localSolr + "/dcararchives/select");
dcararchivesOptions.route = "/repositorysolr/dcararchives";

var dcararchiversOptions = url.parse(localSolr + "/dcararchivers/select");
dcararchiversOptions.route = "/repositorysolr/dcararchivers";

browserSync.init({
  open: false,
  server: {
    baseDir: baseDir,
    middleware: [
      proxy(dcarlegislationsOptions),
      proxy(dcararchivesOptions),
      proxy(dcararchiversOptions),
      modRewrite([
        "^/css/(.*)$ /build/development/css/$1 [L]",
        "^/src/stylus/(.*)$ /src/stylus/$1 [L]",
        "^/js/(.*)$ /build/development/js/$1 [L]",
        "^/images/(.*)$ /build/development/images/$1 [L]",
        "^/fonts/(.*)$ /build/development/fonts/$1 [L]",
        "^/?.*$ /build/development/index.html [L]",
      ])
    ]
  }
});
