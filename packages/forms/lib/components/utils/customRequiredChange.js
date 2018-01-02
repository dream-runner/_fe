'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.default = customRequiredChange;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function customRequiredChange(fieldDefinition, value) {
  var type = value.type,
      requiredCondition = value.requiredCondition;


  if (requiredCondition) {
    return (0, _extends3.default)({}, fieldDefinition, {
      requiredCondition: requiredCondition
    });
  }

  switch (type) {
    default:
      return fieldDefinition;
    case 'always':
      return (0, _extends3.default)({}, fieldDefinition, {
        readOnly: false,
        required: true,
        readOnlyCondition: null,
        requiredCondition: null
      });
    case 'never':
      return (0, _extends3.default)({}, fieldDefinition, {
        required: false,
        requiredCondition: null
      });
    case 'custom':
      return (0, _extends3.default)({}, fieldDefinition, {
        required: false,
        requiredCondition: {
          conditions: [{ type: 'equals' }],
          type: 'and'
        }
      });
  }
}


// WEBPACK FOOTER //
// ./packages/forms/lib/components/utils/customRequiredChange.js