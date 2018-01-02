'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _hints = require('./hints');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LoadingMask = function LoadingMask(_ref) {
  var children = _ref.children;
  return _react2.default.createElement(
    'div',
    {
      style: {
        position: 'absolute',
        top: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.75)'
      }
    },
    _react2.default.createElement(
      'div',
      {
        style: {
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        }
      },
      _react2.default.createElement(
        _hints.Hint,
        { loading: true },
        children
      )
    )
  );
};

exports.default = LoadingMask;


// WEBPACK FOOTER //
// ./packages/commons/lib/components/LoadingMask.js