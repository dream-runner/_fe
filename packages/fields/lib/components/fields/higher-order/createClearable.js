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

var _tiles = require('@signavio/effektif-commons/lib/components/tiles');

var _buttons = require('@signavio/effektif-commons/lib/components/buttons');

var _styles = require('@signavio/effektif-commons/lib/styles');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var triggerOnComplete = _ref.triggerOnComplete;
  return function createClearableHOC(WrappedComponent) {
    function Clearable(props) {
      var noClear = props.noClear,
          onClear = props.onClear,
          rest = (0, _objectWithoutProperties3.default)(props, ['noClear', 'onClear']);
      var value = rest.value,
          disabled = rest.disabled,
          style = rest.style;


      if (noClear) {
        return _react2.default.createElement(WrappedComponent, rest);
      }

      return _react2.default.createElement(
        _tiles.Tile,
        {
          transparent: true,
          toolbar: _react2.default.createElement(_buttons.RemoveButton, {
            style: style('remove'),
            onClick: onClear,
            disabled: disabled || value == null
          })
        },
        _react2.default.createElement(WrappedComponent, rest)
      );
    }

    return (0, _recompose.compose)((0, _styles.defaultStyle)({
      remove: (0, _extends3.default)({}, _styles.utils.borderLeft(1, 'solid', 'white'))
    }), (0, _recompose.withHandlers)({
      onClear: function onClear(_ref2) {
        var onChange = _ref2.onChange,
            onComplete = _ref2.onComplete;

        return function () {
          onChange(null);

          if (triggerOnComplete && onComplete) {
            onComplete(null);
          }
        };
      }
    }))(Clearable);
  };
};


// WEBPACK FOOTER //
// ./packages/fields/lib/components/fields/higher-order/createClearable.js