'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EditGroupId = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _recompose = require('recompose');

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _models = require('@signavio/effektif-commons/lib/models');

var _components = require('@signavio/effektif-commons/lib/components');

var _tiles = require('@signavio/effektif-commons/lib/components/tiles');

var _effektifApi = require('@signavio/effektif-api');

var _workflowOrganizations = require('@signavio/workflow-organizations');

var _reactForms = require('@signavio/react-forms');

var _higherOrder = require('../../higher-order');

var _Show = require('./Show');

var _Show2 = _interopRequireDefault(_Show);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EditGroupId = function EditGroupId(_ref) {
  var value = _ref.value,
      rest = (0, _objectWithoutProperties3.default)(_ref, ['value']);
  return value ? _react2.default.createElement(_Show2.default, { value: value }) : _react2.default.createElement(
    _tiles.Tile,
    { icon: 'group' },
    _react2.default.createElement(_components.Autocomplete, (0, _extends3.default)({
      emptyText: (0, _signavioI18n2.default)('Select group'),
      placeholder: (0, _signavioI18n2.default)('Search for groups'),
      renderItem: function renderItem(item) {
        return _react2.default.createElement(_workflowOrganizations.Group, { transparent: true, value: item.entity.id });
      },
      resetOnBlur: true,
      resetOnComplete: true
    }, rest))
  );
};
exports.EditGroupId = EditGroupId;
exports.default = (0, _recompose.compose)(_effektifApi.withOrganization, (0, _recompose.mapProps)(function (_ref2) {
  var organization = _ref2.organization,
      rest = (0, _objectWithoutProperties3.default)(_ref2, ['organization']);
  return (0, _extends3.default)({
    query: new _models.QueryContainer(new _models.GroupQuery(organization))
  }, rest);
}), _reactForms.triggerOnCompleteOnChange, (0, _higherOrder.createClearable)({ triggerOnComplete: true }))(EditGroupId);


// WEBPACK FOOTER //
// ./packages/fields/lib/components/fields/types/groupId/Edit.js