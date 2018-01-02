'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _recompose = require('recompose');

var _styles = require('@signavio/effektif-commons/lib/styles');

var _components = require('../../components');

var _Tasks = require('./Tasks');

var _Tasks2 = _interopRequireDefault(_Tasks);

var _TaskContent = require('./TaskContent');

var _TaskContent2 = _interopRequireDefault(_TaskContent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TaskDetailContainer = function TaskDetailContainer(_ref) {
  var panel = _ref.panel,
      match = _ref.match,
      style = _ref.style,
      onPanelChange = _ref.onPanelChange;
  var _match$params = match.params,
      caseId = _match$params.caseId,
      taskId = _match$params.taskId;


  return _react2.default.createElement(
    _components.MainContainer,
    {
      showPanel: !!panel,
      toolbar: _react2.default.createElement(_components.Toolbar, {
        category: panel,
        caseId: caseId,
        taskId: taskId,
        onCategoryChange: onPanelChange
      }),
      panel: _react2.default.createElement(_components.InfoPanel, { caseId: caseId, taskId: taskId, panel: panel })
    },
    _react2.default.createElement(
      'div',
      style('tasks'),
      _react2.default.createElement(_Tasks2.default, { caseId: caseId, activeTaskId: taskId })
    ),
    _react2.default.createElement(
      'div',
      style('container'),
      _react2.default.createElement(_TaskContent2.default, { taskId: taskId, caseId: caseId })
    )
  );
};

exports.default = (0, _recompose.compose)(_components.withPanelHandling, (0, _styles.defaultStyle)(function (_ref2) {
  var padding = _ref2.padding,
      lineHeight = _ref2.lineHeight,
      font = _ref2.font,
      color = _ref2.color;

  var headerHeight = _styles.utils.calculateHeight(font.size.normal, lineHeight, padding.normal);

  return {
    tasks: (0, _extends3.default)({
      position: 'absolute',

      top: 0,
      left: 0,

      height: 'calc(100vh - ' + headerHeight + 'px)',
      width: '25%'

    }, _styles.utils.borderRight(1, 'solid', color.mono.light), {
      backgroundColor: color.mono.ultralight,

      overflowY: 'auto'

    }, _styles.utils.media.sm({
      width: '33%'
    })),

    container: {
      position: 'absolute',

      left: '25%',

      height: 'calc(100vh - ' + headerHeight + 'px)',
      width: '75%'
    },

    information: {
      marginBottom: padding.normal,
      marginTop: padding.normal
    }
  };
}))(TaskDetailContainer);


// WEBPACK FOOTER //
// ./packages/cases/lib/task/containers/TaskDetail.js