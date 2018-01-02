'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _recompose = require('recompose');

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _lodash = require('lodash');

var _components = require('@signavio/effektif-commons/lib/components');

var _LabelTile = require('./LabelTile');

var _LabelTile2 = _interopRequireDefault(_LabelTile);

var _types = require('../../types');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Filter(_ref) {
  var onFilterChange = _ref.onFilterChange,
      active = _ref.active,
      labels = _ref.labels;

  var filters = active.labels || [];

  return _react2.default.createElement(
    _components.FilterList,
    {
      title: (0, _signavioI18n2.default)('Labels'),
      hint: filters.length > 0 ? (0, _signavioI18n2.default)('__count__ filter active', '__count__ filters active', {
        count: filters.length
      }) : null,
      expanded: filters.length > 0
    },
    _react2.default.createElement(
      _components.MultiSelect,
      { selectedItems: filters, onChange: onFilterChange },
      labels.map(function (label) {
        return _react2.default.createElement(
          _components.Filter,
          { id: label.id, key: label.id, icon: 'check' },
          _react2.default.createElement(_LabelTile2.default, (0, _extends3.default)({ small: true }, label))
        );
      })
    )
  );
}
exports.default = (0, _recompose.compose)((0, _recompose.withHandlers)({
  onFilterChange: function onFilterChange(_ref2) {
    var onChange = _ref2.onChange;
    return function (selectedItems) {
      onChange({ labels: selectedItems });
    };
  }
}), (0, _recompose.lifecycle)({
  componentDidMount: function componentDidMount() {
    var _props = this.props,
        labels = _props.labels,
        active = _props.active,
        onFilterChange = _props.onFilterChange;


    if (!active.labels) {
      return;
    }

    var organizationLabelIds = (0, _lodash.filter)(active.labels, function (selectedId) {
      return (0, _lodash.some)(labels, { id: selectedId });
    });

    if (organizationLabelIds.length !== active.labels.length) {
      onFilterChange([].concat((0, _toConsumableArray3.default)(organizationLabelIds)));
    }
  }
}))(Filter);


// WEBPACK FOOTER //
// ./packages/organizations/lib/labels/components/Filter.js