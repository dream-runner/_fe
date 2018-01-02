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

var _lodash = require('lodash');

var _moment = require('../extensions/moment');

var _moment2 = _interopRequireDefault(_moment);

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

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.renderShortcuts = function () {
      return (0, _lodash.map)([(0, _moment2.default)().endOf('day'), (0, _moment2.default)().endOf('day').add(1, 'days'), (0, _moment2.default)().endOf('day').add(2, 'days'), (0, _moment2.default)().endOf('day').add(3, 'days'), (0, _moment2.default)().endOf('day').add(1, 'weeks'), (0, _moment2.default)().endOf('day').add(2, 'weeks'), (0, _moment2.default)().endOf('day').add(1, 'month')], _this.renderShortcut);
    }, _this.renderShortcut = function (mom, i) {
      var cls = _utils.CSSUtils.cls({
        shortcut: true,
        clearfix: true,
        selected: mom.isSame((0, _moment2.default)(_this.props.value), 'day')
      });

      return _react2.default.createElement(
        'li',
        { key: i, className: cls, onClick: _this.handleClick.bind(null, mom) },
        _react2.default.createElement(
          'span',
          { className: 'pull-left' },
          _utils.StringUtils.capitalizeFirst(getDateShortcutName(mom))
        ),
        i > 1 && _react2.default.createElement(
          'small',
          { className: 'pull-right' },
          mom.calendar(true)
        )
      );
    }, _this.handleClick = function (mom) {
      if (_this.props.onChange) {
        _this.props.onChange(mom);
      }
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  _class.prototype.render = function render() {
    return _react2.default.createElement(
      'ul',
      { className: 'date-shortcuts' },
      this.renderShortcuts()
    );
  };

  return _class;
}(_react2.default.Component);

_class.displayName = 'DateShortcuts';
_class.propTypes = {
  value: _propTypes2.default.string,
  onChange: _propTypes2.default.func
};
exports.default = _class;


function getDateShortcutName(mom) {
  var diff = mom.clone().startOf('day').diff((0, _moment2.default)().utcOffset(mom.utcOffset()).startOf('day'), 'days', true);

  if (Math.abs(diff) < 2) {
    return mom.calendar(true);
  }

  return mom.fromNow({ withoutTime: true });
}


// WEBPACK FOOTER //
// ./packages/commons/lib/components/DateShortcuts.js