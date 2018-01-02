'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.canBeUsedForGroupBy = exports.hasSupportedType = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _styles = require('@signavio/effektif-commons/lib/styles');

var _fpLogic = require('@signavio/effektif-commons/lib/utils/fpLogic');

var _effektifFields = require('@signavio/effektif-fields');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isCompatibleWithTypeName = _effektifFields.bindingUtils.isCompatibleWithTypeName,
    parentSatisfies = _effektifFields.bindingUtils.parentSatisfies,
    rootSatisfies = _effektifFields.bindingUtils.rootSatisfies,
    isNestedConnectorTypeDeeperThanOne = _effektifFields.bindingUtils.isNestedConnectorTypeDeeperThanOne,
    isOneOfFieldsOfParentWithType = _effektifFields.bindingUtils.isOneOfFieldsOfParentWithType;
var hasSupportedType = exports.hasSupportedType = function hasSupportedType(dataTypeDescriptors, variables) {
  return (0, _fpLogic.passesSome)(isCompatibleWithTypeName(dataTypeDescriptors, variables, 'text'), isCompatibleWithTypeName(dataTypeDescriptors, variables, 'choice'), isCompatibleWithTypeName(dataTypeDescriptors, variables, 'userId'), isCompatibleWithTypeName(dataTypeDescriptors, variables, 'emailAddress'), isCompatibleWithTypeName(dataTypeDescriptors, variables, 'link'), isCompatibleWithTypeName(dataTypeDescriptors, variables, 'number'), isCompatibleWithTypeName(dataTypeDescriptors, variables, 'boolean'), isCompatibleWithTypeName(dataTypeDescriptors, variables, 'caseId'), isCompatibleWithTypeName(dataTypeDescriptors, variables, 'money'), isCompatibleWithTypeName(dataTypeDescriptors, variables, 'date'), isCompatibleWithTypeName(dataTypeDescriptors, variables, 'duration'), isCompatibleWithTypeName(dataTypeDescriptors, variables, 'connectorReference'));
};

var canBeUsedForGroupBy = exports.canBeUsedForGroupBy = function canBeUsedForGroupBy(expression, dataTypeDescriptors, variables) {
  return (0, _fpLogic.passesEvery)(hasSupportedType(dataTypeDescriptors, variables),
  // ignore all variables of a certain type
  rootSatisfies(hasSupportedType(dataTypeDescriptors, variables)),
  // ensure the parent type is supported as well in case the parent type != variable type
  parentSatisfies(hasSupportedType(dataTypeDescriptors, variables)), (0, _fpLogic.not)(isOneOfFieldsOfParentWithType(dataTypeDescriptors, variables, { name: 'caseId' }, ['id', 'caseNumber', 'link', 'name'])), (0, _fpLogic.not)(isOneOfFieldsOfParentWithType(dataTypeDescriptors, variables, { name: 'userId' }, ['id'])), (0, _fpLogic.not)(isOneOfFieldsOfParentWithType(dataTypeDescriptors, variables, { name: 'money' }, ['amount', 'currency'])), (0, _fpLogic.not)(isNestedConnectorTypeDeeperThanOne(dataTypeDescriptors, variables)))(expression);
};

var GroupBy = function GroupBy(_ref) {
  var groupBy = _ref.groupBy,
      onAdd = _ref.onAdd,
      onRemove = _ref.onRemove,
      readOnly = _ref.readOnly;
  return _react2.default.createElement(
    'div',
    { className: 'filters' },
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
          (0, _signavioI18n2.default)('Group by')
        )
      ),
      _react2.default.createElement(
        'div',
        { className: 'col-md-10' },
        readOnly ? _react2.default.createElement(_effektifFields.BindingList, { readOnly: true, items: groupBy }) : _react2.default.createElement(_effektifFields.BindingList, {
          items: groupBy,
          onAdd: onAdd,
          onRemove: onRemove,
          filterBindables: canBeUsedForGroupBy,
          maxCount: 1
        })
      )
    )
  );
};

exports.default = GroupBy;


// WEBPACK FOOTER //
// ./packages/reporting/lib/report/components/GroupBy.js