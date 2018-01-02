'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _recompose = require('recompose');

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _hints = require('@signavio/effektif-commons/lib/components/hints');

var _workflowAccess = require('@signavio/workflow-access');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Share = function Share(_ref) {
  var onChange = _ref.onChange,
      readOnly = _ref.readOnly,
      report = _ref.report;
  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(
      _hints.Hint,
      { info: true },
      (0, _signavioI18n2.default)('You currently can only grant view rights for reports. Granting edit permissions will come in the future.')
    ),
    _react2.default.createElement(_workflowAccess.Rights, {
      access: report.access,
      definition: getAccessDefinition(),
      fixedEntries: [report.creatorId],
      fixedRights: ['edit'],
      onChange: onChange,
      readOnly: readOnly
    })
  );
};

exports.default = (0, _recompose.compose)((0, _recompose.withHandlers)({
  onChange: function onChange(_ref2) {
    var onUpdateAccess = _ref2.onUpdateAccess;
    return function (access) {
      onUpdateAccess('edit', access.edit);
      onUpdateAccess('view', access.view);
    };
  }
}))(Share);


var getAccessDefinition = function getAccessDefinition() {
  return {
    order: ['edit', 'view'],
    defaults: ['view'],
    rights: {
      edit: {
        title: (0, _signavioI18n2.default)('Edit Report'),
        icon: 'fa-pencil',
        implies: ['view']
      },
      view: {
        title: (0, _signavioI18n2.default)('View Report'),
        icon: 'fa-eye'
      }
    }
  };
};


// WEBPACK FOOTER //
// ./packages/reporting/lib/report/containers/Share.js