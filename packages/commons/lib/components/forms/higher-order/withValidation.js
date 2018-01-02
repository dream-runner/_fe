'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

exports.default = withValidation;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _styles = require('../../../styles');

var _Popover = require('../../Popover');

var _Popover2 = _interopRequireDefault(_Popover);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function withValidation(WrappedComponent) {
  function Validated(_ref) {
    var validationErrors = _ref.validationErrors,
        rest = (0, _objectWithoutProperties3.default)(_ref, ['validationErrors']);

    if (!validationErrors || validationErrors.length === 0) {
      return _react2.default.createElement(WrappedComponent, rest);
    }

    return _react2.default.createElement(
      _Popover2.default,
      {
        small: true,
        showDelay: 0,
        placement: 'right',
        popover: _react2.default.createElement(
          'ul',
          rest.style('errors'),
          validationErrors.map(function (error) {
            return _react2.default.createElement(
              'li',
              { key: error },
              error
            );
          })
        )
      },
      _react2.default.createElement(WrappedComponent, (0, _extends3.default)({}, rest, { style: rest.style('field') }))
    );
  }

  return styled(Validated);
}


var styled = (0, _styles.defaultStyle)(function (_ref2) {
  var padding = _ref2.padding,
      color = _ref2.color;
  return {
    errors: {
      marginTop: padding.xsmall,
      marginBottom: padding.xsmall,
      marginLeft: padding.normal,
      marginRight: padding.normal,

      paddingTop: 0,
      paddingRight: 0,
      paddingBottom: 0,
      paddingLeft: padding.small
    },

    field: {
      color: color.status.danger
    }
  };
});


// WEBPACK FOOTER //
// ./packages/commons/lib/components/forms/higher-order/withValidation.js