(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(function(require) {
    var BaseView, FacetedSearch, Search, Templates, config, resultsCache, _ref;
    config = require('config');
    BaseView = require('views/base');
    FacetedSearch = require('faceted-search');
    Templates = {
      Search: require('text!html/faceted-search-and-results.html'),
      Results: require('text!html/creator-results.html')
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
          'click .results .body li': 'resultClicked',
          'click .results .next': 'nextResults',
          'click .results .previous': 'previousResults',
          'change .sort select': 'sortResults'
        };
      };

      Search.prototype.resultClicked = function(ev) {
        return this.publish('navigate:entry', 'creator/' + ev.currentTarget.id);
      };

      Search.prototype.nextResults = function() {
        return this.creatorSearch.next();
      };

      Search.prototype.previousResults = function() {
        return this.creatorSearch.prev();
      };

      Search.prototype.sortResults = function(e) {
        this.sortBy = $(e.currentTarget).val();
        return this.creatorSearch.sortResultsBy(this.sortBy);
      };

      Search.prototype.initialize = function() {
        Search.__super__.initialize.apply(this, arguments);
        return this.render();
      };

      Search.prototype.renderSortableFields = function() {
        var f, option, select, _i, _len, _ref1;
        if (this.sortableFields) {
          select = $('<select>');
          _ref1 = this.sortableFields;
          for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
            f = _ref1[_i];
            option = $('<option>').attr({
              value: f
            }).text(config.sortableFieldNames[f]);
            if (this.sortBy && this.sortBy === f) {
              option.attr('selected', 'selected');
            }
            select.append(option);
          }
          this.$('.heading .sort').html(select);
        }
        return this;
      };

      Search.prototype.renderResults = function(response) {
        var rtpl;
        this.$('.results h3').html(response.numFound + ' creators');
        rtpl = _.template(Templates.Results);
        this.$('.results .body').html(rtpl({
          results: response.results
        }));
        this.$('.results .cursor .next').toggle(this.creatorSearch.hasNext());
        return this.$('.results .cursor .previous').toggle(this.creatorSearch.hasPrev());
      };

      Search.prototype.render = function() {
        var firstTime, tpl,
          _this = this;
        tpl = _.template(Templates.Search);
        this.$el.html(tpl({
          type: 'CREATOR'
        }));
        this.$('.results .cursor .next, .results .cursor .previous').hide();
        this.creatorSearch = new FacetedSearch({
          el: this.$('.faceted-search'),
          baseUrl: config.facetedSearchHost,
          searchUrl: config.searchPath,
          queryOptions: {
            resultRows: config.resultRows,
            term: '*',
            typeString: config.resources.creator.label,
            sort: 'id'
          },
          excludeFacets: ['facet_s_begin_date', 'facet_s_end_date']
        });
        firstTime = true;
        return this.creatorSearch.on('faceted-search:results', function(response) {
          var facetName, order, _i, _len, _ref1, _results;
          if (!firstTime) {
            if ('sortableFields' in response) {
              _this.sortableFields = response.sortableFields;
            }
            _this.renderResults(response);
          }
          firstTime = false;
          _this.renderSortableFields();
          /* RENDER FACET TITLES*/

          _.each(_this.$('.facet h3'), function(h3) {
            var name;
            name = h3.getAttribute('data-name');
            if (name != null) {
              return h3.innerHTML = config.facetNames[name];
            }
          });
          /* CHANGE FACET ORDER*/

          order = ['facet_s_period', 'facet_s_begin_date', 'facet_s_end_date', 'facet_s_type', 'facet_s_place', 'facet_s_subject', 'facet_s_person'];
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
