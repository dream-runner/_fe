'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _recompose = require('recompose');

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _components = require('@signavio/effektif-commons/lib/components');

var _tiles = require('@signavio/effektif-commons/lib/components/tiles');

var _forms = require('@signavio/effektif-commons/lib/components/forms');

var _effektifFields = require('@signavio/effektif-fields');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function OutputSelect(_ref) {
  var outputs = _ref.outputs,
      readOnly = _ref.readOnly,
      labelId = _ref.labelId,
      data = _ref.data,
      dataTypeDescriptors = _ref.dataTypeDescriptors,
      onComplete = _ref.onComplete;

  return _react2.default.createElement(_components.Autocomplete, {
    id: labelId,
    readOnly: readOnly,
    data: data,
    placeholder: (0, _signavioI18n2.default)('Click to add another output'),
    renderItem: function renderItem(_ref2) {
      var _ref2$entity = _ref2.entity,
          name = _ref2$entity.name,
          type = _ref2$entity.type;
      return _react2.default.createElement(
        _tiles.ActionTile,
        { icon: _effektifFields.dataTypeUtils.getIcon(dataTypeDescriptors, type) },
        name
      );
    },
    onComplete: onComplete
  });
}
exports.default = (0, _recompose.compose)(_effektifFields.getFieldsContext, (0, _recompose.withProps)(function () {
  return {
    label: (0, _signavioI18n2.default)('Add another output'),
    description: (0, _signavioI18n2.default)('Each field in the subprocess can be used in this process once you added it as an output.')
  };
}), (0, _recompose.withPropsOnChange)(['outputs'], function (_ref3) {
  var outputs = _ref3.outputs;
  return {
    data: outputs.map(function (output) {
      return { entity: output, value: output.name };
    })
  };
}), (0, _recompose.withHandlers)({
  onComplete: function onComplete(_ref4) {
    var onSelect = _ref4.onSelect;
    return function (_ref5) {
      var entity = _ref5.entity;
      return onSelect(entity);
    };
  }
}), _forms.withLabel)(OutputSelect);


// WEBPACK FOOTER //
// ./packages/workflows-app/lib/actions/components/OutputSelect.js