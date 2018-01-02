'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _recompose = require('recompose');

var _components = require('@signavio/effektif-commons/lib/components');

var _tiles = require('@signavio/effektif-commons/lib/components/tiles');

var _styles = require('@signavio/effektif-commons/lib/styles');

var _priorities = require('./priorities');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Item(_ref) {
  var name = _ref.name,
      selected = _ref.selected,
      onClick = _ref.onClick,
      style = _ref.style;

  return _react2.default.createElement(
    _tiles.ActionTile,
    {
      header: _react2.default.createElement(_components.Icon, {
        style: style('icon'),
        icon: selected ? 'dot-circle-o' : 'circle-o',
        iconSet: 'fontAwesome'
      }),
      onClick: onClick
    },
    name
  );
}

var enhance = (0, _recompose.compose)((0, _recompose.withHandlers)({
  onClick: function (_onClick) {
    function onClick(_x) {
      return _onClick.apply(this, arguments);
    }

    onClick.toString = function () {
      return _onClick.toString();
    };

    return onClick;
  }(function (_ref2) {
    var id = _ref2.id,
        onClick = _ref2.onClick;
    return function () {
      onClick(id);
    };
  })
}), (0, _styles.defaultStyle)(function () {
  return {
    '&priority-0': {
      icon: {
        backgroundColor: _priorities.Colors.high
      }
    },
    '&priority-1': {
      icon: {
        backgroundColor: _priorities.Colors.medium
      }
    },
    '&priority-2': {
      icon: {
        backgroundColor: _priorities.Colors.normal
      }
    },
    '&priority-3': {
      icon: {
        backgroundColor: _priorities.Colors.low
      }
    }
  };
}, function (_ref3) {
  var id = _ref3.id;
  return (0, _defineProperty3.default)({}, '&priority-' + id, true);
}));

exports.default = enhance(Item);


// WEBPACK FOOTER //
// ./packages/cases/lib/components/priority/Item.js