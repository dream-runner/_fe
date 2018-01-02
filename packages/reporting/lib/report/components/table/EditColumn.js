'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _recompose = require('recompose');

var _components = require('@signavio/effektif-commons/lib/components');

var _tiles = require('@signavio/effektif-commons/lib/components/tiles');

var _buttons = require('@signavio/effektif-commons/lib/components/buttons');

var _styles = require('@signavio/effektif-commons/lib/styles');

var _effektifFields = require('@signavio/effektif-fields');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EditColumn = function EditColumn(_ref) {
  var name = _ref.name,
      binding = _ref.binding,
      onChange = _ref.onChange,
      onRemove = _ref.onRemove,
      style = _ref.style;
  return _react2.default.createElement(
    'div',
    style,
    _react2.default.createElement(
      _tiles.Tile,
      {
        header: _react2.default.createElement(_components.DragHandle, { className: 'draggable-handle' }),
        toolbar: _react2.default.createElement(_buttons.RemoveButton, { onClick: onRemove })
      },
      _react2.default.createElement(
        'div',
        { className: 'row' },
        _react2.default.createElement(
          'div',
          { className: 'col-sm-6 binding' },
          _react2.default.createElement(_effektifFields.Binding, { readOnly: true, binding: binding })
        ),
        _react2.default.createElement(
          'div',
          { className: 'col-sm-6 column-title' },
          _react2.default.createElement(_effektifFields.Field, {
            noClear: true,
            type: (0, _effektifFields.textType)(),
            value: name,
            onComplete: onChange,
            placeholder: (0, _signavioI18n2.default)('Change the column title')
          })
        )
      )
    )
  );
};

var styled = (0, _styles.defaultStyle)(function () {
  return {
    marginBottom: 1
  };
});

exports.default = (0, _recompose.compose)((0, _recompose.withHandlers)({
  onChange: function (_onChange) {
    function onChange(_x) {
      return _onChange.apply(this, arguments);
    }

    onChange.toString = function () {
      return _onChange.toString();
    };

    return onChange;
  }(function (_ref2) {
    var onChange = _ref2.onChange;
    return function (name) {
      return onChange({ name: name });
    };
  })
}), styled)(EditColumn);


// WEBPACK FOOTER //
// ./packages/reporting/lib/report/components/table/EditColumn.js