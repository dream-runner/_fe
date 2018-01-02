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

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _ = require('..');

var _buttons = require('../buttons');

var _tiles = require('../tiles');

var _styles = require('../../styles');

var _propTypes = require('../../propTypes');

var _extensions = require('./extensions');

var extensions = _interopRequireWildcard(_extensions);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Renders a single log entry which consists at least of a type and a message.
 * If the log entry contains additional context information like a stack trace,
 * this information is rendered into a collapsed panel.
 */
var LogEntry = function (_Component) {
  (0, _inherits3.default)(LogEntry, _Component);

  function LogEntry() {
    (0, _classCallCheck3.default)(this, LogEntry);

    var _this = (0, _possibleConstructorReturn3.default)(this, _Component.apply(this, arguments));

    _this.state = {
      expanded: false
    };
    return _this;
  }

  LogEntry.prototype.render = function render() {
    var _this2 = this;

    var log = this.props.log;

    if (this.hasExtension(log)) {
      return _react2.default.createElement(
        _.Collapsible,
        {
          expanded: this.state.expanded,
          onToggle: function onToggle() {
            _this2.setState({ expanded: !_this2.state.expanded });
          },
          header: this.renderHeader(true)
        },
        this.renderExtensions(log)
      );
    }
    return this.renderHeader(false);
  };

  LogEntry.prototype.getIcon = function getIcon(type) {
    switch (type) {
      case 'debug':
      // reuse info for now
      case 'info':
        return 'info';
      case 'warn':
        return 'notification';
      case 'error':
        return 'times-circle';
    }
    return 'question-circle';
  };

  LogEntry.prototype.renderHeader = function renderHeader(hasContent) {
    var _props = this.props,
        log = _props.log,
        rest = (0, _objectWithoutProperties3.default)(_props, ['log']);

    var icon = this.getIcon(log.type);
    return _react2.default.createElement(
      _tiles.TextTile,
      {
        style: rest.style,
        icon: icon,
        toolbar: this.renderToolbar(hasContent)
      },
      log.message
    );
  };

  LogEntry.prototype.renderToolbar = function renderToolbar(hasContent) {
    if (!hasContent) {
      return;
    }
    var icon = this.state.expanded ? 'fa-angle-up' : 'fa-angle-down';
    return _react2.default.createElement(_buttons.IconButton, { iconSet: 'fontAwesome', icon: icon });
  };

  LogEntry.prototype.renderExtensions = function renderExtensions(log) {
    var _this3 = this;

    var validExtensions = this.getExtensions(log);
    if (validExtensions.length === 1) {
      return this.renderExtension(validExtensions[0], log);
    } else if (validExtensions.length > 1) {
      return _react2.default.createElement(
        'div',
        null,
        (0, _lodash.map)(validExtensions, function (ext) {
          return _this3.renderExtension(ext, log);
        })
      );
    }
  };

  LogEntry.prototype.renderExtension = function renderExtension(extension, log) {
    var Extension = extensions[extension];

    return _react2.default.createElement(Extension, { model: log.context[extension] });
  };

  LogEntry.prototype.getExtensions = function getExtensions(log) {
    if (log.context) {
      var validExtensions = (0, _lodash.filter)((0, _lodash.keys)(log.context), function (key) {
        return !!extensions[key];
      });
      return validExtensions;
    }
    return [];
  };

  LogEntry.prototype.hasExtension = function hasExtension(log) {
    return this.getExtensions(log).length > 0;
  };

  return LogEntry;
}(_react.Component);

LogEntry.propTypes = {
  log: _propTypes.Log
  // alternatives for colors
  //"#d3353c" --> error
  //"#d3cc35" --> warn
  //"#358bd3", --> info
};var styled = (0, _styles.defaultStyle)(function (theme) {
  return {
    '&error': {
      icon: {
        backgroundColor: theme.color.status.danger,
        color: _styles.utils.color(theme.color.status.danger)
      }
    },
    '&warn': {
      icon: {
        backgroundColor: theme.color.status.warning,
        color: _styles.utils.color(theme.color.status.warning)
      }
    },
    '&info': {
      icon: {
        backgroundColor: '#358bd3',
        color: _styles.utils.color('#358bd3')
      }
    }
  };
}, function (_ref) {
  var type = _ref.log.type;
  return {
    '&debug': type === 'debug',
    '&info': type === 'info',
    '&warn': type === 'warn',
    '&error': type === 'error'
  };
});

exports.default = styled(LogEntry);


// WEBPACK FOOTER //
// ./packages/commons/lib/components/logs/LogEntry.js