'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _recompose = require('recompose');

var _effektifApi = require('@signavio/effektif-api');

var _components = require('@signavio/effektif-commons/lib/components');

var _hints = require('@signavio/effektif-commons/lib/components/hints');

var _effektifFields = require('@signavio/effektif-fields');

var _workflowForms = require('@signavio/workflow-forms');

var _higherOrder = require('./higher-order');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function CoreInformation(_ref) {
  var fetchCase = _ref.fetchCase;

  if (fetchCase.pending && !fetchCase.value) {
    return _react2.default.createElement(
      _hints.Hint,
      { loading: true },
      (0, _signavioI18n2.default)('Loading case information')
    );
  }

  var caze = fetchCase.value;

  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(
      _components.List,
      null,
      _react2.default.createElement(_effektifFields.LabeledField, {
        readOnly: true,
        label: (0, _signavioI18n2.default)('Created by'),
        value: caze.creator,
        type: _effektifFields.userType
      }),
      _react2.default.createElement(_effektifFields.LabeledField, {
        readOnly: true,
        label: (0, _signavioI18n2.default)('Created on'),
        value: caze.createTime,
        type: (0, _effektifFields.dateTimeType)()
      })
    ),
    caze.coreInformation ? _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(_components.Divider, null),
      _react2.default.createElement(_workflowForms.Form, { readOnly: true, hideDoneButton: true, fields: caze.coreInformation.fields })
    ) : _react2.default.createElement(
      _hints.Hint,
      { info: true },
      (0, _signavioI18n2.default)('The core information for this case can be displayed here. Have a look at our docs to find out more about this feature.')
    )
  );
}
exports.default = (0, _recompose.compose)((0, _effektifApi.connect)(function (_ref2) {
  var caseId = _ref2.caseId;
  return {
    fetchCase: {
      id: caseId,
      type: _effektifApi.types.CASE
    }
  };
}), (0, _higherOrder.withPeriodicAction)(function (_ref3) {
  var fetchCase = _ref3.fetchCase;
  return fetchCase();
}))(CoreInformation);


// WEBPACK FOOTER //
// ./packages/cases/lib/components/CoreInformation.js