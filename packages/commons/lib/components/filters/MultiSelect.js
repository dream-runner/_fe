'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _substyle = require('substyle');

var _substyle2 = _interopRequireDefault(_substyle);

var _ = require('../');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getIndex = function getIndex(selectedItems, id) {
  return selectedItems.indexOf(id);
};

var MultiSelect = (0, _substyle2.default)(function (_ref) {
  var children = _ref.children,
      selectedItems = _ref.selectedItems,
      onChange = _ref.onChange,
      style = _ref.style,
      rest = (0, _objectWithoutProperties3.default)(_ref, ['children', 'selectedItems', 'onChange', 'style']);

  if (!children) {
    return _react2.default.createElement(
      _.Hint,
      null,
      (0, _signavioI18n2.default)('No filters available')
    );
  }

  return _react2.default.createElement(
    _.List,
    { style: style },
    children.map(function (child, index) {
      return _react2.default.cloneElement(child, (0, _extends3.default)({
        key: index,
        active: getIndex(selectedItems, child.props.id) >= 0,
        disabled: selectedItems.length === 0,
        onClick: function onClick() {
          var itemId = child.props.id;
          var idx = getIndex(selectedItems, itemId);

          if (idx >= 0) {
            onChange([].concat((0, _toConsumableArray3.default)(selectedItems.slice(0, idx)), (0, _toConsumableArray3.default)(selectedItems.slice(idx + 1))));
          } else {
            onChange([].concat((0, _toConsumableArray3.default)(selectedItems), [itemId]));
          }
        }
      }, style('filter')));
    })
  );
});

exports.default = MultiSelect;


// WEBPACK FOOTER //
// ./packages/commons/lib/components/filters/MultiSelect.js