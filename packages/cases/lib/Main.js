'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Main;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _case = require('./case');

var _case2 = _interopRequireDefault(_case);

var _task = require('./task');

var _task2 = _interopRequireDefault(_task);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Main(_ref) {
  var match = _ref.match;

  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(
      _reactRouter.Switch,
      null,
      _react2.default.createElement(_reactRouter.Route, {
        path: match.url + '/case/:caseId/task/:taskId',
        component: _task2.default
      }),
      _react2.default.createElement(_reactRouter.Route, { path: match.url + '/case/:caseId', component: _case2.default })
    )
  );
}


// WEBPACK FOOTER //
// ./packages/cases/lib/Main.js