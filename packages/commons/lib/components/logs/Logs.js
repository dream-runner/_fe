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

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _ = require('..');

var _tabs = require('../tabs');

var _styles = require('../../styles');

var _LogEntry = require('./LogEntry');

var _LogEntry2 = _interopRequireDefault(_LogEntry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getTabs = function getTabs(logs) {
  var tabs = [{ id: 'all', title: (0, _signavioI18n2.default)('All') }, { id: 'error', title: (0, _signavioI18n2.default)('Error') }, { id: 'warn', title: (0, _signavioI18n2.default)('Warning') }, { id: 'info', title: (0, _signavioI18n2.default)('Info') }, { id: 'debug', title: (0, _signavioI18n2.default)('Debug') }];

  var counts = (0, _extends3.default)({
    all: logs.length

  }, (0, _lodash.countBy)(logs, 'type'));

  // only show tabs which have entries
  // and add the count as well
  return tabs.reduce(function (result, tab) {
    if (!counts[tab.id]) {
      return result;
    }

    return [].concat((0, _toConsumableArray3.default)(result), [(0, _extends3.default)({}, tab, { count: counts[tab.id] })]);
  }, []);
};

var getLogs = function getLogs(logs, activeTab) {
  if (activeTab === 'all') {
    return logs;
  }

  return (0, _lodash.filter)(logs, function (log) {
    return log.type === activeTab;
  });
};

/**
 * A simple tabbed component which shows a list of log entries and allows to filter them by type.
 */

var Logs = function (_Component) {
  (0, _inherits3.default)(Logs, _Component);

  function Logs() {
    (0, _classCallCheck3.default)(this, Logs);

    var _this = (0, _possibleConstructorReturn3.default)(this, _Component.apply(this, arguments));

    _this.state = {
      activeTab: 'all'
    };
    return _this;
  }

  Logs.prototype.render = function render() {
    var _this2 = this;

    var _props = this.props,
        logs = _props.logs,
        rest = (0, _objectWithoutProperties3.default)(_props, ['logs']);
    var activeTab = this.state.activeTab;


    var tabs = getTabs(logs);
    var entries = getLogs(logs, activeTab);

    return _react2.default.createElement(
      'div',
      rest,
      tabs.length > 0 && _react2.default.createElement(
        _tabs.TabBar,
        { style: { marginBottom: _styles.padding.normal } },
        tabs.map(function (_ref) {
          var id = _ref.id,
              count = _ref.count,
              title = _ref.title;
          return _react2.default.createElement(
            _tabs.Tab,
            {
              active: activeTab === id,
              onClick: function onClick() {
                _this2.setState({ activeTab: id });
              }
            },
            title + ' (' + count + ')'
          );
        })
      ),
      entries.length === 0 ? _react2.default.createElement(
        'div',
        null,
        (0, _signavioI18n2.default)('No log entries found')
      ) : _react2.default.createElement(
        _.List,
        null,
        entries.map(function (logEntry) {
          return _react2.default.createElement(_LogEntry2.default, { log: logEntry });
        })
      )
    );
  };

  return Logs;
}(_react.Component);

exports.default = Logs;


Logs.propTypes = {
  logs: _propTypes2.default.array
};

Logs.defaultProps = {
  logs: []
};


// WEBPACK FOOTER //
// ./packages/commons/lib/components/logs/Logs.js