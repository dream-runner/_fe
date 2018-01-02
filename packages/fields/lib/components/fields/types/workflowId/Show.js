'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShowWorkflowIdPure = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _effektifApi = require('@signavio/effektif-api');

var _tiles = require('@signavio/effektif-commons/lib/components/tiles');

var _connectSpinning = require('../../higher-order/connectSpinning');

var _connectSpinning2 = _interopRequireDefault(_connectSpinning);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getTriggerIcon = function getTriggerIcon(services, triggerKey) {
  if (!triggerKey) {
    return 'workflow';
  }

  var findTrigger = function findTrigger(_ref) {
    var _ref$triggerTypes = _ref.triggerTypes,
        triggerTypes = _ref$triggerTypes === undefined ? [] : _ref$triggerTypes;
    return triggerTypes.find(function (triggerType) {
      return triggerType.key === triggerKey;
    });
  };

  var service = services.find(findTrigger);

  if (!service) {
    return 'workflow';
  }

  var trigger = findTrigger(service);
  return trigger.icon || service.icon;
};

var ShowWorkflowIdPure = exports.ShowWorkflowIdPure = function ShowWorkflowIdPure(_ref2) {
  var workflow = _ref2.workflow,
      services = _ref2.services,
      small = _ref2.small,
      transparent = _ref2.transparent,
      highlightedName = _ref2.highlightedName,
      subtitle = _ref2.subtitle;
  return _react2.default.createElement(
    _tiles.TextTile,
    (0, _extends3.default)({
      icon: getTriggerIcon(services, workflow.trigger && workflow.trigger.type)
    }, { small: small, transparent: transparent, subtitle: subtitle }),
    highlightedName || workflow.name
  );
};

var connectValue = (0, _connectSpinning2.default)(function (_ref3) {
  var value = _ref3.value;
  return {
    workflow: { type: _effektifApi.types.WORKFLOW, id: value },
    services: { type: _effektifApi.types.SERVICES }
  };
});

exports.default = connectValue(ShowWorkflowIdPure);


// WEBPACK FOOTER //
// ./packages/fields/lib/components/fields/types/workflowId/Show.js