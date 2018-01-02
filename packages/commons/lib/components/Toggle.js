'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getModifiers = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _styles = require('../styles');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Toggle(props) {
  var yesLabel = props.yesLabel,
      noLabel = props.noLabel,
      value = props.value,
      readOnly = props.readOnly,
      disabled = props.disabled,
      onChange = props.onChange,
      style = props.style,
      rest = (0, _objectWithoutProperties3.default)(props, ['yesLabel', 'noLabel', 'value', 'readOnly', 'disabled', 'onChange', 'style']);


  return _react2.default.createElement(
    'div',
    (0, _extends3.default)({}, rest, style),
    _react2.default.createElement(
      'div',
      style('container'),
      _react2.default.createElement(
        'div',
        (0, _extends3.default)({}, style('yes'), {
          onClick: function onClick() {
            if (readOnly || disabled) {
              return;
            }

            if (value === true) {
              onChange(false);

              return;
            }

            onChange(true);
          }
        }),
        yesLabel || (0, _signavioI18n2.default)('Yes')
      ),
      _react2.default.createElement('div', (0, _extends3.default)({}, style('switch'), {
        onClick: function onClick() {
          if (readOnly || disabled) {
            return;
          }

          onChange(!value);
        }
      })),
      _react2.default.createElement(
        'div',
        (0, _extends3.default)({}, style('no'), {
          onClick: function onClick() {
            if (readOnly || disabled) {
              return;
            }

            if (value === false) {
              onChange(true);

              return;
            }

            onChange(false);
          }
        }),
        noLabel || (0, _signavioI18n2.default)('No')
      )
    )
  );
}
var getModifiers = exports.getModifiers = function getModifiers(_ref) {
  var value = _ref.value;
  return {
    '&yesSelected': value === true,
    '&noSelected': value === false,
    '&active': value === true || value === false,
    '&inactive': value !== true && value !== false
  };
};

var styled = (0, _styles.defaultStyle)(function (_ref2) {
  var color = _ref2.color,
      font = _ref2.font;
  return {
    overflow: 'hidden',
    fontSize: font.size.form,
    textAlign: 'center',
    textTransform: 'uppercase',

    container: {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: '100%',
      height: _styles.variables.lineHeight.block,
      lineHeight: _styles.variables.lineHeight.block + 'px',
      cursor: 'pointer'
    },

    yes: {
      position: 'absolute',
      top: 0,
      display: 'block',
      width: '50%'
    },

    no: {
      position: 'absolute',
      display: 'block',
      top: 0,
      width: '50%',
      left: '50%'
    },

    switch: (0, _extends3.default)({
      position: 'relative',
      zIndex: 1,
      height: _styles.variables.lineHeight.block,
      width: '50%',
      backgroundColor: 'white'

    }, _styles.utils.transition(['left', 'width'])),

    '&active': {
      yes: {
        backgroundColor: color.primary.base,

        color: _styles.utils.color(color.primary.base)
      },
      no: {
        backgroundColor: color.mono.lighter,
        color: _styles.utils.color(color.mono.lighter)
      }
    },

    '&inactive': {
      yes: {
        backgroundColor: color.primary.light,

        color: _styles.utils.color(color.primary.light)
      },
      no: {
        backgroundColor: color.primary.light,

        color: _styles.utils.color(color.primary.light)
      },
      switch: {
        position: 'absolute',
        width: 1,
        left: '50%'
      }
    },

    '&yesSelected': {
      switch: (0, _extends3.default)({
        left: '50%'

      }, _styles.utils.border('1px', 'solid', color.mono.lighter), _styles.utils.boxShadow('-2px', '0px'))
    },

    '&noSelected': {
      switch: (0, _extends3.default)({
        left: 0

      }, _styles.utils.border('1px', 'solid', color.mono.lighter), _styles.utils.boxShadow('2px', '0px'))
    }
  };
}, getModifiers);

exports.default = styled(Toggle);


// WEBPACK FOOTER //
// ./packages/commons/lib/components/Toggle.js