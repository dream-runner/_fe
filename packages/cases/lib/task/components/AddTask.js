'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _recompose = require('recompose');

var _components = require('@signavio/effektif-commons/lib/components');

var _tiles = require('@signavio/effektif-commons/lib/components/tiles');

var _InlineAssignment = require('./InlineAssignment');

var _InlineAssignment2 = _interopRequireDefault(_InlineAssignment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AddTask = function AddTask(_ref) {
  var disabledHint = _ref.disabledHint,
      placeholder = _ref.placeholder,
      buttonLabel = _ref.buttonLabel,
      task = _ref.task,
      disabled = _ref.disabled,
      onChangeAssignment = _ref.onChangeAssignment,
      onSubmit = _ref.onSubmit;

  return _react2.default.createElement(
    _components.Disable,
    { disabled: disabled, hint: disabledHint },
    _react2.default.createElement(
      _tiles.Tile,
      {
        header: _react2.default.createElement(_InlineAssignment2.default, { onChange: onChangeAssignment, task: task })
      },
      _react2.default.createElement(_components.InputWithButton, {
        clearOnSubmit: true,
        border: 'none',
        onSubmit: onSubmit,
        placeholder: placeholder,
        buttonLabel: buttonLabel
      })
    )
  );
};
exports.default = (0, _recompose.compose)((0, _recompose.withState)('currentAssignee', 'setCurrentAssignee', null), (0, _recompose.withHandlers)({
  onSubmit: function onSubmit(_ref2) {
    var currentAssignee = _ref2.currentAssignee,
        setCurrentAssignee = _ref2.setCurrentAssignee,
        onAdd = _ref2.onAdd;
    return function (name) {
      onAdd((0, _extends3.default)({
        name: name
      }, currentAssignee));

      setCurrentAssignee(null);
    };
  },
  onChangeAssignment: function onChangeAssignment(_ref3) {
    var setCurrentAssignee = _ref3.setCurrentAssignee;
    return function (assignee) {
      return setCurrentAssignee(assignee);
    };
  }
}), (0, _recompose.withProps)(function (_ref4) {
  var currentAssignee = _ref4.currentAssignee,
      task = _ref4.task;
  return {
    task: (0, _extends3.default)({}, task, {
      candidates: { count: 0 }
    }, currentAssignee)
  };
}))(AddTask);


// WEBPACK FOOTER //
// ./packages/cases/lib/task/components/AddTask.js