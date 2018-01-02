'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.size = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _fp = require('lodash/fp');

var _recompose = require('recompose');

var _effektifApi = require('@signavio/effektif-api');

var _styles = require('@signavio/effektif-commons/lib/styles');

var _higherOrder = require('../../higher-order');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var omitProps = (0, _recompose.compose)(_recompose.mapProps, _fp.omit);

function Avatar(props) {
  var user = props.user,
      bust = props.bust,
      token = props.token,
      organization = props.organization,
      style = props.style,
      rest = (0, _objectWithoutProperties3.default)(props, ['user', 'bust', 'token', 'organization', 'style']);


  if (user.color) {
    return _react2.default.createElement(
      'div',
      (0, _extends3.default)({}, rest, { title: _effektifApi.userUtils.name(user) }, style),
      _react2.default.createElement(
        'div',
        style('content'),
        _effektifApi.userUtils.initials(user) || '?'
      )
    );
  }

  var src = (0, _effektifApi.getBaseUrl)(organization) + '/users/' + user.id + '/picture?token=' + token + (bust ? '&_dc=' + bust : '');

  return _react2.default.createElement(
    'div',
    (0, _extends3.default)({}, rest, { title: _effektifApi.userUtils.name(user) }, style),
    _react2.default.createElement('img', (0, _extends3.default)({}, style('content'), {
      src: src,
      alt: _effektifApi.userUtils.name(user),
      title: _effektifApi.userUtils.name(user)
    }))
  );
}

var config = function config(user, size, fontSize) {
  return {
    width: size,
    height: size,

    content: {
      width: size,
      height: size
    },

    '&text': {
      content: {
        lineHeight: size + 'px',

        textAlign: 'center',
        color: 'white',

        fontSize: fontSize,
        fontStyle: 'normal',

        verticalAlign: 'middle',

        userSelect: 'none',

        backgroundColor: user.color
      }
    }
  };
};

var size = exports.size = {
  micro: 20,
  small: 26,
  normal: 40,
  large: 80
};

var fontSize = {
  micro: 24 / 2,
  small: 24 / 3 * 2,
  normal: 24,
  large: 2 * 24
};

exports.default = (0, _recompose.compose)(_effektifApi.withOrganization, _higherOrder.withToken, (0, _styles.defaultStyle)(function (_, _ref) {
  var user = _ref.user;
  return (0, _extends3.default)({
    position: 'relative',
    display: 'block',

    backgroundColor: 'none',

    overflow: 'hidden',

    zIndex: 0

  }, config(user, size.normal, fontSize.normal), {

    '&mono': (0, _extends3.default)({}, _styles.utils.grayscale()),

    '&micro': config(user, size.micro, fontSize.micro),
    '&small': config(user, size.small, fontSize.small),
    '&large': config(user, size.large, fontSize.large),

    '&disabled': {
      filter: 'grayscale(100%)',
      opacity: 0.7
    },

    '&circular': {
      borderRadius: '50%'
    }
  });
}, function (_ref2) {
  var user = _ref2.user,
      disabled = _ref2.disabled,
      micro = _ref2.micro,
      small = _ref2.small,
      large = _ref2.large,
      circular = _ref2.circular;
  return {
    '&text': user.color,
    '&disabled': disabled,
    '&micro': micro,
    '&small': small,
    '&large': large,
    '&circular': circular
  };
}), omitProps(['micro', 'large', 'small', 'circular']))(Avatar);


// WEBPACK FOOTER //
// ./packages/organizations/lib/users/components/Avatar.js