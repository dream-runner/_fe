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

var _effektifApi = require('@signavio/effektif-api');

var _Form = require('./Form');

var _Form2 = _interopRequireDefault(_Form);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Create = function Create(_ref) {
  var createLabel = _ref.createLabel,
      rest = (0, _objectWithoutProperties3.default)(_ref, ['createLabel']);
  return _react2.default.createElement(_Form2.default, (0, _extends3.default)({
    color: '#1273de',
    onCancel: function onCancel() {
      return null;
    },
    onSave: function onSave(newLabel) {
      return createLabel(newLabel);
    }
  }, rest));
};
exports.default = (0, _effektifApi.connect)(function () {
  return {
    createLabel: {
      type: _effektifApi.types.LABEL,
      method: 'create'
    }
  };
})(Create);


// WEBPACK FOOTER //
// ./packages/organizations/lib/labels/components/Create.js