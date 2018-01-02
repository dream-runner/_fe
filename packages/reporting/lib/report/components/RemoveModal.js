'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _components = require('@signavio/effektif-commons/lib/components');

var _buttons = require('@signavio/effektif-commons/lib/components/buttons');

var _grid = require('@signavio/effektif-commons/lib/components/grid');

var _hints = require('@signavio/effektif-commons/lib/components/hints');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RemoveModal = function RemoveModal(props) {
  return _react2.default.createElement(
    _components.Modal,
    {
      title: (0, _signavioI18n2.default)('Delete this report?'),
      footer: _react2.default.createElement(Footer, props),
      className: 'modal-danger modal-confirm modal-delete',
      onRequestHide: props.onCancel
    },
    _react2.default.createElement(
      _hints.Hint,
      { warning: true },
      (0, _signavioI18n2.default)('Are you sure you want to delete this report? This action cannot be undone.')
    )
  );
};

var Footer = function Footer(_ref) {
  var onCancel = _ref.onCancel,
      onConfirm = _ref.onConfirm;
  return _react2.default.createElement(
    _grid.Row,
    { noPadding: true },
    _react2.default.createElement(
      _grid.Col,
      { md: 6 },
      _react2.default.createElement(
        _buttons.TextButton,
        { block: true, onClick: onCancel },
        (0, _signavioI18n2.default)('Cancel')
      )
    ),
    _react2.default.createElement(
      _grid.Col,
      { md: 6 },
      _react2.default.createElement(
        _buttons.TextButton,
        { danger: true, block: true, onClick: onConfirm },
        (0, _signavioI18n2.default)('Delete')
      )
    )
  );
};

exports.default = RemoveModal;


// WEBPACK FOOTER //
// ./packages/reporting/lib/report/components/RemoveModal.js