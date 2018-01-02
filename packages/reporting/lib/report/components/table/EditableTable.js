'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _recompose = require('recompose');

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _buttons = require('@signavio/effektif-commons/lib/components/buttons');

var _EditColumns = require('../../containers/EditColumns');

var _EditColumns2 = _interopRequireDefault(_EditColumns);

var _ResultForReportUnderEdit = require('../../containers/ResultForReportUnderEdit');

var _ResultForReportUnderEdit2 = _interopRequireDefault(_ResultForReportUnderEdit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EditableReportTable = function EditableReportTable(_ref) {
  var reportId = _ref.reportId,
      selectionId = _ref.selectionId,
      columns = _ref.columns,
      editing = _ref.editing,
      readOnly = _ref.readOnly,
      onOpenConfiguration = _ref.onOpenConfiguration,
      onCloseConfiguration = _ref.onCloseConfiguration;

  if (editing) {
    return _react2.default.createElement(_EditColumns2.default, {
      columns: columns,
      reportId: reportId,
      selectionId: selectionId,
      headerButtons: _react2.default.createElement(
        _buttons.IconButton,
        { icon: 'check', light: true, onClick: onCloseConfiguration },
        (0, _signavioI18n2.default)('Back to the table')
      )
    });
  }
  return _react2.default.createElement(_ResultForReportUnderEdit2.default, {
    reportId: reportId,
    selectionId: selectionId,
    headerButtons: _react2.default.createElement(
      _buttons.IconButton,
      {
        icon: 'wrench',
        iconSet: 'fontAwesome',
        disabled: readOnly,
        light: true,
        onClick: onOpenConfiguration
      },
      (0, _signavioI18n2.default)('Configure columns')
    )
  });
};

exports.default = (0, _recompose.compose)((0, _recompose.withState)('editing', 'setEditing', false), (0, _recompose.withHandlers)({
  onOpenConfiguration: function onOpenConfiguration(_ref2) {
    var setEditing = _ref2.setEditing;
    return function () {
      return setEditing(true);
    };
  },
  onCloseConfiguration: function onCloseConfiguration(_ref3) {
    var setEditing = _ref3.setEditing;
    return function () {
      return setEditing(false);
    };
  }
}))(EditableReportTable);


// WEBPACK FOOTER //
// ./packages/reporting/lib/report/components/table/EditableTable.js