'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _lodash = require('lodash');

var _recompose = require('recompose');

var _utils = require('@signavio/effektif-commons/lib/utils');

var _components = require('@signavio/effektif-commons/lib/components');

var _buttons = require('@signavio/effektif-commons/lib/components/buttons');

var _tiles = require('@signavio/effektif-commons/lib/components/tiles');

var _forms = require('@signavio/effektif-commons/lib/components/forms');

var _styles = require('@signavio/effektif-commons/lib/styles');

var _reactForms = require('@signavio/react-forms');

var _ChangePassword = require('./ChangePassword');

var _ChangePassword2 = _interopRequireDefault(_ChangePassword);

var _Avatar = require('./Avatar');

var _Avatar2 = _interopRequireDefault(_Avatar);

var _CountrySelect = require('./CountrySelect');

var _CountrySelect2 = _interopRequireDefault(_CountrySelect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TextField = (0, _recompose.compose)(_reactForms.triggerOnCompleteOnBlur, _reactForms.triggerOnCompleteOnEnter)(_forms.Text);

function UserDetails(props) {
  var user = props.user,
      style = props.style,
      lastAvatarUpload = props.lastAvatarUpload,
      onFirstNameChange = props.onFirstNameChange,
      onLastNameChange = props.onLastNameChange,
      onPhoneChange = props.onPhoneChange,
      onCountryChange = props.onCountryChange,
      onUploaded = props.onUploaded,
      onUseRandomColor = props.onUseRandomColor,
      onPasswordChange = props.onPasswordChange,
      userEndpoint = props.userEndpoint;


  return _react2.default.createElement(
    _components.List,
    null,
    _react2.default.createElement('input', {
      disabled: true,
      type: 'email',
      className: 'form-control',
      value: user.emailAddress
    }),
    _react2.default.createElement(
      _components.List,
      { style: style('columns'), direction: 'horizontal' },
      _react2.default.createElement(TextField, {
        style: style('input'),
        defaultValue: user.firstName,
        onComplete: onFirstNameChange,
        placeholder: (0, _signavioI18n2.default)('First name') + '*',
        required: 'true'
      }),
      _react2.default.createElement(TextField, {
        style: style('input'),
        defaultValue: user.lastName,
        onComplete: onLastNameChange,
        placeholder: (0, _signavioI18n2.default)('Last name') + '*',
        required: 'true'
      })
    ),
    _react2.default.createElement(TextField, {
      style: style('input'),
      defaultValue: user.phone,
      onComplete: onPhoneChange,
      placeholder: (0, _signavioI18n2.default)('Telephone number*')
    }),
    _react2.default.createElement(_CountrySelect2.default, { value: user.country, onChange: onCountryChange }),
    _react2.default.createElement(
      _components.List,
      { style: style('columns'), direction: 'horizontal' },
      _react2.default.createElement(_components.FileUpload, {
        flat: true,
        avatar: _react2.default.createElement(_Avatar2.default, {
          style: style('avatar'),
          user: user,
          bust: lastAvatarUpload
        }),
        title: (0, _signavioI18n2.default)('Upload Picture'),
        endpoint: userEndpoint + '/picture',
        onUploaded: onUploaded
      }),
      _react2.default.createElement(
        _tiles.Tile,
        null,
        _react2.default.createElement(
          _buttons.LinkButton,
          { block: true, style: style('label'), onClick: onUseRandomColor },
          (0, _signavioI18n2.default)('Use a random color instead of a picutre')
        )
      )
    ),
    _react2.default.createElement(
      _components.List,
      { style: style('columns'), direction: 'horizontal' },
      _react2.default.createElement(_ChangePassword2.default, {
        onChange: onPasswordChange,
        placeholder: (0, _lodash.isNil)(user.id) ? (0, _signavioI18n2.default)('Password') : (0, _signavioI18n2.default)('Change password')
      }),
      _react2.default.createElement(
        _tiles.TextTile,
        { style: style('label') },
        (0, _signavioI18n2.default)('Use at least 6 characters.')
      )
    )
  );
}

var createOnChange = function createOnChange(property) {
  return function (_ref) {
    var onChange = _ref.onChange;
    return function (value) {
      return onChange((0, _defineProperty3.default)({}, property, value));
    };
  };
};

exports.default = (0, _recompose.compose)((0, _recompose.withState)('lastAvatarUpload', 'setLastAvatarUpload', new Date().getTime()), (0, _recompose.withHandlers)({
  onFirstNameChange: createOnChange('firstName'),
  onLastNameChange: createOnChange('lastName'),
  onPhoneChange: createOnChange('phone'),
  onCountryChange: createOnChange('country'),
  onUploaded: function onUploaded(_ref2) {
    var onChange = _ref2.onChange,
        setLastAvatarUpload = _ref2.setLastAvatarUpload,
        onAvatarChange = _ref2.onAvatarChange;
    return function () {
      onChange({ color: null });
      setLastAvatarUpload(new Date().getTime());
      if (onAvatarChange) {
        onAvatarChange();
      }
    };
  },
  onUseRandomColor: function onUseRandomColor(_ref3) {
    var onChange = _ref3.onChange,
        user = _ref3.user;
    return function (ev) {
      ev.preventDefault();
      var color = _utils.UserUtils.changeColor(user.color);
      onChange({ color: color });
    };
  },
  onPasswordChange: function onPasswordChange(_ref4) {
    var onChange = _ref4.onChange;
    return function (password, error) {
      onChange({ password: error ? '' : password });
    };
  }
}), (0, _styles.defaultStyle)(function (_ref5) {
  var padding = _ref5.padding,
      font = _ref5.font;
  return {
    avatar: {
      float: 'left',
      marginLeft: -padding.normal
    },
    input: {
      width: '100%'
    },
    columns: {
      entry: {
        width: 'calc(50% - 1px)',

        '&first': {
          width: '50%'
        }
      }
    },
    label: {
      fontSize: font.size.small
    }
  };
}))(UserDetails);


// WEBPACK FOOTER //
// ./packages/organizations/lib/users/components/Details.js