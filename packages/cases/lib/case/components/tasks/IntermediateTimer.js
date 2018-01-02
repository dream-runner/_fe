'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _recompose = require('recompose');

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _components = require('@signavio/effektif-commons/lib/components');

var _extensions = require('@signavio/effektif-commons/lib/extensions');

var _hints = require('@signavio/effektif-commons/lib/components/hints');

var _tiles = require('@signavio/effektif-commons/lib/components/tiles');

var _styles = require('@signavio/effektif-commons/lib/styles');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var IntermediateTimer = function IntermediateTimer(_ref) {
  var executionTime = _ref.executionTime,
      name = _ref.name,
      onSkip = _ref.onSkip,
      readOnly = _ref.readOnly,
      style = _ref.style;
  return _react2.default.createElement(
    _tiles.TextTile,
    {
      header: _react2.default.createElement('i', (0, _extends3.default)({}, style('icon'), {
        className: style('icon').className + ' icon-bpmn icon-intermediate-event-catch-timer'
      })),
      subtitle: (0, _signavioI18n2.default)('Waits until __executionTime__', {
        executionTime: (0, _extensions.moment)(executionTime).format('LLL')
      }),
      toolbar: !readOnly && _react2.default.createElement(
        _components.Popover,
        {
          popover: (0, _signavioI18n2.default)('Skip this timer and continue right away'),
          small: true,
          trigger: 'hover'
        },
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(_components.Remove, { icon: 'skip-forward', onRemove: onSkip })
        )
      )
    },
    name || _react2.default.createElement(
      _hints.Hint,
      { inline: true },
      (0, _signavioI18n2.default)('Timer')
    )
  );
};

exports.default = (0, _recompose.compose)((0, _styles.defaultStyle)(function (theme) {
  return {
    icon: {
      backgroundColor: theme.color.mono.light,
      paddingTop: theme.padding.small,
      paddingBottom: theme.padding.small,
      width: _styles.utils.calculateIconSize(theme),
      textAlign: 'center',
      display: 'inline-block',
      fontSize: theme.font.size.xlarge,
      lineHeight: _styles.utils.calculateAbsoluteLineHeight(theme.font.size.normal, theme.lineHeight) + 'px'
    }
  };
}), (0, _recompose.withHandlers)({
  onSkip: function onSkip(_ref2) {
    var id = _ref2.id,
        type = _ref2.type,
        onCreateAction = _ref2.onCreateAction;
    return function () {
      onCreateAction({
        id: id,
        type: type,
        body: {
          type: 'skipTimer'
        }
      });
    };
  }
}))(IntermediateTimer);


// WEBPACK FOOTER //
// ./packages/cases/lib/case/components/tasks/IntermediateTimer.js