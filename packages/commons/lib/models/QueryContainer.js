'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _lodash = require('lodash');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var QueryContainer = function () {
  function QueryContainer() {
    (0, _classCallCheck3.default)(this, QueryContainer);

    this.page = {};
    this.results = {};
    this.resetPages();

    for (var _len = arguments.length, queries = Array(_len), _key = 0; _key < _len; _key++) {
      queries[_key] = arguments[_key];
    }

    this.queries = queries || [];
  }

  QueryContainer.prototype.gatherResults = function gatherResults() {
    var _this = this;

    return (0, _lodash.compact)((0, _lodash.flatten)((0, _lodash.map)(this.getQueries(), function (query) {
      return query.getDescriptor().id;
    }).map(function (type) {
      return _this.results[type];
    })));
  };

  QueryContainer.prototype.reset = function reset() {
    this.value = '';
    this.results = {};
    this.resetPages();
  };

  QueryContainer.prototype.getQueries = function getQueries() {
    return (0, _lodash.filter)(this.queries, function (query) {
      return !query.isDisabled();
    });
  };

  QueryContainer.prototype.getQuery = function getQuery(type) {
    return (0, _lodash.find)(this.queries, function (query) {
      return query.getDescriptor().id === type;
    });
  };

  QueryContainer.prototype.resetPages = function resetPages() {
    var _this2 = this;

    (0, _lodash.each)(this.queries, function (query) {
      var _query$getDescriptor = query.getDescriptor(),
          id = _query$getDescriptor.id,
          _query$getDescriptor$ = _query$getDescriptor.pagesize,
          pagesize = _query$getDescriptor$ === undefined ? QueryContainer.PAGE_SIZE : _query$getDescriptor$;

      _this2.page[id] = {
        offset: 0,
        pagesize: pagesize
      };
    });
  };

  QueryContainer.prototype.getQueryString = function getQueryString() {
    return (this.value || '').toLowerCase();
  };

  QueryContainer.prototype.getGroups = function getGroups() {
    var queries = this.getQueries();
    if (!queries) {
      return [];
    }

    var groups = {};

    (0, _lodash.each)(queries, function (query) {
      var descriptor = query.getDescriptor();
      if (groups[descriptor.id]) {
        return;
      }

      groups[descriptor.id] = {
        name: descriptor.name,
        size: descriptor.size
      };
    });

    return (0, _lodash.map)(groups, function (value, key) {
      return {
        id: key,
        name: value.name,
        size: value.size
      };
    });
  };

  QueryContainer.prototype.next = function next(type) {
    var _this3 = this;

    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var query = this.getQuery(type);
    if (!query || query.isDisabled()) {
      return new Promise(function (resolve) {
        resolve(_this3.gatherResults());
      });
    }

    var page = this.page[type];

    var nextPage = {
      offset: page.offset + page.pagesize,
      pagesize: page.pagesize
    };

    this.page[type] = nextPage;

    var opts = (0, _extends3.default)({}, options, nextPage);

    return query.fetch(this.value, opts).then(function () {
      var results = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var _results$type = _this3.results[type],
          currentResults = _results$type === undefined ? [] : _results$type;


      _this3.results[type] = [].concat((0, _toConsumableArray3.default)(currentResults), (0, _toConsumableArray3.default)(results));

      return _this3.gatherResults();
    });
  };

  QueryContainer.prototype.fetchPartials = function fetchPartials() {
    var _this4 = this;

    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    return (0, _lodash.compact)((0, _lodash.map)(this.getQueries(), function (query) {
      var type = query.getDescriptor().id;
      var page = _this4.page[type];
      var opts = {};

      if (page) {
        opts = (0, _extends3.default)({}, options, {

          offset: page.offset,
          pagesize: page.pagesize
        });
      }

      return query.fetch(_this4.value, opts).then(function (results) {
        _this4.results[type] = results;
      });
    }));
  };

  QueryContainer.prototype.fetch = function fetch(query) {
    var _this5 = this;

    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    this.value = (query || '').toLowerCase();

    this.resetPages();

    return Promise.all(this.fetchPartials(options)).then(function () {
      var results = _this5.gatherResults();

      _this5.length = results.length;

      return results;
    });
  };

  QueryContainer.prototype.getResults = function getResults() {
    return (0, _lodash.flatten)((0, _lodash.map)(this.results, function (results) {
      return results;
    }));
  };

  return QueryContainer;
}();

QueryContainer.defaults = {
  value: '',
  results: []
};
QueryContainer.PAGE_SIZE = 10;
exports.default = QueryContainer;


// WEBPACK FOOTER //
// ./packages/commons/lib/models/QueryContainer.js