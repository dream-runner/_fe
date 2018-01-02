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

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _class = function (_React$Component) {
  (0, _inherits3.default)(_class, _React$Component);

  function _class() {
    (0, _classCallCheck3.default)(this, _class);
    return (0, _possibleConstructorReturn3.default)(this, _React$Component.apply(this, arguments));
  }

  _class.prototype.render = function render() {
    var cls = _utils.CSSUtils.cls({
      'file-drop-zone': true
    }, this.props.className);

    return _react2.default.createElement(
      'div',
      (0, _extends3.default)({}, this.props, { className: cls }),
      this.props.children
    );
  };

  _class.prototype.componentDidMount = function componentDidMount() {
    this.props.fileUploadConnection.setDropZone(_reactDom2.default.findDOMNode(this));
  };

  return _class;
}(_react2.default.Component);

_class.displayName = 'FileUploadDropZone';
_class.propTypes = {
  className: _propTypes2.default.string,
  children: _propTypes2.default.node
};
exports.default = _class;


// WEBPACK FOOTER //
// ./packages/commons/lib/components/FileUploadDropZone.js