'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

exports.default = GoogleSpreadsheetAddRowEvent;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _effektifFields = require('@signavio/effektif-fields');

var _workflowEvents = require('@signavio/workflow-events');

var _workflowEvents2 = _interopRequireDefault(_workflowEvents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function GoogleSpreadsheetAddRowEvent(_ref) {
  var event = _ref.event,
      rest = (0, _objectWithoutProperties3.default)(_ref, ['event']);
  var worksheetLink = event.worksheetLink;


  return _react2.default.createElement(
    _workflowEvents2.default,
    (0, _extends3.default)({}, rest, {
      event: event,
      icon: 'table',
      title: !worksheetLink ? (0, _signavioI18n2.default)('No row was added to a Google spreadsheet') : (0, _signavioI18n2.default)('A row was added to a Google spreadsheet')
    }),
    worksheetLink && _react2.default.createElement(_effektifFields.LabeledField, {
      readOnly: true,
      type: { name: 'link' },
      label: worksheetLink.name,
      value: worksheetLink.url
    })
  );
}


// WEBPACK FOOTER //
// ./packages/cases/lib/events/integrations/google/SpreadsheetAddLine.js