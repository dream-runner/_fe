'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.supportedTypes = exports.ValidatedField = exports.FieldStructure = exports.LabeledField = exports.Field = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _lodash = require('lodash');

var _recompose = require('recompose');

var _forms = require('@signavio/effektif-commons/lib/components/forms');

var _types = require('./types');

var fieldTypes = _interopRequireWildcard(_types);

var _LabeledField2 = require('./LabeledField');

var _LabeledField3 = _interopRequireDefault(_LabeledField2);

var _Field2 = require('./Field');

var _Field3 = _interopRequireDefault(_Field2);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Field = _Field3.default;
exports.LabeledField = _LabeledField3.default;
var FieldStructure = (0, _recompose.compose)(_forms.withLabel, (0, _recompose.mapProps)(function (_ref) {
  var labelId = _ref.labelId,
      rest = (0, _objectWithoutProperties3.default)(_ref, ['labelId']);
  return (0, _extends3.default)({}, rest, {

    id: labelId
  });
}))('div');
exports.FieldStructure = FieldStructure;
var ValidatedField = exports.ValidatedField = (0, _forms.withValidation)(_LabeledField3.default);

var supportedTypes = exports.supportedTypes = (0, _lodash.keys)(fieldTypes);


// WEBPACK FOOTER //
// ./packages/fields/lib/components/fields/index.js