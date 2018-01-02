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

var _lodash = require('lodash');

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _styles = require('@signavio/effektif-commons/lib/styles');

var _tiles = require('@signavio/effektif-commons/lib/components/tiles');

var _buttons = require('@signavio/effektif-commons/lib/components/buttons');

var _ButtonGroup = require('./ButtonGroup');

var _ButtonGroup2 = _interopRequireDefault(_ButtonGroup);

var _OptionSelect = require('./OptionSelect');

var _OptionSelect2 = _interopRequireDefault(_OptionSelect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ButtonSelect(props) {
  var options = props.options,
      value = props.value,
      internalValue = props.internalValue,
      placeholder = props.placeholder,
      disabled = props.disabled,
      inactive = props.inactive,
      onSubmit = props.onSubmit,
      setInternalValue = props.setInternalValue,
      rest = (0, _objectWithoutProperties3.default)(props, ['options', 'value', 'internalValue', 'placeholder', 'disabled', 'inactive', 'onSubmit', 'setInternalValue']);


  if (options.length === 0) {
    return _react2.default.createElement(Submit, (0, _extends3.default)({}, rest, {
      disabled: disabled,
      inactive: inactive,
      onSubmit: function (_onSubmit) {
        function onSubmit() {
          return _onSubmit.apply(this, arguments);
        }

        onSubmit.toString = function () {
          return _onSubmit.toString();
        };

        return onSubmit;
      }(function () {
        return onSubmit(internalValue);
      })
    }));
  }

  if (options.length >= 4) {
    // fall back to regular select, but also add a submit button
    return _react2.default.createElement(
      _tiles.Tile,
      (0, _extends3.default)({}, rest, {
        toolbar: _react2.default.createElement(Submit, {
          style: rest.style('submit'),
          disabled: !value && !internalValue || disabled,
          inactive: inactive,
          value: internalValue,
          onSubmit: function (_onSubmit2) {
            function onSubmit() {
              return _onSubmit2.apply(this, arguments);
            }

            onSubmit.toString = function () {
              return _onSubmit2.toString();
            };

            return onSubmit;
          }(function () {
            return onSubmit(internalValue);
          })
        })
      }),
      _react2.default.createElement(_OptionSelect2.default, {
        style: rest.style('select'),
        noClear: true,
        disabled: disabled,
        placeholder: placeholder,
        options: options,
        value: internalValue,
        onChange: setInternalValue
      })
    );
  }

  return _react2.default.createElement(_ButtonGroup2.default, (0, _extends3.default)({}, rest, {
    disabled: disabled,
    inactive: inactive,
    options: options,
    onChange: onSubmit,
    value: value
  }));
}
exports.default = (0, _recompose.compose)((0, _recompose.withState)('internalValue', 'setInternalValue'), (0, _recompose.mapProps)(function (_ref) {
  var value = _ref.value,
      internalValue = _ref.internalValue,
      rest = (0, _objectWithoutProperties3.default)(_ref, ['value', 'internalValue']);
  return (0, _extends3.default)({}, rest, {
    value: value,
    internalValue: (0, _lodash.isUndefined)(internalValue) ? value : internalValue
  });
}), (0, _styles.defaultStyle)({
  submit: {
    marginLeft: 1
  }
}, function (_ref2) {
  var options = _ref2.options;
  return {
    '&buttonGroup': options.length > 0 && options.length < 4,
    '&direct': options.length === 0,
    '&select': options.length >= 4
  };
}))(ButtonSelect);


function Submit(_ref3) {
  var inactive = _ref3.inactive,
      disabled = _ref3.disabled,
      onSubmit = _ref3.onSubmit,
      rest = (0, _objectWithoutProperties3.default)(_ref3, ['inactive', 'disabled', 'onSubmit']);

  return _react2.default.createElement(
    _buttons.TextButton,
    (0, _extends3.default)({}, rest, {
      block: true,
      component: 'a',
      primary: !inactive,
      disabled: disabled,
      onClick: function onClick() {
        return onSubmit();
      }
    }),
    (0, _signavioI18n2.default)('Done')
  );
}


// WEBPACK FOOTER //
// ./packages/fields/lib/components/fields/types/choice/ButtonSelect.js