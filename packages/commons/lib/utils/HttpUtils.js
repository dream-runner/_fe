'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.queryString = queryString;
exports.parseQuery = parseQuery;
exports.loadQueue = loadQueue;

var _each = require('lodash/each');

var _each2 = _interopRequireDefault(_each);

var _isArray = require('lodash/isArray');

var _isArray2 = _interopRequireDefault(_isArray);

var _isNaN = require('lodash/isNaN');

var _isNaN2 = _interopRequireDefault(_isNaN);

var _map = require('lodash/map');

var _map2 = _interopRequireDefault(_map);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function retrieveValue(value) {
  if (value instanceof Date) {
    return value.toISOString();
  }

  return value;
}

function queryString(query) {
  return (0, _map2.default)(query, function (value, key) {
    if ((0, _isArray2.default)(value)) {
      return (0, _map2.default)(value, function (item) {
        return key + '[]=' + retrieveValue(item);
      }).join('&');
    }

    return key + '=' + retrieveValue(value);
  }).join('&');
}

function parseValue(value) {
  if (value === 'true') {
    return true;
  }

  if (value === 'false') {
    return false;
  }

  var integer = parseInt(value, 10);

  if (String(integer) === value) {
    return integer;
  }

  var number = parseFloat(value, 10);

  if (String(number) === value) {
    return number;
  }

  var date = new Date(value);

  if (!(0, _isNaN2.default)(date.getTime()) && date.toISOString() === value) {
    return date;
  }

  return value;
}

function parseQuery(query, filter) {
  if (!query) {
    return {};
  }

  var props = {};

  (0, _each2.default)(decodeURIComponent(query).split('&'), function (part) {
    part = part.split('=');

    var key = part[0];
    var value = parseValue(part[1]);

    if (filter && filter(key, value) === false) {
      return;
    }

    if (key.indexOf('[]') === key.length - 2) {
      // key is an array

      key = key.replace('[]', '');

      if (!props[key]) {
        props[key] = [];
      }

      props[key].push(value);
    } else {
      props[key] = value;
    }
  });

  return props;
}

function loadQueue() {
  var waiting = 0;
  var clb;

  var done = function done(ctx) {
    waiting = waiting - 1;

    if (waiting <= 0) {
      clb && clb.apply(ctx);
    }
  };

  var entities = [];
  var parameters = [];

  return {
    load: function load(entity, params) {
      entities.push(entity);
      parameters.push(params);
    },
    work: function work(finish, ctx) {
      clb = finish;

      (0, _each2.default)(entities, function (entity, index) {
        waiting = waiting + 1;

        entity.once('sync error', function () {
          done(ctx);
        }, ctx);

        var params = parameters[index];
        entity.fetch(params);
      });
    }
  };
}


// WEBPACK FOOTER //
// ./packages/commons/lib/utils/HttpUtils.js