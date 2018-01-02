'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _styles = require('../../styles');

var _Filter = require('./Filter');

var _Filter2 = _interopRequireDefault(_Filter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BooleanSelect = function BooleanSelect(_ref) {
  var name = _ref.name,
      value = _ref.value,
      onChange = _ref.onChange,
      style = _ref.style;
  return _react2.default.createElement(
    _Filter2.default,
    {
      icon: 'check',
      active: value,
      onClick: function onClick() {
        return onChange(!value);
      },
      style: style
    },
    name
  );
};


var styled = (0, _styles.defaultStyle)(function (theme) {
  return {
    header: {
      backgroundColor: theme.color.mono.light
    }
  };
});

exports.default = styled(BooleanSelect);


// WEBPACK FOOTER //
// ./packages/commons/lib/components/filters/BooleanSelect.js