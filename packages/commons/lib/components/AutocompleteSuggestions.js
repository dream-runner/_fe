'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _lodash = require('lodash');

var _utils = require('../utils');

var _Hint = require('./Hint');

var _Hint2 = _interopRequireDefault(_Hint);

var _hints = require('./hints');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Suggestion = function (_React$Component) {
  (0, _inherits3.default)(Suggestion, _React$Component);

  function Suggestion() {
    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, Suggestion);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.handleMouseOver = function () {
      _this.props.onMouseOver(_this.props.index, _this.props.item);
    }, _this.handleMouseOut = function () {
      _this.props.onMouseOut(_this.props.index, _this.props.item);
    }, _this.handleClick = function (ev) {
      if (_this.props.item.disabled) {
        ev.preventDefault();
        ev.stopPropagation();

        return;
      }

      _this.props.onClick(ev, _this.props.index, _this.props.item);
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  Suggestion.prototype.render = function render() {
    var cls = _utils.CSSUtils.cls({
      suggestion: true,
      active: this.props.active,
      disabled: this.props.item.disabled
    });

    return _react2.default.createElement(
      'div',
      {
        className: cls,
        onMouseOver: this.handleMouseOver,
        onMouseOut: this.handleMouseOut,
        onClick: this.handleClick
      },
      this.props.renderItem(this.props.item)
    );
  };

  return Suggestion;
}(_react2.default.Component);

Suggestion.displayName = 'Suggestion';
Suggestion.propTypes = {
  renderItem: _propTypes2.default.func.isRequired,

  onMouseOver: _propTypes2.default.func.isRequired,
  onMouseOut: _propTypes2.default.func.isRequired,
  onClick: _propTypes2.default.func.isRequired,

  item: _propTypes2.default.shape({
    disabled: _propTypes2.default.bool
  }).isRequired,

  position: _propTypes2.default.number,
  active: _propTypes2.default.bool
};

var _class = function (_React$Component2) {
  (0, _inherits3.default)(_class, _React$Component2);

  function _class() {
    var _temp2, _this2, _ret2;

    (0, _classCallCheck3.default)(this, _class);

    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return _ret2 = (_temp2 = (_this2 = (0, _possibleConstructorReturn3.default)(this, _React$Component2.call.apply(_React$Component2, [this].concat(args))), _this2), _this2.renderSuggestions = function () {
      if (_this2.props.loading) {
        return _react2.default.createElement(
          _hints.Hint,
          { loading: true },
          (0, _signavioI18n2.default)('Loading entries...')
        );
      }

      if (_this2.props.items.length === 0) {
        return _this2.renderEmptyText();
      }

      var grouped = (0, _lodash.groupBy)(_this2.props.items, function (item) {
        return item.type || 'default';
      });

      var offset = 0;

      var children = (0, _lodash.map)(_this2.props.groups, function (group) {
        if (!grouped[group.id]) {
          return;
        }

        var items = _this2.renderGroup(group, offset, grouped[group.id]);

        offset = offset + grouped[group.id].length;

        return items;
      });

      if ((0, _lodash.size)(_this2.props.groups) < (0, _lodash.size)(grouped)) {
        return (0, _lodash.union)(children, _this2.renderUngrouped(grouped, offset));
      }

      return children;
    }, _this2.renderUngrouped = function (grouped, offset) {
      return (0, _lodash.flatten)((0, _lodash.map)(grouped, function (items, key) {
        if ((0, _lodash.includes)(_this2.props.groups, key)) {
          return;
        }

        var children = (0, _lodash.map)(items, function (item, index) {
          return _this2.renderSuggestion(item, index + offset);
        });

        offset = offset + items.length;

        return children;
      }));
    }, _this2.renderGroup = function (group, offset, items) {
      return _react2.default.createElement(
        'div',
        { className: 'group', key: group.name },
        (0, _lodash.map)(items, function (item, index) {
          return _this2.renderSuggestion(item, index + offset);
        }),
        _this2.renderMoreHint(group, items.length)
      );
    }, _this2.renderMoreHint = function (group, current) {
      if (_this2.props.hideGroupPagination) {
        return;
      }

      if (_this2.props.loadingGroup === group.id) {
        return _react2.default.createElement(
          _Hint2.default,
          { className: 'more', small: true, loading: true },
          (0, _signavioI18n2.default)('Loading more __type__..', {
            type: group.name
          })
        );
      }

      if ((0, _lodash.isUndefined)(group.size)) {
        return;
      }

      if (group.size > 0 && group.size === current) {
        return;
      }

      return _react2.default.createElement(
        _Hint2.default,
        { className: 'more', small: true },
        (0, _signavioI18n2.default)('Showing __count__ of __size__ __type__', {
          count: current,
          size: group.size,
          type: group.name
        }),
        _react2.default.createElement(
          'button',
          {
            className: 'btn btn-link btn-show-more',
            onClick: _this2.requestData.bind(null, group)
          },
          (0, _signavioI18n2.default)('Show more')
        )
      );
    }, _this2.requestData = function (group, ev) {
      ev.preventDefault();
      ev.stopPropagation();

      if (!_this2.props.onNextPage) {
        return;
      }

      _this2.props.onNextPage(group);
    }, _this2.renderEmptyText = function () {
      if ((0, _lodash.isNull)(_this2.props.emptyText)) {
        return;
      }

      return _react2.default.createElement(
        'div',
        { className: 'suggestions' },
        _react2.default.createElement(
          _Hint2.default,
          null,
          _this2.props.emptyText || (0, _signavioI18n2.default)('No items found')
        )
      );
    }, _this2.renderSuggestion = function (item, index) {
      return _react2.default.createElement(Suggestion, {
        key: _this2.getKey(item, index),
        index: index,
        item: item,
        active: index === _this2.props.position,
        renderItem: _this2.props.renderItem,
        onMouseOver: _this2.props.onMouseOver,
        onMouseOut: _this2.props.onMouseOut,
        onClick: _this2.handleClick
      });
    }, _this2.getKey = function (item, index) {
      if (item.id) {
        return item.id;
      }

      if (item.entity && item.entity.id) {
        return item.entity.id;
      }

      return index;
    }, _this2.handleClick = function (ev, index, item) {
      _this2.props.onClick(item, ev);

      ev.preventDefault();
      ev.stopPropagation();
    }, _this2.handleMouseOver = function (index) {
      _this2.props.onMouseOver(index);
    }, _this2.handleMouseOut = function (index) {
      _this2.props.onMouseOut(index);
    }, _temp2), (0, _possibleConstructorReturn3.default)(_this2, _ret2);
  }

  _class.prototype.render = function render() {
    var cls = _utils.CSSUtils.cls({
      'autocomplete-suggestions': true,
      'hide-toggle': this.props.hideTrigger,
      static: this.props.static,
      'modal-mode': this.props.modalMode
    });

    return _react2.default.createElement(
      'div',
      {
        className: cls,
        style: this.props.style,
        onMouseOver: this.props.onEnter,
        onMouseOut: this.props.onLeave
      },
      this.renderSuggestions(),
      this.props.children
    );
  };

  return _class;
}(_react2.default.Component);

_class.displayName = 'Suggestions';
_class.propTypes = {
  renderItem: _propTypes2.default.func.isRequired,
  items: _propTypes2.default.array.isRequired,
  groups: _propTypes2.default.array.isRequired,
  loading: _propTypes2.default.bool,
  loadingGroup: _propTypes2.default.string,
  hideGroupPagination: _propTypes2.default.bool,

  onMouseOver: _propTypes2.default.func.isRequired,
  onMouseOut: _propTypes2.default.func.isRequired,
  onEnter: _propTypes2.default.func,
  onLeave: _propTypes2.default.func,
  onNextPage: _propTypes2.default.func
};
_class.defaultProps = {
  addOnPosition: 'top'
};
exports.default = _class;


// WEBPACK FOOTER //
// ./packages/commons/lib/components/AutocompleteSuggestions.js