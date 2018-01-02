'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

exports.default = function (WrappedComponent) {
  return function (_Component) {
    (0, _inherits3.default)(AsAccordion, _Component);

    function AsAccordion(_ref) {
      var _ref$activeItem = _ref.activeItem,
          activeItem = _ref$activeItem === undefined ? null : _ref$activeItem;
      (0, _classCallCheck3.default)(this, AsAccordion);

      var _this = (0, _possibleConstructorReturn3.default)(this, _Component.apply(this, arguments));

      _this.state = { activeItem: activeItem };
      return _this;
    }

    AsAccordion.prototype.componentWillUpdate = function componentWillUpdate(_ref2) {
      var activeItem = _ref2.activeItem;

      if (activeItem !== this.props.activeItem) {
        this.setState({ activeItem: activeItem });
      }
    };

    AsAccordion.prototype.render = function render() {
      var activeItem = this.state.activeItem;


      return _react2.default.createElement(WrappedComponent, (0, _extends3.default)({}, this.props, {
        activeItem: activeItem,
        onToggle: this.handleToggle.bind(this)
      }));
    };

    AsAccordion.prototype.handleToggle = function handleToggle(item) {
      var activeItem = this.state.activeItem;

      var isOpen = activeItem === item;

      this.setState({
        activeItem: isOpen ? null : item
      });
    };

    return AsAccordion;
  }(_react.Component);
};

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }


// WEBPACK FOOTER //
// ./packages/commons/lib/components/AsAccordion.js