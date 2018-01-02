'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _components = require('@signavio/effektif-commons/lib/components');

var _styles = require('@signavio/effektif-commons/lib/styles');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PopoverIcon = (0, _components.withPopover)(_components.Icon);

var getPopover = function getPopover(customRules, deletedTypeDescriptor) {
  if (deletedTypeDescriptor) {
    return (0, _signavioI18n2.default)('This field has been deleted from connectors');
  }

  if (customRules) {
    return (0, _signavioI18n2.default)('This field has a custom rule defined');
  }

  return null;
};

function FieldDefinitionIcon(_ref) {
  var customRules = _ref.customRules,
      deletedTypeDescriptor = _ref.deletedTypeDescriptor,
      style = _ref.style;

  return _react2.default.createElement(PopoverIcon, {
    icon: deletedTypeDescriptor ? 'warning' : 'cog',
    popover: getPopover(customRules, deletedTypeDescriptor),
    small: true,
    style: style('fieldDefinitionIcon')
  });
}

var styled = (0, _styles.defaultStyle)(function (_ref2) {
  var color = _ref2.color;
  return {
    fieldDefinitionIcon: {
      color: 'transparent'
    },

    '&withVisibleIcon': {
      fieldDefinitionIcon: {
        color: color.mono.middle
      }
    }
  };
}, function (_ref3) {
  var customRules = _ref3.customRules,
      deletedTypeDescriptor = _ref3.deletedTypeDescriptor;
  return {
    '&withVisibleIcon': !!customRules || !!deletedTypeDescriptor
  };
});

exports.default = styled(FieldDefinitionIcon);


// WEBPACK FOOTER //
// ./packages/forms/lib/components/FieldDefinitionIcon.js