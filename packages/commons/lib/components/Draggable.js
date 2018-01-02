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

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _lodash = require('lodash');

require('../jquery-ui');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cloneHelper = function cloneHelper(appendTo) {
  // clone & remove react-ids to prevent React exception
  var $el = (0, _jquery2.default)(this).clone().removeAttr('data-reactid');
  $el.find('*').removeAttr('data-reactid');

  // set fixed witdh & height
  $el.css('display', 'block').css('width', (0, _jquery2.default)(this).width() + 'px').css('height', (0, _jquery2.default)(this).height() + 'px');

  if (appendTo) {
    $el.appendTo(appendTo);
  }
  return $el;
};

var _class = function (_React$Component) {
  (0, _inherits3.default)(_class, _React$Component);

  function _class() {
    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, _class);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.ensureDraggable = function () {
      if ((0, _jquery2.default)(_reactDom2.default.findDOMNode(_this)).data('ui-draggable')) {
        // update draggable
        (0, _jquery2.default)(_reactDom2.default.findDOMNode(_this)).draggable('option', 'helper', _this.props.helper === 'clone' ? cloneHelper.bind(_reactDom2.default.findDOMNode(_this), null) : _this.props.helper);
      } else {
        // init draggable
        (0, _jquery2.default)(_reactDom2.default.findDOMNode(_this)).draggable({
          cancel: false,
          cursorAt: { left: 0, top: 0 },
          stop: _this.handleDrop,
          start: _this.handleDrag,
          helper: _this.props.helper === 'clone' ? cloneHelper.bind(_reactDom2.default.findDOMNode(_this), null) : _this.props.helper
        });
      }
    }, _this.handleDrag = function () {
      (0, _jquery2.default)('.outermost-container').addClass('ui-dragging');

      if (_this.props.onDrag) {
        _this.props.onDrag();
      }
    }, _this.handleDrop = function (ev, ui) {
      (0, _jquery2.default)('.outermost-container').removeClass('ui-dragging');

      if (_this.props.onDrop) {
        var position = parseInt(ui.helper.attr('data-insert-index'), 10);
        _this.props.onDrop((0, _lodash.isNaN)(position) ? undefined : position, ui.offset);
      }
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  _class.prototype.render = function render() {
    var _props = this.props,
        helper = _props.helper,
        sortableConnection = _props.sortableConnection,
        onDrag = _props.onDrag,
        onDrop = _props.onDrop,
        children = _props.children,
        rest = (0, _objectWithoutProperties3.default)(_props, ['helper', 'sortableConnection', 'onDrag', 'onDrop', 'children']);


    return _react2.default.cloneElement(_react.Children.only(this.props.children), rest);
  };

  _class.prototype.componentDidMount = function componentDidMount() {
    this.ensureDraggable();

    if (this.props.sortableConnection) {
      this.props.sortableConnection.connectToSortable(_reactDom2.default.findDOMNode(this));
    }
  };

  _class.prototype.componentDidUpdate = function componentDidUpdate() {
    this.ensureDraggable();
  };

  _class.prototype.componentWillUnmount = function componentWillUnmount() {
    if (this.props.sortableConnection) {
      this.props.sortableConnection.unconnect(_reactDom2.default.findDOMNode(this));
    }

    (0, _jquery2.default)(_reactDom2.default.findDOMNode(this)).draggable('destroy');
  };

  return _class;
}(_react2.default.Component);

_class.displayName = 'Draggable';
_class.propTypes = {
  helper: _propTypes2.default.string,
  onDrag: _propTypes2.default.func,
  onDrop: _propTypes2.default.func,
  children: _propTypes2.default.node
};
exports.default = _class;


// WEBPACK FOOTER //
// ./packages/commons/lib/components/Draggable.js