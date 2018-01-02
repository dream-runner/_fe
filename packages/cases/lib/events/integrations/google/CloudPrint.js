'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

exports.default = GoogleCloudPrintEvent;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _components = require('@signavio/effektif-commons/lib/components');

var _tiles = require('@signavio/effektif-commons/lib/components/tiles');

var _effektifFields = require('@signavio/effektif-fields');

var _workflowEvents = require('@signavio/workflow-events');

var _workflowEvents2 = _interopRequireDefault(_workflowEvents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function GoogleCloudPrintEvent(_ref) {
  var event = _ref.event,
      rest = (0, _objectWithoutProperties3.default)(_ref, ['event']);
  var printJobs = event.printJobs;


  var infoJob = printJobs[0];

  var _ref2 = infoJob || {},
      printerName = _ref2.printerName,
      _ref2$numberOfCopies = _ref2.numberOfCopies,
      numberOfCopies = _ref2$numberOfCopies === undefined ? 0 : _ref2$numberOfCopies;

  return _react2.default.createElement(
    _workflowEvents2.default,
    (0, _extends3.default)({}, rest, {
      event: event,
      icon: 'printer',
      title: printJobs.length === 0 ? (0, _signavioI18n2.default)('No files were printed on Google Cloud Print') : (0, _signavioI18n2.default)('__count__ file was printed', '__count__ files were printed', {
        count: printJobs.length
      })
    }),
    _react2.default.createElement(
      _components.List,
      { wrapItems: true },
      _react2.default.createElement(_effektifFields.LabeledField, {
        readOnly: true,
        narrow: true,
        type: { name: 'text' },
        label: (0, _signavioI18n2.default)('Printer'),
        value: printerName
      }),
      _react2.default.createElement(_effektifFields.LabeledField, {
        readOnly: true,
        narrow: true,
        type: { name: 'text' },
        label: (0, _signavioI18n2.default)('Copies'),
        value: numberOfCopies
      }),
      _react2.default.createElement(
        _effektifFields.FieldStructure,
        { narrow: true, label: (0, _signavioI18n2.default)('Files') },
        _react2.default.createElement(
          _components.List,
          null,
          printJobs.map(function (job) {
            return _react2.default.createElement(
              _tiles.TextTile,
              { key: job.fileName + '-' + job.ticketLink },
              _react2.default.createElement(
                'a',
                { href: job.ticketLink, rel: 'external' },
                job.fileName
              )
            );
          })
        )
      )
    )
  );
}


// WEBPACK FOOTER //
// ./packages/cases/lib/events/integrations/google/CloudPrint.js