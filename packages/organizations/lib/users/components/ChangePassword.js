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

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _recompose = require('recompose');

var _components = require('@signavio/effektif-commons/lib/components');

var _styles = require('@signavio/effektif-commons/lib/styles');

var _PasswordStrength = require('./PasswordStrength');

var _PasswordStrength2 = _interopRequireDefault(_PasswordStrength);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getErrorMessage = function getErrorMessage(validPassword, password, confirmation) {
  if (!validPassword) {
    return (0, _signavioI18n2.default)('Password is too weak');
  }

  if (password !== confirmation) {
    return (0, _signavioI18n2.default)('Passwords do not match');
  }

  return '';
};

var hasError = function hasError(validPassword, password, confirmation) {
  return !validPassword || password !== confirmation;
};

function ChangePassword(props) {
  var placeholder = props.placeholder,
      password = props.password,
      confirmation = props.confirmation,
      validPassword = props.validPassword,
      onChange = props.onChange,
      changePassword = props.changePassword,
      changeConfirmation = props.changeConfirmation,
      setValidity = props.setValidity,
      rest = (0, _objectWithoutProperties3.default)(props, ['placeholder', 'password', 'confirmation', 'validPassword', 'onChange', 'changePassword', 'changeConfirmation', 'setValidity']);


  return _react2.default.createElement(
    _components.Popover,
    {
      popover: getErrorMessage(validPassword, password, confirmation),
      placement: 'right'
    },
    _react2.default.createElement(
      _components.List,
      null,
      _react2.default.createElement('input', (0, _extends3.default)({}, rest, rest.style('input'), {
        type: 'password',
        value: password,
        onChange: function (_onChange) {
          function onChange(_x) {
            return _onChange.apply(this, arguments);
          }

          onChange.toString = function () {
            return _onChange.toString();
          };

          return onChange;
        }(function (ev) {
          var value = ev.target.value;

          changePassword(value);
          onChange(value, hasError(validPassword, value, confirmation));
        }),
        placeholder: placeholder || (0, _signavioI18n2.default)('Change password')
      })),
      _react2.default.createElement('input', (0, _extends3.default)({}, rest.style('input'), {
        type: 'password',
        disabled: !validPassword,
        value: confirmation,
        placeholder: (0, _signavioI18n2.default)('Retype password'),
        onChange: function (_onChange2) {
          function onChange(_x2) {
            return _onChange2.apply(this, arguments);
          }

          onChange.toString = function () {
            return _onChange2.toString();
          };

          return onChange;
        }(function (ev) {
          var value = ev.target.value;

          changeConfirmation(value);
          onChange(value, hasError(validPassword, password, value));
        }),
        onBlur: function onBlur() {
          if (hasError(validPassword, password, confirmation)) {
            changeConfirmation('');
          }
        }
      })),
      _react2.default.createElement(_PasswordStrength2.default, { value: password, onValidityChange: setValidity })
    )
  );
}

exports.default = (0, _recompose.compose)((0, _recompose.withState)('password', 'changePassword', ''), (0, _recompose.withState)('confirmation', 'changeConfirmation', ''), (0, _recompose.withState)('validPassword', 'setValidity', false), (0, _styles.defaultStyle)({
  input: {
    width: '100%',
    display: 'block'
  }
}))(ChangePassword);


// WEBPACK FOOTER //
// ./packages/organizations/lib/users/components/ChangePassword.js