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

var _Show = require('./Show');

var _Show2 = _interopRequireDefault(_Show);

var _Edit = require('./Edit');

var _Edit2 = _interopRequireDefault(_Edit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Field(props) {
  var readOnly = props.readOnly,
      labelId = props.labelId,
      rest = (0, _objectWithoutProperties3.default)(props, ['readOnly', 'labelId']);

  var Component = readOnly ? _Show2.default : _Edit2.default;

  return _react2.default.createElement(Component, (0, _extends3.default)({ id: labelId }, rest));
}

var enhance = (0, _recompose.withHandlers)({
  onComplete: function onComplete(_ref) {
    var id = _ref.id,
        _onComplete = _ref.onComplete;
    return function (value) {
      if (!_onComplete) {
        return;
      }

      _onComplete(value, id);
    };
  }
});

exports.default = enhance(Field);


// WEBPACK FOOTER //
// ./packages/fields/lib/components/fields/Field.js