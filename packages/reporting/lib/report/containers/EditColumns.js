'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _redux = require('redux');

var _actions = require('../actions');

var _table = require('../actions/table');

var _table2 = _interopRequireDefault(_table);

var _EditColumns = require('../components/table/EditColumns');

var _EditColumns2 = _interopRequireDefault(_EditColumns);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EditColumnsContainer = function EditColumnsContainer(_ref) {
  var addColumn = _ref.addColumn,
      removeColumn = _ref.removeColumn,
      replaceColumn = _ref.replaceColumn,
      reorderColumns = _ref.reorderColumns,
      rest = (0, _objectWithoutProperties3.default)(_ref, ['addColumn', 'removeColumn', 'replaceColumn', 'reorderColumns']);
  return _react2.default.createElement(_EditColumns2.default, (0, _extends3.default)({}, rest, {
    onAdd: addColumn,
    onRemove: removeColumn,
    onReplace: replaceColumn,
    onReorder: reorderColumns
  }));
};

exports.default = (0, _reactRedux.connect)(undefined, function (dispatch, _ref2) {
  var reportId = _ref2.reportId;
  return (0, _redux.bindActionCreators)((0, _actions.bindReportId)(_table2.default, reportId), dispatch);
})(EditColumnsContainer);


// WEBPACK FOOTER //
// ./packages/reporting/lib/report/containers/EditColumns.js