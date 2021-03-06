'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _reactRouterDom = require('react-router-dom');

var _substyle = require('substyle');

var _substyle2 = _interopRequireDefault(_substyle);

var _ui = require('@signavio/ui');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LinkHeaderTab = function LinkHeaderTab(_ref) {
  var children = _ref.children,
      style = _ref.style,
      to = _ref.to,
      location = _ref.location;
  return _react2.default.createElement(
    _reactRouterDom.Link,
    { to: to },
    _react2.default.createElement(
      _ui.HeaderTab,
      { active: location.pathname.startsWith(to), style: style },
      children
    )
  );
};

LinkHeaderTab.propTypes = {
  children: _propTypes2.default.node.isRequired,
  onlyActiveOnIndex: _propTypes2.default.bool,
  to: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.object]).isRequired,
  location: _propTypes2.default.shape({
    pathname: _propTypes2.default.string
  })
};

LinkHeaderTab.defaultProps = {
  onlyActiveOnIndex: false
};

LinkHeaderTab.propTypes = {
  children: _propTypes2.default.node,
  icon: _propTypes2.default.string,
  description: _propTypes2.default.string
};

exports.default = (0, _reactRouter.withRouter)((0, _substyle2.default)(LinkHeaderTab));


// WEBPACK FOOTER //
// ./packages/commons/lib/components/tabs/LinkHeaderTab.js