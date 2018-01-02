'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends3 = require('babel-runtime/helpers/extends');

var _extends4 = _interopRequireDefault(_extends3);

exports.default = fetch;

var _lodash = require('lodash');

var _kraken = require('@signavio/kraken');

var _utils = require('@signavio/kraken/lib/utils');

var _api = require('../api');

var _types = require('../types');

var apiTypes = _interopRequireWildcard(_types);

var _compositeId = require('../compositeId');

var _compositeId2 = _interopRequireDefault(_compositeId);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getId = (0, _compositeId2.default)('key', 'id');

function fetch(store, entityType, data) {
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var collection = apiTypes[entityType].collection;
  var query = options.query,
      elementId = options.elementId,
      _options$id = options.id,
      id = _options$id === undefined ? getId : _options$id;


  var payload = void 0;

  if (data) {
    payload = {
      value: (0, _lodash.isArray)(data) ? (0, _lodash.map)(data, id) : id(data),
      entities: (0, _defineProperty3.default)({}, collection, (0, _lodash.isArray)(data) ? (0, _lodash.reduce)(data, function (result, entry) {
        return (0, _extends4.default)({}, result, (0, _defineProperty3.default)({}, '' + id(entry), entry));
      }, {}) : (0, _defineProperty3.default)({}, '' + id(data), data))
    };
  }

  var action = (0, _extends4.default)({
    entityType: entityType,
    query: query,
    elementId: elementId || ''
  }, payload);

  var requests = store.getState().kraken.requests[entityType];

  var requestIdProbe = (0, _utils.deriveRequestIdFromAction)({
    payload: action,
    type: _kraken.actionTypes.CREATE_DISPATCH
  });

  var requestId = (0, _lodash.find)((0, _lodash.keys)(requests), function (key) {
    return (0, _lodash.startsWith)(key, requestIdProbe);
  });

  store.dispatch(_api.actions.succeedCreate((0, _extends4.default)({}, action, {
    requestId: requestId
  })));
}


// WEBPACK FOOTER //
// ./packages/api/lib/mockUtils/create.js