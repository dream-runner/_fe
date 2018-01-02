'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _class = function (_React$Component) {
  (0, _inherits3.default)(_class, _React$Component);

  function _class() {
    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, _class);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.state = {
      collapsing: false,
      expanded: !!_this.props.expanded
    }, _this.handleTransitionEnd = function () {
      var event = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (!_this.state.expanded) {
        _this.setState({
          collapsing: false
        });

        if (_this.props.onCollapse) {
          _this.props.onCollapse();
        }

        return;
      }

      var wrapper = _reactDom2.default.findDOMNode(_this.refs.wrapper);

      if (!_this.noAnimation() && event.target !== wrapper) {
        return;
      }

      if (_this.props.expanded) {
        wrapper.style.overflow = 'visible';
      }

      wrapper.style.height = null;
    }, _this.getHeight = function () {
      if (!_this.state.expanded) {
        return 0;
      }

      return _this.getBodyHeight();
    }, _this.getBodyHeight = function () {
      var body = _reactDom2.default.findDOMNode(_this.refs.body);

      return body ? body.offsetHeight : 0;
    }, _this.noAnimation = function () {
      return !_this.props.animate || !_utils.CSSUtils.events.transition.possible();
    }, _this.toggleCollapse = function (ev) {
      if (_this.props.preventToggle) {
        return;
      }

      if (_this.props.onToggle) {
        _this.props.onToggle(!_this.state.expanded, ev);
      }

      if (!_this.state.expanded) {
        if (_this.props.onExpand) {
          _this.props.onExpand(ev);
        }
      } else {
        if (_this.props.onBeforeCollapse) {
          _this.props.onBeforeCollapse(ev);
        }
      }

      _this.setState({
        expanded: !_this.state.expanded,
        collapsing: _this.state.expanded
      });
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  _class.prototype.componentDidMount = function componentDidMount() {
    var wrapper = _reactDom2.default.findDOMNode(this.refs.wrapper);

    if (!this.state.expanded) {
      wrapper.style.height = 0 + 'px';
    } else {
      wrapper.style.overflow = 'visible';
    }

    if (this.noAnimation()) {
      // immediately invoke the expand handler
      // if(this.props.onExpand) {
      //     this.props.onExpand();
      // }
      return;
    }

    _utils.CSSUtils.events.transition.onEnd(wrapper, this.handleTransitionEnd);
  };

  _class.prototype.componentWillUpdate = function componentWillUpdate(nextProps, nextState) {
    var wrapper = _reactDom2.default.findDOMNode(this.refs.wrapper);

    if (!wrapper) {
      return;
    }

    if (this.state.expanded && !nextState.expanded) {
      wrapper.style.height = this.getBodyHeight() + 'px';
    }
  };

  _class.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if (nextProps.expanded === this.props.expanded) {
      return;
    }

    this.setState({
      expanded: nextProps.expanded,
      collapsing: this.state.expanded
    });
  };

  _class.prototype.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
    var wrapper = _reactDom2.default.findDOMNode(this.refs.wrapper);

    if (!wrapper) {
      return;
    }

    if (prevState.expanded === this.state.expanded) {
      return;
    }

    wrapper.style.overflow = null;

    if (this.state.expanded) {
      wrapper.style.height = this.getHeight() + 'px';
    } else {
      wrapper.style.height = this.getBodyHeight() + 'px';

      (0, _lodash.defer)(function () {
        wrapper.style.height = '0px';
      });
    }

    if (this.noAnimation()) {
      this.handleTransitionEnd();
    }
  };

  _class.prototype.componentWillUnmount = function componentWillUnmount() {
    if (this.noAnimation()) {
      return;
    }

    _utils.CSSUtils.events.transition.offEnd(_reactDom2.default.findDOMNode(this.refs.wrapper), this.handleTransitionEnd);
  };

  _class.prototype.render = function render() {
    var _props = this.props,
        className = _props.className,
        header = _props.header,
        animate = _props.animate,
        children = _props.children,
        onToggle = _props.onToggle,
        onBeforeCollapse = _props.onBeforeCollapse,
        onCollapse = _props.onCollapse,
        onExpand = _props.onExpand,
        expandedProp = _props.expanded,
        preventToggle = _props.preventToggle,
        rest = (0, _objectWithoutProperties3.default)(_props, ['className', 'header', 'animate', 'children', 'onToggle', 'onBeforeCollapse', 'onCollapse', 'onExpand', 'expanded', 'preventToggle']);
    var _state = this.state,
        expanded = _state.expanded,
        collapsing = _state.collapsing;


    var cls = _utils.CSSUtils.cls({
      collapsible: true,
      'collapsible-expanded': expanded,
      'collapsible-in-collapse': collapsing
    }, className);

    return _react2.default.createElement(
      'div',
      (0, _extends3.default)({}, rest, { className: cls }),
      _react2.default.createElement(
        'div',
        { className: 'collapsible-header', onClick: this.toggleCollapse },
        (0, _lodash.isFunction)(header) ? header(expanded) : header
      ),
      _react2.default.createElement(
        'div',
        { ref: 'wrapper', className: 'collapsible-wrapper clearfix' },
        (expanded || collapsing) && _react2.default.createElement(
          'div',
          { ref: 'body', className: 'collapsible-body' },
          _react2.default.createElement(
            'div',
            { className: 'collapsible-content' },
            this.props.children
          )
        )
      )
    );
  };

  return _class;
}(_react2.default.Component);

_class.displayName = 'Collapsible';
_class.propTypes = {
  header: _propTypes2.default.oneOfType([_propTypes2.default.node, _propTypes2.default.func]).isRequired,

  animate: _propTypes2.default.bool,
  expanded: _propTypes2.default.bool,
  preventToggle: _propTypes2.default.bool,

  className: _propTypes2.default.string,

  onToggle: _propTypes2.default.func,
  onBeforeCollapse: _propTypes2.default.func,
  onCollapse: _propTypes2.default.func,
  onExpand: _propTypes2.default.func,

  children: _propTypes2.default.node
};
_class.defaultProps = {
  animate: true
};
exports.default = _class;


// WEBPACK FOOTER //
// ./packages/commons/lib/components/Collapsible.js