'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

exports.default = convertDateTimeHOC;

var _recompose = require('recompose');

var _extensions = require('../../../extensions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function convertDateTimeHOC(WrappedComponent) {
  return (0, _recompose.compose)((0, _recompose.withHandlers)({
    onChange: function (_onChange) {
      function onChange(_x) {
        return _onChange.apply(this, arguments);
      }

      onChange.toString = function () {
        return _onChange.toString();
      };

      return onChange;
    }(function (_ref) {
      var onChange = _ref.onChange,
          value = _ref.value;
      return function (date) {
        var newValue = (0, _extensions.moment)(date);

        if (value) {
          var _moment$format$split = (0, _extensions.moment)(value).format('HH:mm').split(':'),
              _moment$format$split2 = (0, _slicedToArray3.default)(_moment$format$split, 2),
              hour = _moment$format$split2[0],
              minute = _moment$format$split2[1];

          newValue.hour(hour);
          newValue.minute(minute);
        } else {
          newValue.hour(0);
          newValue.minute(0);
        }

        newValue.second(0);
        newValue.millisecond(0);

        onChange(newValue.toISOString());
      };
    })
  }))(WrappedComponent);
}


// WEBPACK FOOTER //
// ./packages/commons/lib/components/forms/higher-order/convertDateTime.js