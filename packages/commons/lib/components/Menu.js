'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ui = require('@signavio/ui');

var _styles = require('../styles');

var _tiles = require('./tiles');

var _Disable = require('./Disable');

var _Disable2 = _interopRequireDefault(_Disable);

var _features = require('./features');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Option = _propTypes2.default.shape({
  id: _propTypes2.default.string.isRequired,
  title: _propTypes2.default.node.isRequired
});

function Menu(props) {
  var value = props.value,
      onChange = props.onChange,
      options = props.options,
      disabled = props.disabled,
      style = props.style;


  return _react2.default.createElement(
    _ui.List,
    { style: style },
    options.map(function (_ref) {
      var id = _ref.id,
          title = _ref.title,
          disabled = _ref.disabled,
          feature = _ref.feature;

      if (feature) {
        return _react2.default.createElement(
          _features.Feature,
          { sneekPeek: true, feature: feature },
          _react2.default.createElement(Entry, {
            style: style('entry'),
            key: id,
            isActive: value === id,
            disabled: disabled,
            title: title,
            onClick: function onClick() {
              return onChange(id);
            }
          })
        );
      }

      return _react2.default.createElement(Entry, {
        style: style('entry'),
        key: id,
        isActive: value === id,
        disabled: disabled,
        title: title,
        onClick: function onClick() {
          return onChange(id);
        }
      });
    })
  );
}

Menu.propTypes = {
  options: _propTypes2.default.arrayOf(Option).isRequired,
  onChange: _propTypes2.default.func.isRequired,

  value: _propTypes2.default.string
};

exports.default = (0, _styles.defaultStyle)()(Menu);


var styled = (0, _styles.defaultStyle)(function (theme) {
  return {
    icon: (0, _extends3.default)({}, _styles.utils.transition('background', 'color')),

    '&active': {
      backgroundColor: theme.color.mono.ultralight,

      icon: {
        backgroundColor: theme.color.primary.base,
        color: _styles.utils.color(theme.color.primary.base)
      }
    }
  };
}, function (props) {
  return {
    '&active': props.isActive
  };
});

var Entry = styled(function (props) {
  var title = props.title,
      disabled = props.disabled,
      isActive = props.isActive,
      style = props.style,
      rest = (0, _objectWithoutProperties3.default)(props, ['title', 'disabled', 'isActive', 'style']);

  var renderContent = function renderContent() {
    return _react2.default.createElement(
      _tiles.ActionTile,
      (0, _extends3.default)({}, rest, {
        style: style,
        iconSet: 'fontAwesome',
        icon: 'angle-right'
      }),
      title
    );
  };

  if (disabled) {
    return _react2.default.createElement(
      _Disable2.default,
      { disabled: true },
      renderContent()
    );
  }

  return renderContent();
});

Entry.propTypes = {
  title: _propTypes2.default.node.isRequired
};


// WEBPACK FOOTER //
// ./packages/commons/lib/components/Menu.js