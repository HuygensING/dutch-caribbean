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
      Results: require('text!html/generic-results.html')
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

      Search.prototype.nextResults = function() {
        return this.search.next();
      };

      Search.prototype.previousResults = function() {
        return this.search.prev();
      };

      Search.prototype.sortResults = function(e) {
        this.sortField = $(e.currentTarget).val();
        return this.search.sortResultsBy(this.sortField);
      };

      Search.prototype.initialize = function(options) {
        var _this = this;
        this.options = options;
        Search.__super__.initialize.apply(this, arguments);
        if (!this.resultsTemplate) {
          this.resultsTemplate = _.template(Templates.Results);
        }
        if (!this.searchTemplate) {
          this.searchTemplate = _.template(Templates.Search);
        }
        this.firstTime = true;
        this.search = this.options.facetedSearch || this.facetedSearch;
        this.search.on('faceted-search:results', function(response) {
          if (_this.firstTime) {
            console.log("First time!");
          } else {
            if ('sortableFields' in response) {
              _this.sortableFields = response.sortableFields;
            }
            _this.renderResults(response);
          }
          _this.firstTime = false;
          return _this.renderSortableFields();
        });
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
            if (this.sortField && this.sortField === f) {
              option.attr('selected', 'selected');
            }
            select.append(option);
          }
          this.$('.heading .sort').html(select);
        }
        return this;
      };

      Search.prototype.renderResults = function(response) {
        this.$('.empty').hide();
        this.$('.results, .heading, .cursor, .body').show();
        this.$('.results h3').html(response.numFound + ' results');
        this.$('.results .body').html(this.resultsTemplate({
          results: response.results
        }));
        console.log("SEARCH IS >>>>> ", this.search);
        this.$('.results .cursor .position .current').text(this.search.currentPosition());
        this.$('.results .cursor .position .total').text(this.search.numPages());
        this.$('.results .cursor .next').toggle(this.search.hasNext());
        return this.$('.results .cursor .previous').toggle(this.search.hasPrev());
      };

      Search.prototype.render = function() {
        this.$el.html(this.searchTemplate());
        this.$('.faceted-search').html(this.search.$el);
        return this;
      };

      return Search;

    })(BaseView);
  });

}).call(this);
