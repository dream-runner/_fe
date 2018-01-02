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

var _reactRedux = require('react-redux');

var _redux = require('redux');

var _actions = require('../actions');

var _groupBy = require('../actions/groupBy');

var _groupBy2 = _interopRequireDefault(_groupBy);

var _GroupBy = require('../components/GroupBy');

var _GroupBy2 = _interopRequireDefault(_GroupBy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GroupByContainer = function GroupByContainer(_ref) {
  var addGroupBy = _ref.addGroupBy,
      removeGroupBy = _ref.removeGroupBy,
      rest = (0, _objectWithoutProperties3.default)(_ref, ['addGroupBy', 'removeGroupBy']);
  return _react2.default.createElement(_GroupBy2.default, (0, _extends3.default)({}, rest, { onRemove: removeGroupBy, onAdd: addGroupBy }));
};

exports.default = (0, _reactRedux.connect)(undefined, function (dispatch, _ref2) {
  var reportId = _ref2.reportId;
  return (0, _redux.bindActionCreators)((0, _actions.bindReportId)(_groupBy2.default, reportId), dispatch);
})(GroupByContainer);


// WEBPACK FOOTER //
// ./packages/reporting/lib/report/containers/GroupBy.js