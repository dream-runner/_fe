'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _recompose = require('recompose');

var _reactForms = require('@signavio/react-forms');

var _components = require('@signavio/effektif-commons/lib/components');

var _styles = require('@signavio/effektif-commons/lib/styles');

var _higherOrder = require('../../higher-order');

var _LabeledCheckbox = require('./LabeledCheckbox');

var _LabeledCheckbox2 = _interopRequireDefault(_LabeledCheckbox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ClearableToggle = (0, _higherOrder.createClearable)({ triggerOnComplete: false })(_components.Toggle);


function Edit(props) {
  var indeterminate = props.indeterminate,
      value = props.value,
      onChange = props.onChange,
      label = props.label,
      regularBoolean = props.regularBoolean,
      readOnly = props.readOnly,
      rest = (0, _objectWithoutProperties3.default)(props, ['indeterminate', 'value', 'onChange', 'label', 'regularBoolean', 'readOnly']);


  if (regularBoolean) {
    return _react2.default.createElement(_LabeledCheckbox2.default, (0, _extends3.default)({ indeterminate: indeterminate, label: label, value: value, readOnly: readOnly }, {
      onChange: function (_onChange) {
        function onChange(_x) {
          return _onChange.apply(this, arguments);
        }

        onChange.toString = function () {
          return _onChange.toString();
        };

        return onChange;
      }(function (ev) {
        return onChange(ev.target.checked);
      })
    }));
  }

  return _react2.default.createElement(ClearableToggle, (0, _extends3.default)({ value: value, readOnly: readOnly, onChange: onChange }, rest));
}

exports.default = (0, _recompose.compose)((0, _styles.defaultStyle)(function () {
  return {
    '&triState': (0, _extends3.default)({
      width: '50%'

    }, _styles.utils.media.xs({
      width: '100%'
    }))
  };
}, function (props) {
  return {
    '&regular': props.regularBoolean,
    '&triState': !props.regularBoolean,
    '&readOnly': props.readOnly
  };
}), _reactForms.triggerOnCompleteOnChange)(Edit);


// WEBPACK FOOTER //
// ./packages/fields/lib/components/fields/types/boolean/Edit.js