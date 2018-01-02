'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createEventList;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _styles = require('@signavio/effektif-commons/lib/styles');

var _components = require('@signavio/effektif-commons/lib/components');

var _hints = require('@signavio/effektif-commons/lib/components/hints');

var _extensions = require('@signavio/effektif-commons/lib/extensions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styled = (0, _styles.defaultStyle)(function (_ref) {
  var padding = _ref.padding,
      font = _ref.font,
      color = _ref.color;
  return {
    entry: {
      marginTop: padding.normal - padding.small
    },

    time: {
      fontSize: font.size.small,

      color: color.mono.lighter,

      marginTop: padding.small,
      marginBottom: padding.small,

      textAlign: 'center'
    }
  };
});

function createEventList(eventComponents) {
  function Events(_ref2) {
    var events = _ref2.events,
        style = _ref2.style;

    if (events.length === 0) {
      return _react2.default.createElement(
        _hints.Hint,
        null,
        (0, _signavioI18n2.default)('No events to show')
      );
    }

    var lastTime = void 0;

    return _react2.default.createElement(
      _components.List,
      { style: style },
      events.map(function (event) {
        var type = event.type,
            time = event.time;


        var Event = eventComponents[type];

        if (!Event) {
          console.error('Could not render event for type ' + type + '.');

          return null;
        }

        if (lastTime !== formatTime(time)) {
          lastTime = formatTime(time);

          return _react2.default.createElement(
            'div',
            { key: event.id },
            _react2.default.createElement(_components.Time, { hideIcon: true, time: time, format: 'LL', style: style('time') }),
            _react2.default.createElement(Event, { event: event })
          );
        }

        return _react2.default.createElement(Event, { key: event.id, event: event });
      })
    );
  }

  return styled(Events);
}

var isBeforeToday = function isBeforeToday(time) {
  return (0, _extensions.moment)(time).isBefore((0, _extensions.moment)().format('YYYY-MM-DD'));
};

var formatTime = function formatTime(time) {
  if (!isBeforeToday(time)) {
    return (0, _extensions.moment)(time).fromNow().replace(/./, function (t) {
      return t.toUpperCase();
    });
  }

  return (0, _extensions.moment)(time).format('LL');
};


// WEBPACK FOOTER //
// ./packages/events/lib/components/higher-order/createEventList.js