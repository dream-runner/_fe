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

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _styles = require('@signavio/effektif-commons/lib/styles');

var _hints = require('@signavio/effektif-commons/lib/components/hints');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function TaskList(_ref) {
  var tasks = _ref.tasks,
      rest = (0, _objectWithoutProperties3.default)(_ref, ['tasks']);

  return _react2.default.createElement(
    'ul',
    (0, _extends3.default)({}, rest, rest.style),
    tasks.map(function (task, index) {
      return _react2.default.createElement(
        'li',
        (0, _extends3.default)({ key: task.name + '-' + index }, rest.style('item')),
        task.name || _react2.default.createElement(
          _hints.Hint,
          { inline: true },
          (0, _signavioI18n2.default)('Unnamed task')
        ),
        task.count > 1 && ' (' + task.count + ')'
      );
    })
  );
}

exports.default = (0, _styles.defaultStyle)(function (theme) {
  return {
    marginLeft: theme.padding.xsmall,
    marginRight: theme.padding.xsmall,
    marginTop: theme.padding.xsmall,
    marginBottom: theme.padding.xsmall,

    paddingLeft: theme.padding.normal
  };
})(TaskList);


// WEBPACK FOOTER //
// ./packages/cases/lib/components/progress/TaskList.js