'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _styles = require('@signavio/effektif-commons/lib/styles');

var _RightToggle = require('./RightToggle');

var _RightToggle2 = _interopRequireDefault(_RightToggle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function RightsManager(_ref) {
  var fixedRights = _ref.fixedRights,
      rights = _ref.rights,
      readOnly = _ref.readOnly,
      onRevoke = _ref.onRevoke,
      onGrant = _ref.onGrant,
      style = _ref.style;

  return _react2.default.createElement(
    'div',
    null,
    (0, _lodash.map)(rights, function (granted, right) {
      return _react2.default.createElement(_RightToggle2.default, {
        style: style('toggle'),
        key: right,
        right: right,
        readOnly: readOnly || (0, _lodash.includes)(fixedRights, right),
        granted: granted,
        onGrant: onGrant,
        onRevoke: onRevoke
      });
    })
  );
}

var styled = (0, _styles.defaultStyle)({
  toggle: (0, _extends3.default)({}, _styles.utils.borderLeft('1px', 'solid', 'white'))
});

exports.default = styled(RightsManager);


// WEBPACK FOOTER //
// ./packages/access/lib/components/RightsManager.js