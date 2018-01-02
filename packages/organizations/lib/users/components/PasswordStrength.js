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

var _nodeComplexify = require('node-complexify');

var _lodash = require('lodash');

var _styles = require('@signavio/effektif-commons/lib/styles');

var _StrengthIndicator = require('./StrengthIndicator');

var _StrengthIndicator2 = _interopRequireDefault(_StrengthIndicator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function PasswordStrength(_ref) {
  var style = _ref.style,
      props = (0, _objectWithoutProperties3.default)(_ref, ['style']);

  var _omit = (0, _lodash.omit)(props, 'value', 'setStrength', 'onValidityChange'),
      strength = _omit.strength,
      rest = (0, _objectWithoutProperties3.default)(_omit, ['strength']);

  return _react2.default.createElement(
    'div',
    (0, _extends3.default)({}, rest, style),
    _react2.default.createElement(_StrengthIndicator2.default, { strength: strength })
  );
}

var evalPassword = function evalPassword(password) {
  return new Promise(function (resolve) {
    (0, _nodeComplexify.evalPasswordComplexity)(password || '', {
      minimumChars: 6,
      strengthScaleFactor: 0.5
    }, function (err, valid, complexity) {
      return resolve({
        valid: valid,
        strength: Math.min(Math.max(Math.round(complexity / _StrengthIndicator.STRENGH_INTERVALS), 0), _StrengthIndicator.STRENGH_INTERVALS - 1)
      });
    });
  });
};

exports.default = (0, _recompose.compose)((0, _recompose.withState)('strength', 'setStrength', 0), (0, _recompose.lifecycle)({
  componentWillMount: function componentWillMount() {
    var _props = this.props,
        value = _props.value,
        setStrength = _props.setStrength,
        onValidityChange = _props.onValidityChange;


    evalPassword(value).then(function (_ref2) {
      var valid = _ref2.valid,
          strength = _ref2.strength;

      setStrength(strength);

      if (onValidityChange) {
        onValidityChange(valid);
      }
    });
  },
  componentWillReceiveProps: function componentWillReceiveProps(_ref3) {
    var nextValue = _ref3.value,
        onValidityChange = _ref3.onValidityChange;
    var _props2 = this.props,
        value = _props2.value,
        setStrength = _props2.setStrength;


    if (value === nextValue) {
      return;
    }

    evalPassword(nextValue).then(function (_ref4) {
      var valid = _ref4.valid,
          strength = _ref4.strength;

      setStrength(strength);

      if (onValidityChange) {
        onValidityChange(valid);
      }
    });
  }
}), (0, _styles.defaultStyle)((0, _extends3.default)({
  height: 0,
  overflow: 'hidden',
  backgroundColor: 'rgba(255, 255, 255, 0.5)'

}, _styles.utils.transition('height'), {

  '&active': {
    height: _styles.padding.xsmall
  }
}), function (_ref5) {
  var value = _ref5.value;
  return {
    '&active': !!value
  };
}))(PasswordStrength);


// WEBPACK FOOTER //
// ./packages/organizations/lib/users/components/PasswordStrength.js