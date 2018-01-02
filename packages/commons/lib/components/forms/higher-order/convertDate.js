'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

exports.default = convertDateHOC;

var _recompose = require('recompose');

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function convertDateHOC(WrappedComponent) {
  return (0, _recompose.compose)((0, _recompose.withProps)(function (_ref) {
    var value = _ref.value,
        rest = (0, _objectWithoutProperties3.default)(_ref, ['value']);
    return (0, _extends3.default)({
      value: (0, _utils.formatDateOrTime)(value, 'Y-MM-DD')
    }, rest);
  }), (0, _recompose.withHandlers)({
    onChange: function (_onChange) {
      function onChange(_x) {
        return _onChange.apply(this, arguments);
      }

      onChange.toString = function () {
        return _onChange.toString();
      };

      return onChange;
    }(function (_ref2) {
      var onChange = _ref2.onChange;
      return function (date) {
        var result = date + 'T00:00:00.000Z';

        if (!(0, _utils.validateDate)(date)) {
          return;
        }

        onChange(result);
      };
    })
  }))(WrappedComponent);
}


// WEBPACK FOOTER //
// ./packages/commons/lib/components/forms/higher-order/convertDate.js