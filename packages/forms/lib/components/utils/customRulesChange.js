'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.default = customRulesChange;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function customRulesChange(fieldDefinition, value) {
  if (value) {
    return (0, _extends3.default)({}, fieldDefinition, {
      customRules: value,
      visibleCondition: {
        conditions: [{ type: 'equals' }],
        type: 'and'
      },
      visibility: 'isShownWhen'
    });
  }

  return (0, _extends3.default)({}, fieldDefinition, {
    customRules: value,
    visibleCondition: null,
    visibility: null,
    readOnlyCondition: null,
    requiredCondition: null
  });
}


// WEBPACK FOOTER //
// ./packages/forms/lib/components/utils/customRulesChange.js