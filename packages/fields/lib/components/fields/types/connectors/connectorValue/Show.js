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

var _extensions = require('@signavio/effektif-commons/lib/extensions');

var _tiles = require('@signavio/effektif-commons/lib/components/tiles');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ShowConnectorValue(_ref) {
  var value = _ref.value,
      highlightedName = _ref.highlightedName,
      small = _ref.small,
      transparent = _ref.transparent,
      hideTime = _ref.hideTime;
  var name = value.name,
      time = value.time;


  return _react2.default.createElement(
    _tiles.TextTile,
    (0, _extends3.default)({
      subtitle: hideTime ? null : (0, _signavioI18n2.default)('Value set on __time__', {
        time: (0, _extensions.moment)(time).format('LLL')
      })
    }, { small: small, transparent: transparent }),
    highlightedName || name
  );
}

exports.default = ShowConnectorValue;


// WEBPACK FOOTER //
// ./packages/fields/lib/components/fields/types/connectors/connectorValue/Show.js