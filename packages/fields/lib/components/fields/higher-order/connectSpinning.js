'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

exports.default = connectSpinning;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _keys = require('lodash/keys');

var _keys2 = _interopRequireDefault(_keys);

var _values = require('lodash/values');

var _values2 = _interopRequireDefault(_values);

var _mapValues = require('lodash/mapValues');

var _mapValues2 = _interopRequireDefault(_mapValues);

var _pick = require('lodash/pick');

var _pick2 = _interopRequireDefault(_pick);

var _compact = require('lodash/compact');

var _compact2 = _interopRequireDefault(_compact);

var _tiles = require('@signavio/effektif-commons/lib/components/tiles');

var _hints = require('@signavio/effektif-commons/lib/components/hints');

var _components = require('@signavio/effektif-commons/lib/components');

var _effektifApi = require('@signavio/effektif-api');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getAllPromiseProps = function getAllPromiseProps(mapPropsToPromiseProps, props) {
  return (0, _compact2.default)((0, _values2.default)((0, _pick2.default)(props, (0, _keys2.default)(mapPropsToPromiseProps(props)))));
};

function connectSpinning(mapPropsToPromiseProps) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var inline = _ref.inline,
      restOptions = (0, _objectWithoutProperties3.default)(_ref, ['inline']);

  return function (WrappedComponent) {
    return (0, _effektifApi.connect)(mapPropsToPromiseProps, restOptions)(function (props) {
      var all = _effektifApi.promise.all(getAllPromiseProps(mapPropsToPromiseProps, props));

      if (all.fulfilled) {
        // map promise props to simple values
        var valueProps = (0, _mapValues2.default)((0, _pick2.default)(props, (0, _keys2.default)(mapPropsToPromiseProps(props))), function (p) {
          return p.value;
        });

        return _react2.default.createElement(WrappedComponent, (0, _extends3.default)({}, props, valueProps));
      }

      if (all.rejected && !all.pending) {
        return _react2.default.createElement(
          _tiles.TextTile,
          { inline: inline },
          _react2.default.createElement(
            _hints.Hint,
            { danger: true, inline: true },
            all.reason
          )
        );
      }

      return _react2.default.createElement(
        _tiles.TextTile,
        { inline: inline },
        _react2.default.createElement(_components.Spinner, null)
      );
    });
  };
}


// WEBPACK FOOTER //
// ./packages/fields/lib/components/fields/higher-order/connectSpinning.js