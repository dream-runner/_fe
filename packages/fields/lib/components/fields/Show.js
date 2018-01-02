'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _components = require('@signavio/effektif-commons/lib/components');

var _tiles = require('@signavio/effektif-commons/lib/components/tiles');

var _NoValue = require('./NoValue');

var _NoValue2 = _interopRequireDefault(_NoValue);

var _wrapWithErrorBoundary = require('./higher-order/wrapWithErrorBoundary');

var _wrapWithErrorBoundary2 = _interopRequireDefault(_wrapWithErrorBoundary);

var _types = require('./types');

var typeComponents = _interopRequireWildcard(_types);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ShowField(props) {
  var type = props.type,
      value = props.value,
      emptyContent = props.emptyContent,
      small = props.small,
      transparent = props.transparent;


  if (!type) {
    throw new Error('Cannot render value ' + value + ' without a type');
  }

  var isEmpty = value === null || value === undefined || type.name === 'list' && value.length === 0 || type.name === 'money' && (value.amount === null || value.amount === undefined);

  if (isEmpty) {
    return _react2.default.createElement(
      _tiles.TextTile,
      { small: small, transparent: transparent },
      _react2.default.createElement(
        _components.Empty,
        null,
        emptyContent || _react2.default.createElement(_NoValue2.default, { type: type })
      )
    );
  }

  var _ref = typeComponents[type.name] || {},
      Show = _ref.Show;

  if (!Show) {
    throw new Error('Could not find a component to render <ShowField /> for type \'' + type.name + '\'');
  }

  return _react2.default.createElement(Show, props);
}

exports.default = (0, _wrapWithErrorBoundary2.default)(ShowField);


// WEBPACK FOOTER //
// ./packages/fields/lib/components/fields/Show.js