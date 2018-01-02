'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _recompose = require('recompose');

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _components = require('@signavio/effektif-commons/lib/components');

var _hints = require('@signavio/effektif-commons/lib/components/hints');

var _OutputSelect = require('./OutputSelect');

var _OutputSelect2 = _interopRequireDefault(_OutputSelect);

var _OutputList = require('./OutputList');

var _OutputList2 = _interopRequireDefault(_OutputList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function DynamicOutputs(_ref) {
  var value = _ref.value,
      outputDescriptors = _ref.outputDescriptors,
      readOnly = _ref.readOnly,
      onSelect = _ref.onSelect,
      onRemove = _ref.onRemove,
      onRename = _ref.onRename;

  if (outputDescriptors.length === 0) {
    return _react2.default.createElement(
      _hints.Hint,
      { info: true },
      (0, _signavioI18n2.default)('This action does not offer any outputs.')
    );
  }

  var _groupBy = (0, _lodash.groupBy)(outputDescriptors, function (_ref2) {
    var key = _ref2.key;
    return value[key] ? 'mapped' : 'unmapped';
  }),
      _groupBy$mapped = _groupBy.mapped,
      mapped = _groupBy$mapped === undefined ? [] : _groupBy$mapped,
      _groupBy$unmapped = _groupBy.unmapped,
      unmapped = _groupBy$unmapped === undefined ? [] : _groupBy$unmapped;

  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(
      _hints.Hint,
      null,
      (0, _signavioI18n2.default)('This action outputs new fields that you can use in your workflow. If you like, you can change their names here.')
    ),
    _react2.default.createElement(_OutputList2.default, {
      outputs: mapped,
      onRemove: onRemove,
      onChange: onRename,
      value: value,
      readOnly: readOnly
    }),
    unmapped.length > 0 && _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(_components.Divider, null),
      _react2.default.createElement(_OutputSelect2.default, {
        readOnly: readOnly,
        outputs: unmapped,
        onSelect: onSelect
      })
    )
  );
}

var enhance = (0, _recompose.withHandlers)({
  onSelect: function onSelect(_ref3) {
    var onAdd = _ref3.onAdd;
    return function (output) {
      return onAdd(output);
    };
  }
});

exports.default = enhance(DynamicOutputs);


// WEBPACK FOOTER //
// ./packages/workflows-app/lib/actions/components/DynamicOutputs.js