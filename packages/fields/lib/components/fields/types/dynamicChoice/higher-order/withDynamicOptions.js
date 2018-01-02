'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

exports.default = withDynamicOptions;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _recompose = require('recompose');

var _effektifApi = require('@signavio/effektif-api');

var _components = require('@signavio/effektif-commons/lib/components');

var _hints = require('@signavio/effektif-commons/lib/components/hints');

var _fieldTypes = require('../../../../../fieldTypes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function withDynamicOptions(WrappedComponent) {
  function LoadDynamicOptions(_ref) {
    var fetchOptions = _ref.fetchOptions,
        rest = (0, _objectWithoutProperties3.default)(_ref, ['fetchOptions']);

    if (fetchOptions.pending) {
      return _react2.default.createElement(
        _hints.Hint,
        { loading: true, inline: true },
        (0, _signavioI18n2.default)('Loading options...')
      );
    }

    if (fetchOptions.rejected) {
      return _react2.default.createElement(
        _hints.Hint,
        { danger: true },
        (0, _signavioI18n2.default)('Could not load options: __reason__', {
          reason: fetchOptions.reason
        })
      );
    }

    return _react2.default.createElement(WrappedComponent, (0, _extends3.default)({}, rest, { type: (0, _fieldTypes.choiceType)(fetchOptions.value) }));
  }

  return (0, _recompose.compose)((0, _recompose.getContext)({
    account: _propTypes2.default.shape({
      id: _propTypes2.default.string.isRequired
    }),
    service: _propTypes2.default.shape({
      id: _propTypes2.default.string.isRequired
    })
  }), (0, _effektifApi.connect)(function (_ref2) {
    var service = _ref2.service,
        account = _ref2.account,
        type = _ref2.type;
    return {
      fetchOptions: {
        type: _effektifApi.types.DYNAMIC_OPTIONS,
        query: {
          serviceId: service.id,
          accountId: account.id,
          optionsKey: type.optionsKey
        }
      }
    };
  }), (0, _components.omitProps)(['account', 'service']))(LoadDynamicOptions);
}


// WEBPACK FOOTER //
// ./packages/fields/lib/components/fields/types/dynamicChoice/higher-order/withDynamicOptions.js