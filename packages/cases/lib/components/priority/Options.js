'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _lodash = require('lodash');

var _recompose = require('recompose');

var _components = require('@signavio/effektif-commons/lib/components');

var _tiles = require('@signavio/effektif-commons/lib/components/tiles');

var _priorities = require('./priorities');

var _Item = require('./Item');

var _Item2 = _interopRequireDefault(_Item);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Options(_ref) {
  var value = _ref.value,
      onChange = _ref.onChange,
      onClear = _ref.onClear;

  return _react2.default.createElement(
    _components.List,
    null,
    value && _react2.default.createElement(
      _tiles.ActionTile,
      { icon: 'times', onClick: onClear },
      (0, _signavioI18n2.default)('Remove priority')
    ),
    (0, _lodash.map)((0, _priorities.priorities)(), function (priority) {
      return _react2.default.createElement(_Item2.default, (0, _extends3.default)({
        key: priority.id
      }, priority, {
        selected: value === priority.id,
        onClick: onChange
      }));
    })
  );
}

var enhance = (0, _recompose.withHandlers)({
  onClear: function onClear(_ref2) {
    var onChange = _ref2.onChange;
    return function () {
      return onChange(null);
    };
  }
});

exports.default = enhance(Options);


// WEBPACK FOOTER //
// ./packages/cases/lib/components/priority/Options.js