'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _recompose = require('recompose');

var _effektifApi = require('@signavio/effektif-api');

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _components = require('@signavio/effektif-commons/lib/components');

var _hints = require('@signavio/effektif-commons/lib/components/hints');

var _buttons = require('@signavio/effektif-commons/lib/components/buttons');

var _components2 = require('../components');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Purchase(_ref) {
  var purchase = _ref.purchase,
      onPurchase = _ref.onPurchase;

  var requiresAction = !purchase.pending && !purchase.fulfilled && !purchase.rejected;

  return _react2.default.createElement(
    'div',
    { className: 'purchase' },
    _react2.default.createElement(
      'div',
      { className: 'row' },
      _react2.default.createElement(
        'div',
        { className: 'col-sm-3' },
        _react2.default.createElement(_components2.License, { condensed: true, type: 'academic' })
      ),
      _react2.default.createElement(
        'div',
        { className: 'col-sm-9' },
        purchase.rejected && _react2.default.createElement(
          _hints.Hint,
          { danger: true, view: true },
          (0, _signavioI18n2.default)('We could not process your purchase for the following reason: \n\n__reason__\n\nPlease try again or contact our support at [support@signavio.com](mailto:support@signavio.com).', {
            markdown: true,
            reason: purchase.reason
          })
        ),
        purchase.fulfilled && _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            _hints.Hint,
            { info: true, view: true },
            (0, _signavioI18n2.default)('You successfully registered for the academic version.')
          ),
          _react2.default.createElement(
            _buttons.LinkButton,
            { to: (0, _effektifApi.prependOrg)('/tasks') },
            (0, _signavioI18n2.default)('Go to inbox')
          )
        ),
        requiresAction && _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            _hints.Hint,
            { info: true, view: true },
            (0, _signavioI18n2.default)('Because this version is free, we do not need any further information from you. Enjoy!')
          ),
          _react2.default.createElement(
            'div',
            { style: { textAlign: 'center' } },
            _react2.default.createElement(
              _buttons.IconButton,
              { primary: true, icon: 'check', onClick: onPurchase },
              (0, _signavioI18n2.default)('Finish registration')
            )
          )
        )
      )
    ),
    purchase.pending && _react2.default.createElement(
      _components.Modal,
      null,
      _react2.default.createElement(
        _hints.Hint,
        { loading: true },
        (0, _signavioI18n2.default)('Completing your purchase...')
      )
    )
  );
}

exports.default = (0, _recompose.compose)((0, _effektifApi.connect)(function () {
  return {
    purchase: {
      type: _effektifApi.types.PURCHASE,
      method: 'create'
    }
  };
}), (0, _recompose.withHandlers)({
  onPurchase: function onPurchase(_ref2) {
    var purchase = _ref2.purchase;
    return function () {
      return purchase({
        licenseType: 'academic',
        billingType: 'none'
      });
    };
  }
}))(Purchase);


// WEBPACK FOOTER //
// ./packages/organizations/lib/licenses/containers/Purchase.js