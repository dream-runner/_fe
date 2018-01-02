'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _recompose = require('recompose');

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _styles = require('@signavio/effektif-commons/lib/styles');

var _effektifFields = require('@signavio/effektif-fields');

var _AggregationSelect = require('./AggregationSelect');

var _AggregationSelect2 = _interopRequireDefault(_AggregationSelect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var aggregationSelectWidth = 250;


var isInGroupBy = function isInGroupBy(groupBy, bindable) {
  return groupBy.length && bindable.expression.indexOf(groupBy[0].expression) === 0;
};

var isNumberAggregation = function isNumberAggregation(aggregation) {
  return (0, _lodash.includes)(['avg', 'min', 'max'], aggregation);
};

var findCompatibleBinding = function findCompatibleBinding(dataTypeDescriptors, variables, aggregation, groupBy) {
  return _effektifFields.bindingUtils.unfoldBindables(dataTypeDescriptors, variables).find(function (binding) {
    return isCompatibleWithAggregation(aggregation, binding, _effektifFields.bindingUtils.getType(dataTypeDescriptors, variables, binding), groupBy);
  });
};

var isCompatibleWithAggregation = function isCompatibleWithAggregation(aggregation, bindable, dataType, groupBy) {
  if (isNumberAggregation(aggregation)) {
    return dataType.name === 'number';
  }

  return !isInGroupBy(groupBy, bindable);
};

var EditAggregate = function EditAggregate(_ref) {
  var binding = _ref.binding,
      aggregation = _ref.aggregation,
      readOnly = _ref.readOnly,
      onAggregationChange = _ref.onAggregationChange,
      onChangeBinding = _ref.onChangeBinding,
      onFilterBindables = _ref.onFilterBindables;
  return _react2.default.createElement(
    'div',
    { className: 'edit-aggregate' },
    _react2.default.createElement(
      'div',
      { className: 'row' },
      _react2.default.createElement(
        'div',
        { className: 'col-md-2' },
        _react2.default.createElement(
          'h5',
          {
            style: {
              textAlign: 'right',
              lineHeight: _styles.variables.lineHeight.block + 'px'
            }
          },
          (0, _signavioI18n2.default)('Show each group’s')
        )
      ),
      _react2.default.createElement(
        'div',
        { className: 'col-md-10 clearfix' },
        _react2.default.createElement(
          'div',
          { style: { float: 'left', width: aggregationSelectWidth } },
          _react2.default.createElement(_AggregationSelect2.default, {
            value: aggregation,
            onChange: onAggregationChange,
            readOnly: readOnly
          })
        ),
        _react2.default.createElement(
          'div',
          { style: { marginLeft: aggregationSelectWidth + 1 } },
          _react2.default.createElement(_effektifFields.Binding, {
            type: isNumberAggregation(aggregation) ? { name: 'number' } : null,
            binding: binding,
            filterBindables: onFilterBindables,
            onChange: onChangeBinding,
            readOnly: readOnly
          })
        )
      )
    )
  );
};

exports.default = (0, _recompose.compose)(_effektifFields.getFieldsContext, (0, _recompose.withHandlers)({
  onChangeBindingIfNeeded: function onChangeBindingIfNeeded(_ref2) {
    var binding = _ref2.binding,
        dataTypeDescriptors = _ref2.dataTypeDescriptors,
        groupBy = _ref2.groupBy,
        onChangeBinding = _ref2.onChangeBinding,
        variables = _ref2.variables;
    return function (aggregation) {
      var type = _effektifFields.bindingUtils.getType(dataTypeDescriptors, variables, binding);
      var mustChangeBinding = !!binding && !isCompatibleWithAggregation(aggregation, binding, type, groupBy);

      if (mustChangeBinding) {
        onChangeBinding(findCompatibleBinding(dataTypeDescriptors, variables, aggregation, groupBy));
      }
    };
  }
}), (0, _recompose.withHandlers)({
  onAggregationChange: function onAggregationChange(_ref3) {
    var onChangeAggregation = _ref3.onChangeAggregation,
        onChangeBindingIfNeeded = _ref3.onChangeBindingIfNeeded;
    return function (newAggregation) {
      onChangeAggregation(newAggregation);
      onChangeBindingIfNeeded(newAggregation);
    };
  },
  onFilterBindables: function onFilterBindables(_ref4) {
    var aggregation = _ref4.aggregation,
        dataTypeDescriptors = _ref4.dataTypeDescriptors,
        groupBy = _ref4.groupBy,
        variables = _ref4.variables;
    return function (bindable) {
      return isCompatibleWithAggregation(aggregation, bindable, _effektifFields.bindingUtils.getType(dataTypeDescriptors, variables, bindable), groupBy);
    };
  }
}), (0, _recompose.lifecycle)({
  componentDidMount: function componentDidMount() {
    var _props = this.props,
        aggregation = _props.aggregation,
        onChangeBindingIfNeeded = _props.onChangeBindingIfNeeded;

    onChangeBindingIfNeeded(aggregation);
  }
}))(EditAggregate);


// WEBPACK FOOTER //
// ./packages/reporting/lib/report/components/EditAggregate.js