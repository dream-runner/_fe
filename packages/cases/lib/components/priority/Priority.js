'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _recompose = require('recompose');

var _styles = require('@signavio/effektif-commons/lib/styles');

var _components = require('@signavio/effektif-commons/lib/components');

var _priorities = require('./priorities');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Priority(_ref) {
  var style = _ref.style,
      rest = (0, _objectWithoutProperties3.default)(_ref, ['style']);

  return _react2.default.createElement('div', (0, _extends3.default)({}, rest, style));
}


var styled = (0, _styles.defaultStyle)(function () {
  return {
    '&priority-0': {
      backgroundColor: _priorities.Colors.high,
      color: _styles.utils.color(_priorities.Colors.high)
    },
    '&priority-1': {
      backgroundColor: _priorities.Colors.medium,
      color: _styles.utils.color(_priorities.Colors.medium)
    },
    '&priority-2': {
      backgroundColor: _priorities.Colors.normal,
      color: _styles.utils.color(_priorities.Colors.normal)
    },
    '&priority-3': {
      backgroundColor: _priorities.Colors.low,
      color: _styles.utils.color(_priorities.Colors.low)
    }
  };
}, function (_ref2) {
  var priority = _ref2.priority;
  return (0, _defineProperty3.default)({}, '&priority-' + priority, true);
});

var enhance = (0, _recompose.compose)(styled, (0, _components.omitProps)(['priority']));

exports.default = enhance(Priority);


// WEBPACK FOOTER //
// ./packages/cases/lib/components/priority/Priority.js