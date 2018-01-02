'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _dashboard = require('./dashboard');

var _report = require('./report');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var match = _ref.match;
  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(
      _reactRouter.Switch,
      null,
      _react2.default.createElement(_reactRouter.Route, { exact: true, path: match.url, component: _dashboard.Dashboard }),
      _react2.default.createElement(_reactRouter.Route, { path: match.url + '/report/:id', component: _report.ShowReport }),
      _react2.default.createElement(_reactRouter.Route, { path: match.url + '/report', component: _report.CreateReport })
    )
  );
};


// WEBPACK FOOTER //
// ./packages/reporting/lib/Main.js