'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

exports.default = withPopoverHOC;

var _react = require('react');

var React = _interopRequireWildcard(_react);

var _Popover = require('../Popover');

var _Popover2 = _interopRequireDefault(_Popover);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function withPopoverHOC(WrappedComponent) {
  var withPopover = function withPopover(_ref) {
    var popover = _ref.popover,
        _ref$position = _ref.position,
        position = _ref$position === undefined ? 'top' : _ref$position,
        _ref$showDelay = _ref.showDelay,
        showDelay = _ref$showDelay === undefined ? 0 : _ref$showDelay,
        small = _ref.small,
        rest = (0, _objectWithoutProperties3.default)(_ref, ['popover', 'position', 'showDelay', 'small']);

    if (popover) {
      return React.createElement(
        _Popover2.default,
        {
          popover: popover,
          position: position,
          showDelay: showDelay,
          small: small
        },
        React.createElement(WrappedComponent, rest)
      );
    }

    return React.createElement(WrappedComponent, rest);
  };

  return withPopover;
}


// WEBPACK FOOTER //
// ./packages/commons/lib/components/higher-order/withPopover.js