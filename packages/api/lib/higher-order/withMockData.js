'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends4 = require('babel-runtime/helpers/extends');

var _extends5 = _interopRequireDefault(_extends4);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _reactRedux = require('react-redux');

var _reduxMockStore = require('redux-mock-store');

var _reduxMockStore2 = _interopRequireDefault(_reduxMockStore);

var _api = require('../api');

var _types = require('../types');

var apiTypes = _interopRequireWildcard(_types);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var withMockDataHOC = function withMockDataHOC(storeHandler) {
  var mockStore = (0, _reduxMockStore2.default)();

  var appState = {
    kraken: {
      entities: (0, _lodash.values)(apiTypes).reduce(function (entities, _ref) {
        var collection = _ref.collection;
        return (0, _extends5.default)({}, entities, (0, _defineProperty3.default)({}, collection, {}));
      }, {}),
      requests: (0, _lodash.keys)(apiTypes).reduce(function (requests, type) {
        return (0, _extends5.default)({}, requests, (0, _defineProperty3.default)({}, type, {}));
      }, {})
    }
  };

  var store = mockStore(function () {
    return appState;
  });

  store.subscribe(function () {
    var kraken = (0, _lodash.reduce)(store.getActions(), function (state, action) {
      return (0, _api.reducer)(state, action);
    }, {});

    appState = { kraken: kraken };
  });

  if ((0, _lodash.isFunction)(storeHandler)) {
    storeHandler(store);
  }

  var withMockData = function withMockData(WrappedComponent) {
    return function (props) {
      return _react2.default.createElement(
        _reactRedux.Provider,
        { store: store },
        _react2.default.createElement(WrappedComponent, props)
      );
    };
  };

  return withMockData;
};

exports.default = withMockDataHOC;


// WEBPACK FOOTER //
// ./packages/api/lib/higher-order/withMockData.js