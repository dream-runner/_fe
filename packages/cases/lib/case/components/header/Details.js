'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _recompose = require('recompose');

var _styles = require('@signavio/effektif-commons/lib/styles');

var _components = require('@signavio/effektif-commons/lib/components');

var _hints = require('@signavio/effektif-commons/lib/components/hints');

var _tiles = require('@signavio/effektif-commons/lib/components/tiles');

var _effektifFields = require('@signavio/effektif-fields');

var _components2 = require('../../../components');

var _PrioritySelect = require('./PrioritySelect');

var _PrioritySelect2 = _interopRequireDefault(_PrioritySelect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Details(_ref) {
  var caze = _ref.caze,
      style = _ref.style,
      readOnly = _ref.readOnly,
      onPriorityChange = _ref.onPriorityChange,
      onDueDateChange = _ref.onDueDateChange;
  var canceled = caze.canceled,
      creator = caze.creator,
      priority = caze.priority,
      dueDate = caze.dueDate,
      milestone = caze.milestone,
      closed = caze.closed;

  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(
      'div',
      style('item'),
      _react2.default.createElement(
        'div',
        style('title'),
        (0, _signavioI18n2.default)('Case status')
      ),
      _react2.default.createElement(
        'div',
        style('content'),
        _react2.default.createElement(
          _tiles.TextTile,
          {
            small: true,
            transparent: true,
            header: _react2.default.createElement(_components.Icon, {
              small: true,
              style: style('caseStatus'),
              iconSet: canceled ? 'signavio' : 'fontAwesome',
              icon: getIcon(canceled, closed)
            })
          },
          getStatusMessage(canceled, closed)
        )
      )
    ),
    _react2.default.createElement(
      'div',
      style('item'),
      _react2.default.createElement(
        'div',
        style('title'),
        (0, _signavioI18n2.default)('Case Creator')
      ),
      _react2.default.createElement(
        'div',
        style('content'),
        creator ? _react2.default.createElement(_effektifFields.Field, { readOnly: true, small: true, transparent: true, value: creator, type: _effektifFields.userType }) : _react2.default.createElement(
          _hints.Hint,
          { inline: true },
          (0, _signavioI18n2.default)('Not set'),
          _react2.default.createElement(
            _components.ContextHelp,
            { placement: 'right' },
            (0, _signavioI18n2.default)('Cases that are started by other cases or via email do not have a case creator.')
          )
        )
      )
    ),
    _react2.default.createElement(
      'div',
      style('item'),
      _react2.default.createElement(
        'div',
        style('title'),
        (0, _signavioI18n2.default)('Case Priority')
      ),
      _react2.default.createElement(
        'div',
        style('content'),
        _react2.default.createElement(_PrioritySelect2.default, {
          readOnly: readOnly,
          value: priority,
          onChange: onPriorityChange
        })
      )
    ),
    _react2.default.createElement(
      'div',
      style('item'),
      _react2.default.createElement(
        'div',
        style('title'),
        (0, _signavioI18n2.default)('Case Due Date')
      ),
      _react2.default.createElement(
        'div',
        style('content'),
        _react2.default.createElement(_components2.DueDateSelect, {
          readOnly: readOnly,
          value: dueDate,
          onChange: onDueDateChange
        })
      )
    ),
    _react2.default.createElement(
      'div',
      style('item'),
      _react2.default.createElement(
        'div',
        style('title'),
        (0, _signavioI18n2.default)('Current Milestone')
      ),
      _react2.default.createElement(
        'div',
        style('content'),
        milestone || _react2.default.createElement(
          _hints.Hint,
          { inline: true },
          (0, _signavioI18n2.default)('Not set')
        )
      )
    ),
    _react2.default.createElement(_components.Clearfix, null)
  );
}

var getIcon = function getIcon(canceled, closed) {
  if (canceled) {
    return 'cancel';
  }
  if (closed) {
    return 'folder-o';
  }
  return 'folder-open-o';
};

var getStatusMessage = function getStatusMessage(canceled, closed) {
  if (canceled) {
    return (0, _signavioI18n2.default)('Canceled');
  }
  if (closed) {
    return (0, _signavioI18n2.default)('Completed');
  }
  return (0, _signavioI18n2.default)('Open');
};

exports.default = (0, _recompose.compose)((0, _recompose.withHandlers)({
  onPriorityChange: function onPriorityChange(_ref2) {
    var caze = _ref2.caze,
        onChange = _ref2.onChange;
    return function (priority) {
      return onChange((0, _extends3.default)({}, caze, { priority: priority }));
    };
  },
  onDueDateChange: function onDueDateChange(_ref3) {
    var caze = _ref3.caze,
        onChange = _ref3.onChange;
    return function (dueDate) {
      return onChange((0, _extends3.default)({}, caze, { dueDate: dueDate }));
    };
  }
}), (0, _styles.defaultStyle)(function (_ref4) {
  var color = _ref4.color,
      font = _ref4.font,
      padding = _ref4.padding;
  return {
    item: (0, _extends3.default)({
      float: 'left'

    }, _styles.utils.media.xs((0, _extends3.default)({
      float: 'none',

      marginBottom: padding.small,
      paddingBottom: padding.small

    }, _styles.utils.borderBottom(1, 'solid', color.mono.light)))),

    title: (0, _extends3.default)({
      color: color.mono.middle,

      fontSize: font.size.form,
      fontWeight: font.weight.light,

      paddingBottom: padding.small,
      paddingRight: padding.large

    }, _styles.utils.media.xs({
      paddingBottom: 0,
      paddingRight: 0
    })),

    content: {
      paddingRight: padding.normal
    },

    caseStatus: {
      backgroundColor: color.primary.lighter,
      color: _styles.utils.color(color.primary.lighter)
    },
    '&cazeClosed': {
      caseStatus: {
        backgroundColor: color.mono.light,
        color: _styles.utils.color(color.mono.light)
      }
    }
  };
}, function (_ref5) {
  var caze = _ref5.caze;
  return {
    '&cazeClosed': caze.closed || caze.canceled
  };
}))(Details);


// WEBPACK FOOTER //
// ./packages/cases/lib/case/components/header/Details.js