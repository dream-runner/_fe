'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _recompose = require('recompose');

var _styles = require('../styles');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var KeepContent = function KeepContent(_ref) {
  var children = _ref.children,
      previousChildren = _ref.previousChildren,
      mask = _ref.mask;
  return _react2.default.createElement(
    'div',
    {
      style: {
        position: 'relative',
        marginTop: _styles.padding.normal,
        minHeight: !children ? 100 : 0
      }
    },
    children || previousChildren,
    !children && mask
  );
};

var enhance = (0, _recompose.compose)((0, _recompose.withState)('previousChildren', 'setPreviousChildren', null), (0, _recompose.lifecycle)({
  componentWillReceiveProps: function componentWillReceiveProps(_ref2) {
    var children = _ref2.children,
        setPreviousChildren = _ref2.setPreviousChildren,
        previousChildren = _ref2.previousChildren;

    if (!children && this.props.children && this.props.children !== previousChildren) {
      setPreviousChildren(this.props.children);
    }
  }
}));

exports.default = enhance(KeepContent);


// WEBPACK FOOTER //
// ./packages/commons/lib/components/KeepContent.js