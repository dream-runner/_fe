'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _recompose = require('recompose');

var _styles = require('../../styles');

var _ = require('../');

var _tiles = require('../tiles');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FilterList = function FilterList(_ref) {
  var children = _ref.children,
      expanded = _ref.expanded,
      hint = _ref.hint,
      setExpanded = _ref.setExpanded,
      title = _ref.title,
      style = _ref.style,
      rest = (0, _objectWithoutProperties3.default)(_ref, ['children', 'expanded', 'hint', 'setExpanded', 'title', 'style']);
  return _react2.default.createElement(
    _.Collapsible,
    (0, _extends3.default)({
      header: _react2.default.createElement(
        _tiles.TextTile,
        (0, _extends3.default)({
          toolbar: _react2.default.createElement(_.Icon, {
            iconSet: 'fontAwesome',
            icon: expanded ? 'angle-up' : 'angle-down'
          }),
          subtitle: !expanded && hint
        }, style('header')),
        _react2.default.createElement(
          'h4',
          style('title'),
          title
        )
      ),
      onToggle: function onToggle() {
        return setExpanded(!expanded);
      },
      expanded: expanded
    }, style),
    children
  );
};
exports.default = (0, _recompose.compose)((0, _recompose.withState)('expanded', 'setExpanded', function (props) {
  return props.expanded;
}), (0, _styles.defaultStyle)(function (theme) {
  var height = _styles.utils.calculateHeight(theme.font.size.normal, theme.lineHeight, theme.padding.xsmall);
  return {
    header: {
      backgroundColor: 'none',
      cursor: 'pointer',
      main: {
        paddingLeft: 0
      }
    },

    title: {
      lineHeight: height + 'px'
    }
  };
}))(FilterList);


// WEBPACK FOOTER //
// ./packages/commons/lib/components/filters/FilterList.js