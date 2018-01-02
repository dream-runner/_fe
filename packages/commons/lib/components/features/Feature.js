'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _radium = require('radium');

var _radium2 = _interopRequireDefault(_radium);

var _propTypes3 = require('../../propTypes');

var _SneakPeek = require('./SneakPeek');

var _SneakPeek2 = _interopRequireDefault(_SneakPeek);

var _applicationName = require('../../applicationName');

var _applicationName2 = _interopRequireDefault(_applicationName);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var hasFeature = function hasFeature(features, feature) {
  return !feature || features.indexOf(feature) >= 0;
};
var hasRight = function hasRight(adminOnly, user) {
  return !adminOnly || user.systemAdmin;
};
var getHint = function getHint(hint) {
  return hint || (0, _signavioI18n2.default)('Unfortunately this feature is not included in your version of __applicationName__.', { applicationName: _applicationName2.default });
};

function Feature(props, _ref) {
  var user = _ref.user,
      _ref$features = _ref.features,
      features = _ref$features === undefined ? [] : _ref$features;
  var sneakPeek = props.sneakPeek,
      tooltip = props.tooltip,
      tooltipPlacement = props.tooltipPlacement,
      children = props.children,
      adminOnly = props.adminOnly,
      showHint = props.showHint,
      feature = props.feature,
      hint = props.hint,
      rest = (0, _objectWithoutProperties3.default)(props, ['sneakPeek', 'tooltip', 'tooltipPlacement', 'children', 'adminOnly', 'showHint', 'feature', 'hint']);


  if (!children) {
    return null;
  }

  if (!hasFeature(features, feature) || !hasRight(adminOnly, user)) {
    if (sneakPeek || hint || tooltip) {
      return _react2.default.createElement(
        _SneakPeek2.default,
        {
          style: rest.style,
          hint: getHint(hint),
          tooltip: tooltip,
          tooltipPlacement: tooltipPlacement
        },
        children
      );
    }

    return null;
  }

  return _react.Children.only(children);
}

Feature.propTypes = {
  /**
     * Render a read-only static view of the wrapped component to allow a sneak peek of
     * what the feature would look like.
     */
  sneakPeek: _propTypes2.default.bool,
  adminOnly: _propTypes2.default.bool,

  hint: _propTypes2.default.string,
  tooltip: _propTypes2.default.string,
  tooltipPlacement: _propTypes2.default.oneOf(['top', 'bottom', 'left', 'right']),
  feature: _propTypes2.default.string
};

Feature.contextTypes = {
  features: _propTypes2.default.arrayOf(_propTypes2.default.string).isRequired,

  user: _propTypes3.User
};

exports.default = (0, _radium2.default)(Feature);


// WEBPACK FOOTER //
// ./packages/commons/lib/components/features/Feature.js