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

var _moment = require('../extensions/moment');

var _moment2 = _interopRequireDefault(_moment);

var _utils = require('../utils');

var _forms = require('./forms');

var _buttons = require('./buttons');

var _DateShortcuts = require('./DateShortcuts');

var _DateShortcuts2 = _interopRequireDefault(_DateShortcuts);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DueDate = function (_Component) {
  (0, _inherits3.default)(DueDate, _Component);

  function DueDate() {
    (0, _classCallCheck3.default)(this, DueDate);
    return (0, _possibleConstructorReturn3.default)(this, _Component.apply(this, arguments));
  }

  DueDate.prototype.render = function render() {
    var _this2 = this;

    var cls = _utils.CSSUtils.cls({
      'due-date': true
    }, this.props.className);

    return _react2.default.createElement(
      'div',
      { className: cls },
      _react2.default.createElement(_DateShortcuts2.default, {
        value: this.props.value,
        onChange: function onChange(mom) {
          return _this2.setDueDate(mom);
        }
      }),
      _react2.default.createElement(_forms.DatePicker, {
        value: this.props.value,
        onChange: function onChange(date) {
          return _this2.handleChange(date);
        }
      }),
      this.renderClear()
    );
  };

  DueDate.prototype.renderClear = function renderClear() {
    var _this3 = this;

    if (!this.props.value) {
      return null;
    }

    return _react2.default.createElement(
      _buttons.IconButton,
      { icon: 'times', block: true, onClick: function onClick() {
          return _this3.clearDueDate();
        } },
      (0, _signavioI18n2.default)('Clear due date')
    );
  };

  DueDate.prototype.handleChange = function handleChange(date) {
    this.props.onChange((0, _moment2.default)(date).endOf('day').toISOString());
  };

  DueDate.prototype.clearDueDate = function clearDueDate() {
    this.props.onChange(null);
  };

  DueDate.prototype.setDueDate = function setDueDate(mom) {
    this.props.onChange(mom.toISOString());
  };

  return DueDate;
}(_react.Component);

DueDate.propTypes = {
  value: _propTypes2.default.string,
  onChange: _propTypes2.default.func,
  className: _propTypes2.default.string
};
exports.default = DueDate;


// WEBPACK FOOTER //
// ./packages/commons/lib/components/DueDate.js