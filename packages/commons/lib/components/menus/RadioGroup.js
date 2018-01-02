'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

exports.default = RadioGroup;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ui = require('@signavio/ui');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function RadioGroup(_ref) {
  var children = _ref.children,
      value = _ref.value,
      readOnly = _ref.readOnly,
      onChange = _ref.onChange,
      rest = (0, _objectWithoutProperties3.default)(_ref, ['children', 'value', 'readOnly', 'onChange']);

  return _react2.default.createElement(
    _ui.List,
    rest,
    _react.Children.map(children, function (child) {
      return _react2.default.cloneElement(child, {
        selected: value === child.props.value,
        disabled: readOnly || child.props.disabled,
        onClick: function onClick() {
          return onChange(child.props.value);
        }
      });
    })
  );
}


// WEBPACK FOOTER //
// ./packages/commons/lib/components/menus/RadioGroup.js