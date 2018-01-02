'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

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

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _lodash = require('lodash');

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

require('../jquery-ui');

var _DraggableSortableConnection = require('./DraggableSortableConnection');

var _DraggableSortableConnection2 = _interopRequireDefault(_DraggableSortableConnection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _class = function (_React$Component) {
  (0, _inherits3.default)(_class, _React$Component);

  function _class() {
    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, _class);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.getChildren = function () {
      var children = _this.props.children;

      if (!children) {
        return [];
      }

      if ((0, _lodash.isArray)(children)) {
        return children;
      }

      return [children];
    }, _this.handleDrop = function () {
      var changed = false;
      var newOrder = (0, _jquery2.default)(_reactDom2.default.findDOMNode(_this)).children().get().map(function (child, i) {
        var rv = (0, _jquery2.default)(child).data('reactSortablePos');
        if (rv !== i) changed = true;
        return rv;
      });

      // Restore the list to its original ordering, which is necessary to
      // ensure that React applies the correct transform after `onSort`.
      (0, _jquery2.default)(_reactDom2.default.findDOMNode(_this)).children().sort(function (a, b) {
        return (0, _jquery2.default)(a).data('reactSortablePos') > (0, _jquery2.default)(b).data('reactSortablePos') ? 1 : -1;
      }).appendTo(_reactDom2.default.findDOMNode(_this));

      if (changed) {
        _this.props.onSort(newOrder);
      }
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  _class.prototype.render = function render() {
    var _props = this.props,
        Component = _props.component,
        childComponent = _props.childComponent,
        onSort = _props.onSort,
        children = _props.children,
        draggableConnection = _props.draggableConnection,
        handle = _props.handle,
        rest = (0, _objectWithoutProperties3.default)(_props, ['component', 'childComponent', 'onSort', 'children', 'draggableConnection', 'handle']);

    return _react2.default.createElement(
      Component,
      rest,
      children
    );
  };

  _class.prototype.componentDidMount = function componentDidMount() {
    (0, _jquery2.default)(_reactDom2.default.findDOMNode(this)).children().each(function (i) {
      (0, _jquery2.default)(this).data('reactSortablePos', i);
    });

    (0, _jquery2.default)(_reactDom2.default.findDOMNode(this)).sortable({
      tolerance: 'pointer',
      stop: this.handleDrop,
      handle: this.props.handle,
      receive: function receive(ev, ui) {
        // receiving a draggable
        var insertIndex = (0, _jquery2.default)((0, _jquery2.default)(this).data('uiSortable').currentItem).index();
        (0, _jquery2.default)(ui.helper).attr('data-insert-index', insertIndex);
        (0, _jquery2.default)((0, _jquery2.default)(this).data('uiSortable').currentItem).remove();
      }
    });

    if (this.props.draggableConnection) {
      this.props.draggableConnection.setSortable(_reactDom2.default.findDOMNode(this));
    }
  };

  _class.prototype.componentDidUpdate = function componentDidUpdate() {
    (0, _jquery2.default)(_reactDom2.default.findDOMNode(this)).children().not('.ui-sortable-placeholder').each(function (i) {
      (0, _jquery2.default)(this).data('reactSortablePos', i);
    });
  };

  _class.prototype.componentWillUnmount = function componentWillUnmount() {
    (0, _jquery2.default)(_reactDom2.default.findDOMNode(this)).sortable('destroy');

    // $(ReactDOM.findDOMNode(this)).children().get().forEach(function(node) {
    //     ReactDOM.unmountComponentAtNode(node);
    // });

    if (this.props.draggableConnection) {
      this.props.draggableConnection.unsetSortable();
    }
  };

  return _class;
}(_react2.default.Component);

_class.displayName = 'Sortable';
_class.propTypes = {
  onSort: _propTypes2.default.func.isRequired,

  children: _propTypes2.default.node,

  draggableConnection: _propTypes2.default.instanceOf(_DraggableSortableConnection2.default),

  component: _propTypes2.default.string,
  handle: _propTypes2.default.string
};
_class.defaultProps = {
  component: 'ul',
  childComponent: 'li'
};
exports.default = _class;


// WEBPACK FOOTER //
// ./packages/commons/lib/components/Sortable.js