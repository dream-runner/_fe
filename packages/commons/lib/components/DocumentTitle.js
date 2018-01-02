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

var _react = require('react');

var _applicationName = require('../applicationName');

var _applicationName2 = _interopRequireDefault(_applicationName);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DocumentTitle = function (_Component) {
  (0, _inherits3.default)(DocumentTitle, _Component);

  function DocumentTitle() {
    (0, _classCallCheck3.default)(this, DocumentTitle);
    return (0, _possibleConstructorReturn3.default)(this, _Component.apply(this, arguments));
  }

  DocumentTitle.prototype.componentWillMount = function componentWillMount() {
    this.initialTitle = document.title;

    document.title = this.props.title || _applicationName2.default;
  };

  DocumentTitle.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if (nextProps.title !== this.props.title) {
      document.title = nextProps.title || _applicationName2.default;
    }
  };

  DocumentTitle.prototype.componentWillUnmount = function componentWillUnmount() {
    document.title = this.initialTitle;
  };

  DocumentTitle.prototype.render = function render() {
    return null;
  };

  return DocumentTitle;
}(_react.Component);

exports.default = DocumentTitle;


// WEBPACK FOOTER //
// ./packages/commons/lib/components/DocumentTitle.js