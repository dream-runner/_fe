'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _recompose = require('recompose');

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _reactRouterDom = require('react-router-dom');

var _lodash = require('lodash');

var _effektifApi = require('@signavio/effektif-api');

var _workflowAccess = require('@signavio/workflow-access');

var _styles = require('@signavio/effektif-commons/lib/styles');

var _hints = require('@signavio/effektif-commons/lib/components/hints');

var _task = require('../../task');

var _SubCasesTable = require('./SubCasesTable');

var _SubCasesTable2 = _interopRequireDefault(_SubCasesTable);

var _ControlTasks = require('./ControlTasks');

var _ControlTasks2 = _interopRequireDefault(_ControlTasks);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CaseDetail = function CaseDetail(_ref) {
  var caze = _ref.caze,
      style = _ref.style,
      onRequestRefresh = _ref.onRequestRefresh;

  var controlTasks = (0, _lodash.get)(caze, 'controlTasks', []);
  var subcases = (0, _lodash.filter)(controlTasks, function (_ref2) {
    var type = _ref2.type;
    return type === 'subProcess';
  });
  var otherActivities = (0, _lodash.reject)(controlTasks, function (_ref3) {
    var type = _ref3.type;
    return type === 'subProcess';
  });

  var rights = (0, _workflowAccess.getRights)(caze.access, 'edit');

  return _react2.default.createElement(
    'div',
    null,
    caze.closed && _react2.default.createElement(
      _hints.Hint,
      null,
      (0, _signavioI18n2.default)('This case has been completed and cannot be edited. '),
      _react2.default.createElement('br', null),
      (0, _signavioI18n2.default)('Have a look at the __caseListLink__ from the same process or go to your __taskInboxLink__ to find your next task', {
        caseListLink: _react2.default.createElement(
          _reactRouterDom.Link,
          { to: (0, _effektifApi.prependOrg)('/cases/' + caze.sourceWorkflowId) },
          (0, _signavioI18n2.default)('Case list')
        ),
        taskInboxLink: _react2.default.createElement(
          _reactRouterDom.Link,
          { to: (0, _effektifApi.prependOrg)('/tasks/inbox') },
          (0, _signavioI18n2.default)('Inbox')
        )
      })
    ),
    _react2.default.createElement(
      'div',
      style('section'),
      _react2.default.createElement(
        'h3',
        style('sectionHeader'),
        (0, _signavioI18n2.default)('Tasks')
      ),
      !caze.closed && _react2.default.createElement(
        'div',
        style('sectionHint'),
        _react2.default.createElement(
          _hints.Hint,
          { inline: true },
          (0, _signavioI18n2.default)('This case is currently open. Look in the list below for a task that is assigned to you and start working. ' + 'If a task has multiple candidates and you are one of them, you can assign it to yourself.')
        )
      ),
      _react2.default.createElement(_task.TasksTable, {
        caseId: caze.id,
        readOnly: !rights.edit,
        disabled: caze.closed
      })
    ),
    !(0, _lodash.isEmpty)(subcases) && _react2.default.createElement(
      'div',
      style('section'),
      _react2.default.createElement(
        'h3',
        style('sectionHeader'),
        (0, _signavioI18n2.default)('Sub-Cases')
      ),
      _react2.default.createElement(_SubCasesTable2.default, { subcases: subcases })
    ),
    !(0, _lodash.isEmpty)(otherActivities) && _react2.default.createElement(
      'div',
      style('controlTasks'),
      _react2.default.createElement(
        'h3',
        style('sectionHeader'),
        (0, _signavioI18n2.default)('Other open activities')
      ),
      _react2.default.createElement(_ControlTasks2.default, {
        caseId: caze.id,
        tasks: otherActivities,
        readOnly: !rights.edit,
        onActionSuccess: onRequestRefresh
      })
    )
  );
};

exports.default = (0, _recompose.compose)((0, _styles.defaultStyle)(function (_ref4) {
  var padding = _ref4.padding;
  return {
    section: {
      marginBottom: padding.large
    },

    sectionHeader: {
      marginBottom: padding.normal
    },

    sectionHint: {
      marginBottom: padding.small
    },

    controlTasks: {
      paddingTop: padding.large
    }
  };
}))(CaseDetail);


// WEBPACK FOOTER //
// ./packages/cases/lib/case/components/CaseDetail.js