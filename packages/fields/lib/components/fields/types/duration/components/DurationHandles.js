'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _recompose = require('recompose');

var _reactForms = require('@signavio/react-forms');

var _styles = require('@signavio/effektif-commons/lib/styles');

var _components = require('@signavio/effektif-commons/lib/components');

var _utils = require('@signavio/effektif-commons/lib/utils');

var _utils2 = require('../utils');

var _UnitEdit = require('./UnitEdit');

var _UnitEdit2 = _interopRequireDefault(_UnitEdit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function DurationHandles(_ref) {
  var durations = _ref.durations,
      units = _ref.units,
      style = _ref.style,
      onUnitChange = _ref.onUnitChange,
      onRequestHideWidget = _ref.onRequestHideWidget;

  var containerEl = void 0;
  return (
    // tabIndex is important so that in the onBlur we can get a relatedTarget if the click happened
    // on an element inside this widget
    _react2.default.createElement(
      'div',
      (0, _extends3.default)({}, style, {
        ref: function ref(el) {
          containerEl = el;
        },
        tabIndex: '0'
      }),
      _react2.default.createElement(
        'table',
        (0, _extends3.default)({}, style('table'), { className: 'table' }),
        _react2.default.createElement(
          'thead',
          null,
          _react2.default.createElement(
            'tr',
            null,
            units.map(function (unit) {
              return _react2.default.createElement(
                'td',
                (0, _extends3.default)({}, style('headerCell'), { key: unit.key }),
                unit.title
              );
            })
          )
        ),
        _react2.default.createElement(
          'tbody',
          null,
          _react2.default.createElement(
            'tr',
            null,
            units.map(function (unit) {
              return _react2.default.createElement(
                'td',
                { key: unit.key },
                _react2.default.createElement(_UnitEdit2.default, {
                  unit: unit,
                  value: durations[unit.key] || 0,
                  onChange: onUnitChange,
                  onBlur: function onBlur(ev) {
                    if (containerEl && !containerEl.contains(ev.relatedTarget)) {
                      onRequestHideWidget();
                    }
                  },
                  onKeyUp: function onKeyUp(ev) {
                    if (_utils.KeyUtils.isEnter(ev)) {
                      onRequestHideWidget();
                    }
                  }
                })
              );
            })
          )
        )
      )
    )
  );
}

exports.default = (0, _recompose.compose)(_reactForms.wrapOnComplete, (0, _recompose.lifecycle)({
  componentWillUnmount: function componentWillUnmount() {
    var onComplete = this.props.onComplete;

    if (onComplete) {
      // trigger onComplete when the dropdown is closed
      onComplete();
    }
  }
}), (0, _recompose.withPropsOnChange)(['value'], function (_ref2) {
  var value = _ref2.value;
  return {
    value: value || 0
  };
}), (0, _recompose.withHandlers)({
  onUnitChange: function onUnitChange(_ref3) {
    var value = _ref3.value,
        units = _ref3.units,
        onChange = _ref3.onChange;
    return function (unitValue, unit) {
      var _parseParts = (0, _utils2.parseParts)(value, units),
          oldValue = _parseParts[unit.key];

      var cleansedValue = value - oldValue * unit.duration;
      var newValue = cleansedValue + unit.duration * unitValue;
      onChange(newValue || null);
    };
  }
}), (0, _recompose.withPropsOnChange)(['value'], function (_ref4) {
  var value = _ref4.value,
      units = _ref4.units;
  return {
    durations: (0, _utils2.parseParts)(value, units)
  };
}), (0, _styles.defaultStyle)(function (_ref5) {
  var color = _ref5.color;
  return (0, _extends3.default)({}, _styles.utils.popover(color), {
    outline: 'none',

    table: {
      marginBottom: 0
    },

    headerCell: {
      borderTop: 'none'
    }
  });
}), (0, _components.omitProps)(['value']))(DurationHandles);


// WEBPACK FOOTER //
// ./packages/fields/lib/components/fields/types/duration/components/DurationHandles.js