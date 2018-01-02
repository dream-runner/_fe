'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _extensions = require('@signavio/effektif-commons/lib/extensions');

var _hints = require('@signavio/effektif-commons/lib/components/hints');

var _tiles = require('@signavio/effektif-commons/lib/components/tiles');

var _buttons = require('@signavio/effektif-commons/lib/components/buttons');

var _styles = require('@signavio/effektif-commons/lib/styles');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function LastUpdated(_ref) {
  var lastUpdated = _ref.lastUpdated,
      onRefreshTasks = _ref.onRefreshTasks,
      pending = _ref.pending,
      style = _ref.style;

  return _react2.default.createElement(
    'div',
    style,
    _react2.default.createElement(
      _tiles.TextTile,
      {
        small: true,
        transparent: true,
        toolbar: !pending && _react2.default.createElement(
          _buttons.LinkButton,
          { small: true, onClick: onRefreshTasks },
          (0, _signavioI18n2.default)('Refresh')
        )
      },
      pending ? _react2.default.createElement(
        _hints.Hint,
        { inline: true, loading: true, small: true },
        (0, _signavioI18n2.default)('Looking for new tasks...')
      ) : (0, _signavioI18n2.default)('Last updated at __lastUpdated__.', {
        lastUpdated: (0, _extensions.moment)(lastUpdated).format('LTS')
      })
    )
  );
}


var styled = (0, _styles.defaultStyle)(function (_ref2) {
  var font = _ref2.font,
      padding = _ref2.padding,
      color = _ref2.color;
  return {
    display: 'inline-block',

    fontSize: font.size.form,
    color: color.mono.dark
  };
});

exports.default = styled(LastUpdated);


// WEBPACK FOOTER //
// ./packages/cases/lib/task/components/LastUpdated.js