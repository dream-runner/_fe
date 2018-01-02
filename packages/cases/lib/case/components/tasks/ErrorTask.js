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

var _components = require('@signavio/effektif-commons/lib/components');

var _tiles = require('@signavio/effektif-commons/lib/components/tiles');

var _styles = require('@signavio/effektif-commons/lib/styles');

var _components2 = require('./components');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ErrorTask = function ErrorTask(_ref) {
  var activityName = _ref.activityName,
      icon = _ref.icon,
      iconSet = _ref.iconSet,
      subtitle = _ref.subtitle,
      errorMessage = _ref.errorMessage,
      stackTrace = _ref.stackTrace,
      onSkip = _ref.onSkip,
      onRetry = _ref.onRetry,
      _ref$allowRetry = _ref.allowRetry,
      allowRetry = _ref$allowRetry === undefined ? false : _ref$allowRetry,
      readOnly = _ref.readOnly,
      style = _ref.style,
      addTaskAction = _ref.addTaskAction;
  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(
      _tiles.TextTile,
      {
        icon: icon || 'warning',
        iconSet: iconSet || 'signavio',
        subtitle: subtitle,
        toolbar: _react2.default.createElement(
          _components.List,
          { direction: 'horizontal' },
          allowRetry && _react2.default.createElement(
            _components.Disable,
            { disabled: addTaskAction.pending },
            _react2.default.createElement(_components2.RetryButton, { readOnly: readOnly, onRetry: onRetry })
          ),
          _react2.default.createElement(_components2.SkipButton, {
            activityName: activityName || (0, _signavioI18n2.default)('Unnamed action'),
            readOnly: readOnly,
            onSkip: onSkip
          })
        )
      },
      activityName || (0, _signavioI18n2.default)('Unnamed action')
    ),
    _react2.default.createElement(
      'div',
      style('body'),
      addTaskAction.pending ? _react2.default.createElement(
        _components.Markdown,
        null,
        (0, _signavioI18n2.default)('Retrying...')
      ) : _react2.default.createElement(
        _components.Markdown,
        null,
        errorMessage
      ),
      !!stackTrace && _react2.default.createElement(
        'pre',
        null,
        stackTrace
      )
    )
  );
};

exports.default = (0, _recompose.compose)((0, _effektifApi.connect)(function () {
  return {
    addTaskAction: {
      method: 'create',
      type: _effektifApi.types.CONTROL_TASK_ACTION
    }
  };
}), (0, _recompose.withHandlers)({
  onSkip: function onSkip(_ref2) {
    var id = _ref2.id,
        type = _ref2.type,
        onCreateAction = _ref2.onCreateAction;
    return function (message) {
      onCreateAction({
        id: id,
        type: type,
        body: {
          type: 'skipActivityInstance',
          message: message
        }
      });
    };
  },
  onRetry: function onRetry(_ref3) {
    var id = _ref3.id,
        addTaskAction = _ref3.addTaskAction,
        caseId = _ref3.caseId;
    return function () {
      addTaskAction({
        body: {
          type: 'retryActivityInstance'
        },
        caseId: caseId,
        controlTaskId: id
      });
    };
  }
}), (0, _recompose.lifecycle)({
  componentWillReceiveProps: function componentWillReceiveProps(_ref4) {
    var addTaskAction = _ref4.addTaskAction;

    if (this.props.addTaskAction.pending && !addTaskAction.pending) {
      this.props.onActionSuccess();
    }
  }
}), (0, _styles.defaultStyle)(function (_ref5) {
  var padding = _ref5.padding,
      color = _ref5.color;
  return {
    body: (0, _extends3.default)({
      padding: padding.normal,
      backgroundColor: 'white',
      maxHeight: 200,
      overflowY: 'scroll'

    }, _styles.utils.borderLeft(1, 'solid', color.mono.light), _styles.utils.borderRight(1, 'solid', color.mono.light), _styles.utils.borderBottom(1, 'solid', color.mono.light))
  };
}))(ErrorTask);


// WEBPACK FOOTER //
// ./packages/cases/lib/case/components/tasks/ErrorTask.js