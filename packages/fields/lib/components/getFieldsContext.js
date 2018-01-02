'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactBroadcast = require('react-broadcast');

var _ProvideFieldsContext = require('./ProvideFieldsContext');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getFieldsContext = function getFieldsContext(WrappedComponent) {
  return function (props) {
    return _react2.default.createElement(
      _reactBroadcast.Subscriber,
      { channel: _ProvideFieldsContext.FIELDS_CONTEXT_CHANNEL },
      function (fieldsContext) {
        return _react2.default.createElement(WrappedComponent, (0, _extends3.default)({}, props, fieldsContext));
      }
    );
  };
};
exports.default = getFieldsContext;


// WEBPACK FOOTER //
// ./packages/fields/lib/components/getFieldsContext.js