'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.default = customVisibilityChange;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function customVisibilityChange(fieldDefinition, value) {
  var visibility = value.visibility,
      visibleCondition = value.visibleCondition;


  if (visibility) {
    return (0, _extends3.default)({}, fieldDefinition, {
      visibility: visibility
    });
  }

  if (visibleCondition) {
    return (0, _extends3.default)({}, fieldDefinition, {
      visibleCondition: visibleCondition
    });
  }

  return fieldDefinition;
}


// WEBPACK FOOTER //
// ./packages/forms/lib/components/utils/customVisibilityChange.js