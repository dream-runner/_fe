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

var _lodash = require('lodash');

var _recompose = require('recompose');

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _styles = require('@signavio/effektif-commons/lib/styles');

var _components = require('@signavio/effektif-commons/lib/components');

var _Filter = require('./Filter');

var _Filter2 = _interopRequireDefault(_Filter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getFilters = function getFilters() {
  return [{
    data: { type: 'comment' },
    name: (0, _signavioI18n2.default)('comments')
  }, {
    data: { type: 'document' },
    name: (0, _signavioI18n2.default)('documents')
  }, {
    data: { type: 'form' },
    name: (0, _signavioI18n2.default)('forms')
  }];
};


function Filters(props) {
  var taskId = props.taskId,
      filter = props.filter,
      filters = props.filters,
      onClick = props.onClick,
      style = props.style,
      rest = (0, _objectWithoutProperties3.default)(props, ['taskId', 'filter', 'filters', 'onClick', 'style']);

  return _react2.default.createElement(
    'div',
    (0, _extends3.default)({}, rest, style),
    _react2.default.createElement(
      'div',
      null,
      (0, _signavioI18n2.default)('Show only')
    ),
    taskId && _react2.default.createElement(
      _Filter2.default,
      {
        key: 'taskId',
        active: (0, _lodash.isEqual)({ taskId: taskId }, filter),
        data: { taskId: taskId },
        onClick: onClick
      },
      (0, _signavioI18n2.default)('this task')
    ),
    (filters || getFilters()).map(function (_ref) {
      var data = _ref.data,
          name = _ref.name;
      return _react2.default.createElement(
        _Filter2.default,
        {
          key: name,
          active: (0, _lodash.isEqual)(filter, data),
          data: data,
          onClick: onClick
        },
        name
      );
    })
  );
}

exports.default = (0, _recompose.compose)((0, _recompose.withHandlers)({
  onClick: function onClick(_ref2) {
    var filter = _ref2.filter,
        onFilter = _ref2.onFilter;
    return function (data) {
      if ((0, _lodash.isEqual)(filter, data)) {
        onFilter(null);
      } else {
        onFilter(data);
      }
    };
  }
}), (0, _recompose.lifecycle)({
  componentWillReceiveProps: function componentWillReceiveProps(_ref3) {
    var taskId = _ref3.taskId,
        onFilter = _ref3.onFilter;

    if (this.props.taskId && !taskId) {
      onFilter(null);
    }

    if (taskId && taskId !== this.props.taskId) {
      onFilter({ taskId: taskId });
    }
  }
}), (0, _styles.defaultStyle)(function (_ref4) {
  var font = _ref4.font,
      padding = _ref4.padding;
  return {
    fontSize: font.size.small,

    paddingTop: padding.xsmall,
    paddingBottom: padding.xsmall,

    textAlign: 'center'
  };
}), (0, _components.omitProps)(['onFilter']))(Filters);


// WEBPACK FOOTER //
// ./packages/cases/lib/events/components/Filters.js