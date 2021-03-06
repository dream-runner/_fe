'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

exports.default = GeneratorUpdatedEvent;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _workflowEvents = require('@signavio/workflow-events');

var _workflowEvents2 = _interopRequireDefault(_workflowEvents);

var _components = require('../components');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function GeneratorUpdatedEvent(_ref) {
  var event = _ref.event,
      rest = (0, _objectWithoutProperties3.default)(_ref, ['event']);
  var generatorId = event.generatorId,
      licenseType = event.licenseType;


  return _react2.default.createElement(_workflowEvents2.default, (0, _extends3.default)({}, rest, {
    event: event,
    title: (0, _signavioI18n2.default)('updated __type__ generator.', {
      type: _react2.default.createElement(_components.GeneratorLink, { generatorId: generatorId, licenseType: licenseType })
    })
  }));
}


// WEBPACK FOOTER //
// ./packages/admin/lib/events/generator/Updated.js