(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(function(require) {
    var BaseView, FacetedSearch, Search, Templates, config, resultsCache, _ref;
    config = require('config');
    BaseView = require('views/base');
    FacetedSearch = require('faceted-search');
    Templates = {
      Search: require('text!html/faceted-search-and-results.html')
    };
    resultsCache = require('models/results-cache');
    return Search = (function(_super) {
      __extends(Search, _super);

      function Search() {
        _ref = Search.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      Search.prototype.events = function() {
        return {
          'click .results .body li': 'resultClicked'
        };
      };

      Search.prototype.resultClicked = function(ev) {
        return this.publish('navigate:entry', 'creator/' + ev.currentTarget.id);
      };

      Search.prototype.initialize = function() {
        Search.__super__.initialize.apply(this, arguments);
        return this.render();
      };

      Search.prototype.renderResults = function(response) {
        var ul,
          _this = this;
        this.$('.results h3').html(response.numFound + ' Creators found');
        ul = document.createElement('ul');
        _.each(response.results, function(result) {
          var li, small;
          li = document.createElement('li');
          li.innerHTML = result.nameEng;
          li.id = result._id;
          small = document.createElement('small');
          small.innerHTML = '(' + result.beginDate + '-' + result.endDate + ')';
          li.appendChild(small);
          return ul.appendChild(li);
        });
        return this.$('.results .body').html(ul);
      };

      Search.prototype.render = function() {
        var creatorSearch, tpl,
          _this = this;
        tpl = _.template(Templates.Search);
        this.$el.html(tpl({
          type: 'CREATOR'
        }));
        creatorSearch = new FacetedSearch({
          el: this.$('.faceted-search'),
          baseUrl: config.facetedSearchHost,
          searchUrl: config.searchPath,
          queryOptions: {
            term: '*',
            typeString: config.resources.creator.label,
            sort: 'id'
          }
        });
        return creatorSearch.on('faceted-search:results', function(response) {
          return _this.renderResults(response);
        });
      };

      return Search;

    })(BaseView);
  });

}).call(this);
