'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ColumnBrowser = undefined;

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

var _lodash = require('lodash');

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _styles = require('../styles');

var _hints = require('./hints');

var _ColumnBrowserChild = require('./ColumnBrowserChild');

var _ColumnBrowserChild2 = _interopRequireDefault(_ColumnBrowserChild);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ColumnBrowser = exports.ColumnBrowser = function (_Component) {
  (0, _inherits3.default)(ColumnBrowser, _Component);

  function ColumnBrowser() {
    (0, _classCallCheck3.default)(this, ColumnBrowser);
    return (0, _possibleConstructorReturn3.default)(this, _Component.apply(this, arguments));
  }

  ColumnBrowser.prototype.componentDidMount = function componentDidMount() {
    this.scrollIntoView();
  };

  ColumnBrowser.prototype.componentDidUpdate = function componentDidUpdate() {
    this.scrollIntoView();
  };

  ColumnBrowser.prototype.scrollIntoView = function scrollIntoView() {
    var browser = (0, _jquery2.default)(this.refs.browser);

    browser.animate({
      scrollLeft: browser.children().first().width()
    }, 500);
  };

  ColumnBrowser.prototype.render = function render() {
    return _react2.default.createElement(
      'div',
      (0, _extends3.default)({}, this.props.style, { ref: 'browser' }),
      _react2.default.createElement(
        'table',
        this.props.style('columns'),
        _react2.default.createElement(
          'tbody',
          null,
          _react2.default.createElement(
            'tr',
            null,
            this.renderRoot(),
            this.renderChildren()
          )
        )
      )
    );
  };

  ColumnBrowser.prototype.hasChildren = function hasChildren(_ref) {
    var id = _ref.id;

    var element = this.props.data[id];

    if (!element) {
      return true;
    }

    if (element.isLeaf) {
      return;
    }

    if (!element.children) {
      return true;
    }

    return element.children.length > 0;
  };

  ColumnBrowser.prototype.renderRoot = function renderRoot() {
    if (!this.props.showRoot) {
      return;
    }

    var parent = this.getItem(0);

    return _react2.default.createElement(
      'td',
      this.props.style('column'),
      this.renderChild(parent, null)
    );
  };

  ColumnBrowser.prototype.getItem = function getItem(index) {
    return this.props.data[this.props.path[index]];
  };

  ColumnBrowser.prototype.renderChildren = function renderChildren(index) {
    var _this2 = this;

    if ((0, _lodash.isUndefined)(index)) {
      index = 0;
    }

    if (this.props.path.length === index) {
      return [];
    }

    var parent = this.getItem(index);

    if (!this.hasChildren(parent)) {
      if (parent.isLeaf) {
        return [];
      }

      return [_react2.default.createElement(
        'td',
        (0, _extends3.default)({}, this.props.style('column'), { key: parent.id }),
        _react2.default.createElement(
          _hints.Hint,
          null,
          (0, _signavioI18n2.default)('This folder has no subfolders')
        )
      )];
    }

    return [_react2.default.createElement(
      'td',
      (0, _extends3.default)({}, this.props.style(['column', 'childColumn']), { key: parent.id }),
      _react2.default.createElement(
        'div',
        this.props.style('items'),
        (0, _lodash.map)(parent.children, function (child) {
          return _this2.renderChild(child, parent);
        })
      )
    )].concat((0, _toConsumableArray3.default)(this.renderChildren(index + 1)));
  };

  ColumnBrowser.prototype.isSelected = function isSelected(child) {
    return this.props.path.indexOf(child.id) === this.props.path.length - 1;
  };

  ColumnBrowser.prototype.renderChild = function renderChild(child, parent) {
    var _this3 = this;

    var active = (0, _lodash.includes)(this.props.path, child.id);
    var selected = this.isSelected(child);
    var loading = child.id === this.props.loading;

    return _react2.default.createElement(_ColumnBrowserChild2.default, {
      small: true,
      active: active,
      selected: selected,
      loading: loading,
      child: child,
      key: child.id,
      path: this.props.path,
      onClick: function onClick() {
        return _this3.handleChildClick(child, parent);
      }
    });
  };

  ColumnBrowser.prototype.handleChildClick = function handleChildClick(child, parent) {
    var path = this.props.path;
    if (parent) {
      path = path.slice(0, Math.max(0, path.indexOf(parent.id)));
      path = (0, _lodash.compact)(path.concat([parent.id, child.id]));
    } else {
      // root selected
      path = [child.id];
    }

    if (this.props.onSelect) {
      this.props.onSelect(child, path);
    }
  };

  return ColumnBrowser;
}(_react.Component);

ColumnBrowser.propTypes = {
  data: _propTypes2.default.object.isRequired,
  path: _propTypes2.default.arrayOf(_propTypes2.default.string).isRequired,

  showRoot: _propTypes2.default.bool,
  onSelect: _propTypes2.default.func
};


var styled = (0, _styles.defaultStyle)(function (theme) {
  return {
    overflowX: 'auto',
    overflowY: 'hidden',
    whiteSpace: 'nowrap',
    height: 250,
    marginTop: theme.padding.small,
    marginBottom: theme.padding.normal,

    columns: {
      height: 250
    },

    column: {
      verticalAlign: 'top',
      minWidth: 200,
      maxWidth: 200,
      paddingRight: theme.padding.small
    },

    childColumn: {
      borderLeft: '1px solid ' + theme.color.mono.light,
      paddingLeft: 5
    },

    items: {
      maxHeight: 250,
      overflowY: 'auto'
    }
  };
});
exports.default = styled(ColumnBrowser);


// WEBPACK FOOTER //
// ./packages/commons/lib/components/ColumnBrowser.js