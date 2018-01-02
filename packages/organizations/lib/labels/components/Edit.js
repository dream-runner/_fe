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

var Edit = function Edit(_ref) {
  var onSave = _ref.onSave,
      updateLabel = _ref.updateLabel,
      rest = (0, _objectWithoutProperties3.default)(_ref, ['onSave', 'updateLabel']);
  return _react2.default.createElement(_Form2.default, (0, _extends3.default)({
    editing: true,
    onSave: function (_onSave) {
      function onSave(_x) {
        return _onSave.apply(this, arguments);
      }

      onSave.toString = function () {
        return _onSave.toString();
      };

      return onSave;
    }(function (updatedLabel) {
      updateLabel(updatedLabel);
      if (onSave) onSave();
    })
  }, rest));
};
exports.default = (0, _effektifApi.connect)(function (_ref2) {
  var id = _ref2.id;
  return {
    updateLabel: {
      type: _effektifApi.types.LABEL,
      method: 'update',
      id: id
    }
  };
})(Edit);


// WEBPACK FOOTER //
// ./packages/organizations/lib/labels/components/Edit.js