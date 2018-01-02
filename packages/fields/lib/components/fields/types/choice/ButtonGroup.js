'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ButtonGroup;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _components = require('@signavio/effektif-commons/lib/components');

var _ChoiceButton = require('./ChoiceButton');

var _ChoiceButton2 = _interopRequireDefault(_ChoiceButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ButtonGroup(props) {
  var options = props.options,
      readOnly = props.readOnly,
      inactive = props.inactive,
      value = props.value,
      onChange = props.onChange;


  var cols = 100 / options.length;

  return _react2.default.createElement(
    _components.List,
    {
      direction: 'horizontal',
      style: {
        '&horizontal': {
          entry: {
            width: 'calc(' + cols + '% - 1px)'
          },
          firstEntry: {
            width: cols + '%'
          }
        }
      }
    },
    options.map(function (option) {
      return _react2.default.createElement(_ChoiceButton2.default, {
        key: option.id,
        isPrimary: isPrimary(option, value, inactive),
        readOnly: readOnly,
        onChange: onChange,
        option: option
      });
    })
  );
}


var isPrimary = function isPrimary(option, value, inactive) {
  if (inactive) {
    return false;
  }

  if (!value) {
    return true;
  }

  return value === option.id;
};


// WEBPACK FOOTER //
// ./packages/fields/lib/components/fields/types/choice/ButtonGroup.js