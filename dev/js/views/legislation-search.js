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
        return this.publish('navigate:entry', 'legislation/' + ev.currentTarget.id);
      };

      Search.prototype.initialize = function() {
        Search.__super__.initialize.apply(this, arguments);
        return this.render();
      };

      Search.prototype.renderResults = function(response) {
        var ul,
          _this = this;
        this.$('.results h3').html(response.numFound + ' Legislations found');
        ul = document.createElement('ul');
        _.each(response.results, function(result) {
          var li, small;
          li = document.createElement('li');
          li.innerHTML = result.titleEng;
          li.id = result._id;
          small = document.createElement('small');
          small.innerHTML = '(' + result.date1 + ')';
          li.appendChild(small);
          return ul.appendChild(li);
        });
        return this.$('.results .body').html(ul);
      };

      Search.prototype.render = function() {
        var firstTime, legislationSearch, tpl,
          _this = this;
        tpl = _.template(Templates.Search);
        this.$el.html(tpl({
          type: 'LEGISLATION'
        }));
        firstTime = true;
        legislationSearch = new FacetedSearch({
          el: this.$('.faceted-search'),
          baseUrl: config.facetedSearchHost,
          searchUrl: config.searchPath,
          queryOptions: {
            term: '*',
            typeString: config.resources.legislation.label
          }
        });
        return legislationSearch.on('faceted-search:results', function(response) {
          var facetName, order, _i, _len, _ref1, _results;
          if (!firstTime) {
            _this.renderResults(response);
          }
          firstTime = false;
          /* RENDER FACET TITLES*/

          _.each(_this.$('.facet h3'), function(h3) {
            var name;
            name = h3.getAttribute('data-name');
            if (name != null) {
              return h3.innerHTML = config.facetNames[name];
            }
          });
          /* CHANGE FACET ORDER*/

          order = ['facet_s_date', 'facet_s_place', 'facet_s_subject', 'facet_s_person'];
          _ref1 = order.reverse();
          _results = [];
          for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
            facetName = _ref1[_i];
            _results.push(_this.$('.facets').prepend(_this.$('h3[data-name="' + facetName + '"]').parents('.facet')));
          }
          return _results;
        });
      };

      return Search;

    })(BaseView);
  });

}).call(this);
