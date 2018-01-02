'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _components = require('@signavio/effektif-commons/lib/components');

var _effektifFields = require('@signavio/effektif-fields');

var _effektifFields2 = _interopRequireDefault(_effektifFields);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AccessRightsIndicator = function AccessRightsIndicator(_ref) {
  var access = _ref.access;
  return _react2.default.createElement(
    _components.PopoverNew,
    {
      small: true,
      position: 'right',
      popover: _react2.default.createElement(
        _components.List,
        null,
        access.edit.map(function (_ref2) {
          var type = _ref2.type,
              id = _ref2.id;
          return _react2.default.createElement(_effektifFields2.default, {
            transparent: true,
            readOnly: true,
            small: true,
            type: { name: type + 'Id' },
            value: id,
            key: id
          });
        })
      )
    },
    _react2.default.createElement(_components.Icon, { icon: 'lock', iconSet: 'fontAwesome' })
  );
};

exports.default = AccessRightsIndicator;


// WEBPACK FOOTER //
// ./packages/reporting/lib/report/components/AccessRightsIndicator.js