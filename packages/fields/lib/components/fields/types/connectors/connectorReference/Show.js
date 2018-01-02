'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _effektifApi = require('@signavio/effektif-api');

var _tiles = require('@signavio/effektif-commons/lib/components/tiles');

var _higherOrder = require('../../../higher-order');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var connectValue = (0, _higherOrder.connectSpinning)(function (_ref) {
  var value = _ref.value,
      type = _ref.type;
  return {
    connectorValue: {
      type: _effektifApi.types.CONNECTOR_DATA_SOURCE_OPTION,
      query: {
        connectorDataSourceId: type.id,
        id: value
      }
    }
  };
});

function ShowConnectorReference(_ref2) {
  var connectorValue = _ref2.connectorValue,
      highlightedName = _ref2.highlightedName,
      small = _ref2.small,
      transparent = _ref2.transparent;
  var name = connectorValue.name;


  return _react2.default.createElement(
    _tiles.TextTile,
    { small: small, transparent: transparent },
    highlightedName || name
  );
}

exports.default = connectValue(ShowConnectorReference);


// WEBPACK FOOTER //
// ./packages/fields/lib/components/fields/types/connectors/connectorReference/Show.js