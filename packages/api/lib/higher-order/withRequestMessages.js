'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = withRequestMessages;

var _react = require('react');

var React = _interopRequireWildcard(_react);

var _hints = require('@signavio/effektif-commons/lib/components/hints');

var _utils = require('./utils');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function withRequestMessages(methodMap) {
  return function (WrappedComponent) {
    return function (props) {
      var rejectedMessage = (0, _utils.getRequestMessage)(methodMap, props, 'rejected');
      if (rejectedMessage) {
        return React.createElement(
          _hints.Hint,
          { danger: true, view: true },
          rejectedMessage
        );
      }

      var pendingMessage = (0, _utils.getRequestMessage)(methodMap, props, 'pending');
      if (pendingMessage) {
        return React.createElement(
          _hints.Hint,
          { loading: true, view: true },
          pendingMessage
        );
      }

      return React.createElement(WrappedComponent, props);
    };
  };
}


// WEBPACK FOOTER //
// ./packages/api/lib/higher-order/withRequestMessages.js