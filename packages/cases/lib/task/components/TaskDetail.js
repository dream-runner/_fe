'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _recompose = require('recompose');

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _effektifApi = require('@signavio/effektif-api');

var _styles = require('@signavio/effektif-commons/lib/styles');

var _components = require('@signavio/effektif-commons/lib/components');

var _workflowForms = require('@signavio/workflow-forms');

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function TaskDetail(_ref) {
  var defaultFields = _ref.defaultFields,
      fields = _ref.fields,
      onComplete = _ref.onComplete,
      onDescriptionComplete = _ref.onDescriptionComplete,
      onFieldsChange = _ref.onFieldsChange,
      pending = _ref.pending,
      readOnly = _ref.readOnly,
      style = _ref.style,
      task = _ref.task,
      user = _ref.user;

  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(
      'div',
      style('description'),
      _react2.default.createElement(
        'h5',
        style('descriptionTitle'),
        (0, _signavioI18n2.default)('Description')
      ),
      !(0, _utils.isTaskReadOnly)(task) ? _react2.default.createElement(
        _components.InplaceEdit,
        {
          multiLine: true,
          placeholder: (0, _signavioI18n2.default)('Add a task description'),
          value: task.description,
          onBlur: onDescriptionComplete
        },
        function (description) {
          return _react2.default.createElement(
            _components.Markdown,
            null,
            description
          );
        }
      ) : _react2.default.createElement(
        _components.Markdown,
        null,
        task.description
      )
    ),
    _react2.default.createElement(_workflowForms.Form, {
      defaultFields: defaultFields,
      fields: fields,
      hideDoneButton: !(0, _utils.showDoneButton)(task, user),
      onSubmit: onComplete,
      onChange: onFieldsChange,
      pending: pending,
      readOnly: readOnly || task.completed,
      taskId: task.id
    })
  );
}

exports.default = (0, _recompose.compose)(_effektifApi.withUser, (0, _recompose.withHandlers)({
  onDescriptionComplete: function onDescriptionComplete(_ref2) {
    var onChange = _ref2.onChange,
        task = _ref2.task;
    return function (_ref3) {
      var target = _ref3.target;

      onChange((0, _extends3.default)({}, task, {
        description: target.value
      }));
    };
  },
  onFieldsChange: function onFieldsChange(_ref4) {
    var onChange = _ref4.onChange,
        task = _ref4.task;
    return function (fields) {
      onChange((0, _extends3.default)({}, task, {
        form: (0, _extends3.default)({}, task.form, {
          fields: fields
        })
      }));
    };
  }
}), (0, _styles.defaultStyle)(function (_ref5) {
  var padding = _ref5.padding,
      font = _ref5.font,
      color = _ref5.color;
  return {
    description: {
      marginBottom: padding.large
    },

    descriptionTitle: {
      fontFamily: font.family.normal,
      color: color.mono.dark,

      marginBottom: padding.normal
    }
  };
}))(TaskDetail);


// WEBPACK FOOTER //
// ./packages/cases/lib/task/components/TaskDetail.js