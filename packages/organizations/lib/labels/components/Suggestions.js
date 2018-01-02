'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _recompose = require('recompose');

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _hints = require('@signavio/effektif-commons/lib/components/hints');

var _styles = require('@signavio/effektif-commons/lib/styles');

var _Dropdown = require('./Dropdown');

var _Dropdown2 = _interopRequireDefault(_Dropdown);

var _LabelTile = require('./LabelTile');

var _LabelTile2 = _interopRequireDefault(_LabelTile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Suggestions = function Suggestions(_ref) {
  var isEmpty = _ref.isEmpty,
      onRemove = _ref.onRemove,
      onSelect = _ref.onSelect,
      readOnly = _ref.readOnly,
      suggestions = _ref.suggestions,
      value = _ref.value,
      style = _ref.style;
  return _react2.default.createElement(
    'div',
    style,
    value.map(function (label) {
      return _react2.default.createElement(_LabelTile2.default, (0, _extends3.default)({
        key: label.id,
        small: true,
        onRemove: readOnly ? null : function () {
          return onRemove(label);
        }
      }, label, {
        style: style('label')
      }));
    }),
    isEmpty && _react2.default.createElement(
      _hints.Hint,
      { inline: true },
      (0, _signavioI18n2.default)('This process has no labels yet.')
    ),
    !readOnly && suggestions.length > 0 && _react2.default.createElement(_Dropdown2.default, {
      className: 'dropdown',
      options: suggestions,
      onChange: onSelect,
      onKeyDown: function onKeyDown(_ref2) {
        var keyCode = _ref2.keyCode,
            target = _ref2.target;

        if (keyCode !== 8) {
          return;
        }

        var text = target.value;

        if (text && text.trim().length > 0) {
          return;
        }

        if (value.length === 0) {
          return;
        }

        onRemove(value[value.length - 1]);
      },
      style: style('dropdown')
    })
  );
};


var filterOutSelectedLabels = function filterOutSelectedLabels(labels, value) {
  return labels.filter(function (_ref3) {
    var id = _ref3.id;
    return !value.some(function (label) {
      return label.id === id;
    });
  });
};

exports.default = (0, _recompose.compose)((0, _recompose.withState)('value', 'setValue', function (props) {
  return props.value || [];
}), (0, _recompose.withState)('suggestions', 'setSuggestions', function (_ref4) {
  var labels = _ref4.labels,
      value = _ref4.value;
  return filterOutSelectedLabels(labels, value);
}), (0, _recompose.mapProps)(function (props) {
  return (0, _extends3.default)({
    isEmpty: props.readOnly && props.value.length === 0
  }, props);
}), (0, _recompose.withHandlers)({
  onRemove: function onRemove(_ref5) {
    var value = _ref5.value,
        setSuggestions = _ref5.setSuggestions,
        setValue = _ref5.setValue,
        onChange = _ref5.onChange,
        labels = _ref5.labels;
    return function (_ref6) {
      var id = _ref6.id;

      var index = value.findIndex(function (label) {
        return label.id === id;
      });
      var newValue = [].concat((0, _toConsumableArray3.default)(value.slice(0, index)), (0, _toConsumableArray3.default)(value.slice(index + 1)));
      setValue(newValue);
      setSuggestions(filterOutSelectedLabels(labels, newValue));
      onChange(newValue);
    };
  },
  onSelect: function onSelect(_ref7) {
    var onChange = _ref7.onChange,
        value = _ref7.value,
        setSuggestions = _ref7.setSuggestions,
        setValue = _ref7.setValue,
        labels = _ref7.labels;
    return function (id) {
      var selectedLabel = labels.find(function (label) {
        return label.id === id;
      });

      if (!selectedLabel) {
        return;
      }

      var newValue = [].concat((0, _toConsumableArray3.default)(value), [selectedLabel]);

      setValue(newValue);
      setSuggestions(filterOutSelectedLabels(labels, newValue));
      onChange(newValue);
    };
  }
}), (0, _styles.defaultStyle)(function (theme) {
  var inputHeight = _styles.utils.calculateHeight(theme.font.size.small, theme.lineHeight, theme.padding.xsmall) + 2 * _LabelTile.BORDER_WIDTH;

  return {
    display: 'inline-block',
    paddingBottom: theme.padding.xsmall,

    label: {
      marginTop: theme.padding.xsmall,
      marginRight: theme.padding.xsmall
    },

    dropdown: {
      marginTop: theme.padding.xsmall,
      marginRight: theme.padding.xsmall,
      display: 'inline-block',
      verticalAlign: 'middle',

      input: (0, _extends3.default)({}, _styles.utils.input(theme), {
        fontSize: theme.font.size.small,
        height: inputHeight,
        lineHeight: theme.lineHeight,
        paddingTop: 0,
        paddingBottom: 0,
        paddingLeft: 0,
        paddingRight: 0,
        width: 200
      }, _styles.utils.border(0, 'solid', theme.color.mono.lighter), {

        placeholder: {
          display: 'block',
          textAlign: 'left',
          width: '100%',
          paddingTop: theme.padding.xsmall + _LabelTile.BORDER_WIDTH,
          paddingBottom: theme.padding.xsmall + _LabelTile.BORDER_WIDTH
        },

        search: (0, _extends3.default)({
          display: 'block',
          fontSize: theme.font.size.small,
          height: inputHeight,
          minHeight: inputHeight,
          lineHeight: theme.lineHeight,
          paddingTop: 0,
          paddingBottom: 0,
          width: '100%'
        }, _styles.utils.border(1, 'solid', theme.color.primary.base))
      }),

      nodeContent: {
        minWidth: '100%'
      },

      widget: {
        outline: 'none',
        overflowY: 'auto'
      },

      option: {
        padding: theme.padding.xsmall
      }
    }
  };
}))(Suggestions);


// WEBPACK FOOTER //
// ./packages/organizations/lib/labels/components/Suggestions.js