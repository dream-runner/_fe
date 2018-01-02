'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

exports.default = FileUploadEvent;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _components = require('@signavio/effektif-commons/lib/components');

var _effektifFields = require('@signavio/effektif-fields');

var _LogEvent = require('./LogEvent');

var _LogEvent2 = _interopRequireDefault(_LogEvent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function FileUploadEvent(_ref) {
  var event = _ref.event,
      serviceName = _ref.serviceName,
      rest = (0, _objectWithoutProperties3.default)(_ref, ['event', 'serviceName']);
  var links = event.links;


  return _react2.default.createElement(
    _LogEvent2.default,
    (0, _extends3.default)({}, rest, {
      event: event,
      title: !links || links.length === 0 ? (0, _signavioI18n2.default)('No files were uploaded to __serviceName__', { serviceName: serviceName }) : (0, _signavioI18n2.default)('__fileName__ was uploaded to __serviceName__', '__count__ files were uploaded to __serviceName__', {
        fileName: _react2.default.createElement(
          'span',
          { className: 'file-name' },
          links[0].name
        ),
        count: links.length,
        serviceName: serviceName
      })
    }),
    links && _react2.default.createElement(
      _components.List,
      null,
      links.map(function (link) {
        return _react2.default.createElement(_effektifFields.LabeledField, {
          readOnly: true,
          key: link.url,
          type: { name: 'link' },
          value: link.url,
          label: link.name
        });
      })
    )
  );
}


// WEBPACK FOOTER //
// ./packages/events/lib/UploadEvent.js