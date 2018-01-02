'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = CaseActions;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _components = require('@signavio/effektif-commons/lib/components');

var _CloseCase = require('./CloseCase');

var _CloseCase2 = _interopRequireDefault(_CloseCase);

var _DeleteCase = require('./DeleteCase');

var _DeleteCase2 = _interopRequireDefault(_DeleteCase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function CaseActions(_ref) {
  var caze = _ref.caze,
      small = _ref.small,
      direction = _ref.direction,
      onCloseCase = _ref.onCloseCase,
      onDeleteCase = _ref.onDeleteCase;

  return _react2.default.createElement(
    _components.List,
    { direction: direction, equalWidths: direction === 'horizontal' },
    _react2.default.createElement(
      _components.Disable,
      {
        hint: (0, _signavioI18n2.default)('This case is already closed.'),
        disabled: !!caze.closed,
        placement: 'right'
      },
      _react2.default.createElement(_CloseCase2.default, { small: small, onClose: onCloseCase })
    ),
    _react2.default.createElement(_DeleteCase2.default, { small: small, onDelete: onDeleteCase })
  );
}


// WEBPACK FOOTER //
// ./packages/cases/lib/case/components/CaseActions.js