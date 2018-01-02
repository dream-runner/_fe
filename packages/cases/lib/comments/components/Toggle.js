'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _styles = require('@signavio/effektif-commons/lib/styles');

var _buttons = require('@signavio/effektif-commons/lib/components/buttons');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Toggle(_ref) {
  var replies = _ref.replies,
      rest = (0, _objectWithoutProperties3.default)(_ref, ['replies']);

  return _react2.default.createElement(
    _buttons.LinkButton,
    (0, _extends3.default)({ small: true }, rest),
    replies === 0 ? (0, _signavioI18n2.default)('Reply to this comment') : (0, _signavioI18n2.default)('Show __count__ reply', 'Show __count__ replies', {
      count: replies
    })
  );
}

var styled = (0, _styles.defaultStyle)({
  fontSize: _styles.font.size.small
});

exports.default = styled(Toggle);


// WEBPACK FOOTER //
// ./packages/cases/lib/comments/components/Toggle.js