'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Edit = Edit;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _recompose = require('recompose');

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _workflowOrganizations = require('@signavio/workflow-organizations');

var _reactForms = require('@signavio/react-forms');

var _higherOrder = require('../../higher-order');

var _Show = require('./Show');

var _Show2 = _interopRequireDefault(_Show);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Edit(_ref) {
  var type = _ref.type,
      value = _ref.value,
      onUserSelect = _ref.onUserSelect;

  if (value) {
    return _react2.default.createElement(_Show2.default, { value: value });
  }

  return _react2.default.createElement(_workflowOrganizations.UserSelect, {
    emptyText: (0, _signavioI18n2.default)('No user found'),
    candidateIds: type.candidateIds,
    candidateGroupIds: type.candidateGroupIds,
    onUserSelect: onUserSelect
  });
}
exports.default = (0, _recompose.compose)(_reactForms.triggerOnCompleteOnChange, (0, _recompose.withHandlers)({
  onUserSelect: function onUserSelect(_ref2) {
    var onChange = _ref2.onChange;
    return function (_ref3) {
      var id = _ref3.id;
      return onChange(id);
    };
  }
}), (0, _higherOrder.createClearable)({ triggerOnComplete: false }))(Edit);


// WEBPACK FOOTER //
// ./packages/fields/lib/components/fields/types/userId/Edit.js