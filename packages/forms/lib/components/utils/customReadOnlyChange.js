'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.default = customReadOnlyChange;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function customReadOnlyChange(fieldDefinition, value) {
  var type = value.type,
      readOnlyCondition = value.readOnlyCondition;


  if (readOnlyCondition) {
    return (0, _extends3.default)({}, fieldDefinition, {
      readOnlyCondition: readOnlyCondition
    });
  }

  switch (type) {
    default:
      return fieldDefinition;
    case 'always':
      return (0, _extends3.default)({}, fieldDefinition, {
        readOnly: true,
        required: false,
        readOnlyCondition: null,
        requiredCondition: null
      });
    case 'never':
      return (0, _extends3.default)({}, fieldDefinition, {
        readOnly: false,
        readOnlyCondition: null
      });
    case 'custom':
      return (0, _extends3.default)({}, fieldDefinition, {
        readOnly: false,
        readOnlyCondition: {
          conditions: [{ type: 'equals' }],
          type: 'and'
        }
      });
  }
}


// WEBPACK FOOTER //
// ./packages/forms/lib/components/utils/customReadOnlyChange.js