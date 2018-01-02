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

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _forms = require('@signavio/effektif-commons/lib/components/forms');

var _styles = require('@signavio/effektif-commons/lib/styles');

var _higherOrder = require('../../higher-order');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function OptionSelect(_ref) {
  var placeholder = _ref.placeholder,
      options = _ref.options,
      style = _ref.style,
      rest = (0, _objectWithoutProperties3.default)(_ref, ['placeholder', 'options', 'style']);

  return _react2.default.createElement(
    _forms.DropdownSelect,
    (0, _extends3.default)({}, rest, {
      placeholder: placeholder || (0, _signavioI18n2.default)('Decision'),
      style: style('dropdown')
    }),
    options.map(function (_ref2) {
      var id = _ref2.id,
          name = _ref2.name,
          disabled = _ref2.disabled;
      return _react2.default.createElement(_forms.Option, { key: id, value: id, name: name, disabled: disabled });
    })
  );
}

exports.default = (0, _recompose.compose)((0, _higherOrder.createClearable)({ triggerOnComplete: true }), (0, _styles.defaultStyle)({
  dropdown: {
    widget: {
      maxHeight: 350,
      outline: 'none',
      overflowY: 'auto'
    }
  }
}))(OptionSelect);


// WEBPACK FOOTER //
// ./packages/fields/lib/components/fields/types/choice/OptionSelect.js