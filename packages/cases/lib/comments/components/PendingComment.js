'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _hints = require('@signavio/effektif-commons/lib/components/hints');

var _styles = require('@signavio/effektif-commons/lib/styles');

var _events = require('../../events');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function PendingComment(_ref) {
  var comment = _ref.comment,
      style = _ref.style;

  return _react2.default.createElement(
    'div',
    style,
    _react2.default.createElement(_events.Event, { style: style('event'), event: comment }),
    _react2.default.createElement(
      _hints.Hint,
      { loading: true, style: style('message') },
      (0, _signavioI18n2.default)('Adding comment...')
    )
  );
}


var styled = (0, _styles.defaultStyle)(function () {
  return {
    position: 'relative',

    event: {
      filter: 'blur(10px)'
    },

    message: {
      position: 'absolute',

      top: 0,

      width: '100%'
    }
  };
});

exports.default = styled(PendingComment);


// WEBPACK FOOTER //
// ./packages/cases/lib/comments/components/PendingComment.js