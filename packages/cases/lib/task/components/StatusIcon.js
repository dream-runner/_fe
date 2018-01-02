'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _recompose = require('recompose');

var _components = require('@signavio/effektif-commons/lib/components');

var _styles = require('@signavio/effektif-commons/lib/styles');

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function StatusIcon(_ref) {
  var task = _ref.task,
      hover = _ref.hover,
      readOnly = _ref.readOnly,
      locked = _ref.locked,
      changing = _ref.changing,
      rest = (0, _objectWithoutProperties3.default)(_ref, ['task', 'hover', 'readOnly', 'locked', 'changing']);

  if (changing) {
    return _react2.default.createElement(_components.Spinner, null);
  }

  var icon = _react2.default.createElement(_components.Icon, (0, _extends3.default)({}, rest, { icon: getIcon(task, locked, hover, readOnly) }));
  return locked || task.completed ? _react2.default.createElement(
    _components.Popover,
    {
      popover: _react2.default.createElement(
        'div',
        null,
        (0, _utils.getHintMessage)(task, locked)
      ),
      placement: 'right'
    },
    icon
  ) : icon;
}

var getIcon = function getIcon(task, locked, hover, readOnly) {
  var canceled = task.canceled,
      completed = task.completed,
      form = task.form,
      hasForm = task.hasForm;


  if (canceled) {
    return 'cancel';
  }

  if (completed) {
    return 'square-check';
  }

  if (locked) {
    return 'locked';
  }

  if (form || hasForm) {
    return 'lines';
  }

  if (hover && !readOnly) {
    return 'square-check';
  }

  return 'square';
};

exports.default = (0, _recompose.compose)((0, _recompose.withState)('hover', 'toggleHover', false), (0, _recompose.withHandlers)({
  onMouseOver: function onMouseOver(_ref2) {
    var toggleHover = _ref2.toggleHover;
    return function () {
      return toggleHover(true);
    };
  },
  onMouseOut: function onMouseOut(_ref3) {
    var toggleHover = _ref3.toggleHover;
    return function () {
      return toggleHover(false);
    };
  },
  onClick: function onClick(_ref4) {
    var task = _ref4.task,
        locked = _ref4.locked,
        readOnly = _ref4.readOnly,
        _onClick = _ref4.onClick;
    return function () {
      var canClick = !(readOnly || locked || task.form || task.hasForm);
      if (canClick) {
        _onClick();
      }
    };
  }
}), (0, _recompose.lifecycle)({
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    var _props = this.props,
        changing = _props.changing,
        toggleHover = _props.toggleHover;

    if (changing && !nextProps.changing) {
      toggleHover(false);
    }
  }
}), (0, _styles.defaultStyle)(function (_ref5) {
  var color = _ref5.color;
  return {
    backgroundColor: color.primary.lighter,
    color: _styles.utils.color(color.primary.lighter),

    cursor: 'pointer',

    '&readOnly': {
      cursor: null
    },

    '&completed': {
      backgroundColor: color.mono.light,
      color: _styles.utils.color(color.mono.light)
    },

    '&changing': {
      position: 'relative',

      backgroundColor: null,

      width: _styles.variables.lineHeight.block,
      height: _styles.variables.lineHeight.block
    }
  };
}, function (_ref6) {
  var readOnly = _ref6.readOnly,
      changing = _ref6.changing,
      task = _ref6.task;
  return {
    '&readOnly': readOnly,
    '&changing': changing,
    '&completed': task.completed
  };
}), (0, _components.omitProps)(['toggleHover']))(StatusIcon);


// WEBPACK FOOTER //
// ./packages/cases/lib/task/components/StatusIcon.js