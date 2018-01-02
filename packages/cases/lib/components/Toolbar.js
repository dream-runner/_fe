'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _lodash = require('lodash');

var _recompose = require('recompose');

var _reactForms = require('@signavio/react-forms');

var _effektifApi = require('@signavio/effektif-api');

var _components = require('@signavio/effektif-commons/lib/components');

var _styles = require('@signavio/effektif-commons/lib/styles');

var _ToolbarButton = require('./ToolbarButton');

var _ToolbarButton2 = _interopRequireDefault(_ToolbarButton);

var _CommentCounter = require('./CommentCounter');

var _CommentCounter2 = _interopRequireDefault(_CommentCounter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Toolbar = function Toolbar(_ref) {
  var category = _ref.category,
      style = _ref.style,
      onCategoryChange = _ref.onCategoryChange,
      fetchComments = _ref.fetchComments;
  return _react2.default.createElement(
    _components.List,
    { direction: 'horizontal', style: style },
    _react2.default.createElement(
      _ToolbarButton2.default,
      {
        active: category === 'coreInfo',
        icon: 'info',
        item: 'coreInfo',
        onClick: onCategoryChange
      },
      (0, _signavioI18n2.default)('Core information')
    ),
    _react2.default.createElement(
      _reactForms.Stick,
      {
        inline: true,
        position: 'top right',
        align: 'middle center',
        node: !(0, _lodash.isEmpty)(fetchComments.value) && _react2.default.createElement(
          'div',
          style('bubble'),
          _react2.default.createElement(
            _CommentCounter2.default,
            null,
            fetchComments.value.length
          )
        )
      },
      _react2.default.createElement(
        _ToolbarButton2.default,
        {
          active: category === 'comments',
          icon: 'comment',
          item: 'comments',
          onClick: onCategoryChange
        },
        (0, _signavioI18n2.default)('Comments')
      )
    ),
    _react2.default.createElement(
      _ToolbarButton2.default,
      {
        active: category === 'events',
        icon: 'clock',
        item: 'events',
        onClick: onCategoryChange
      },
      (0, _signavioI18n2.default)('History')
    )
  );
};

exports.default = (0, _recompose.compose)((0, _effektifApi.connect)(function (_ref2) {
  var caseId = _ref2.caseId,
      taskId = _ref2.taskId;
  return {
    fetchComments: {
      type: _effektifApi.types.COMMENTS,
      query: {
        caseId: caseId,
        taskId: taskId
      }
    }
  };
}), (0, _styles.defaultStyle)(function (_ref3) {
  var padding = _ref3.padding;
  return {
    entry: {
      paddingLeft: padding.small
    },

    bubble: {
      marginTop: 2,
      marginLeft: -2
    }
  };
}))(Toolbar);


// WEBPACK FOOTER //
// ./packages/cases/lib/components/Toolbar.js