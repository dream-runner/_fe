'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _recompose = require('recompose');

var _styles = require('@signavio/effektif-commons/lib/styles');

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _components = require('@signavio/effektif-commons/lib/components');

var _tiles = require('@signavio/effektif-commons/lib/components/tiles');

var _forms = require('@signavio/effektif-commons/lib/components/forms');

var _FormToolbar = require('./FormToolbar');

var _FormToolbar2 = _interopRequireDefault(_FormToolbar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Form = function Form(_ref) {
  var id = _ref.id,
      name = _ref.name,
      color = _ref.color,
      editing = _ref.editing,
      setColor = _ref.setColor,
      setName = _ref.setName,
      onCancel = _ref.onCancel,
      onSave = _ref.onSave,
      style = _ref.style;
  return _react2.default.createElement(
    _tiles.Tile,
    {
      toolbar: _react2.default.createElement(
        _components.List,
        { direction: 'horizontal' },
        _react2.default.createElement(_components.ColorInput, {
          value: color,
          onChange: function onChange(newColor) {
            return setColor(newColor);
          }
        }),
        _react2.default.createElement(_FormToolbar2.default, {
          editing: editing,
          onCancel: onCancel,
          disabled: !name,
          onSave: function (_onSave) {
            function onSave() {
              return _onSave.apply(this, arguments);
            }

            onSave.toString = function () {
              return _onSave.toString();
            };

            return onSave;
          }(function () {
            onSave({ id: id, name: name, color: color });
            setName('');
          })
        })
      ),
      style: style
    },
    _react2.default.createElement(_forms.Text, {
      autoFocus: editing,
      value: name,
      onChange: function onChange(value) {
        return setName(value);
      },
      onKeyDown: function onKeyDown(ev) {
        if (!name || ev.keyCode !== 13) {
          return;
        }
        onSave({ id: id, name: name, color: color });
        setName('');
      },
      placeholder: (0, _signavioI18n2.default)('Type the label name'),
      style: style('input')
    })
  );
};

exports.default = (0, _recompose.compose)((0, _recompose.withState)('color', 'setColor', function (_ref2) {
  var color = _ref2.color;
  return color;
}), (0, _recompose.withState)('name', 'setName', function (_ref3) {
  var name = _ref3.name;
  return name;
}), (0, _styles.defaultStyle)(function (theme) {
  var inputHeight = _styles.utils.calculateHeight(theme.font.size.normal, theme.lineHeight, theme.padding.small);

  return {
    input: {
      height: inputHeight,
      width: '100%'
    }
  };
}))(Form);


// WEBPACK FOOTER //
// ./packages/organizations/lib/labels/components/Form.js