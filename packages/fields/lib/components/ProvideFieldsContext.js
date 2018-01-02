'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FIELDS_CONTEXT_CHANNEL = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _recompose = require('recompose');

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _reactBroadcast = require('react-broadcast');

var _effektifApi = require('@signavio/effektif-api');

var _hints = require('@signavio/effektif-commons/lib/components/hints');

var _dataTypes = require('../dataTypes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FIELDS_CONTEXT_CHANNEL = exports.FIELDS_CONTEXT_CHANNEL = 'FIELDS_CONTEXT_CHANNEL';

// Provides variables and dataTypeDescriptors as a broadcast
// `dataTypeDescriptors` is optional, if it is not provided the dataTypeDescriptors will be fetched
// from the API endpoint (or read from cache)

var ProvideFieldsContext = function ProvideFieldsContext(_ref) {
  var dataTypeDescriptors = _ref.dataTypeDescriptors,
      fetchDataTypeDescriptors = _ref.fetchDataTypeDescriptors,
      variables = _ref.variables,
      children = _ref.children;

  var _ref2 = fetchDataTypeDescriptors || {},
      pending = _ref2.pending,
      rejected = _ref2.rejected,
      reason = _ref2.reason,
      value = _ref2.value;

  if (!dataTypeDescriptors && pending) {
    return _react2.default.createElement(
      _hints.Hint,
      { loading: true },
      (0, _signavioI18n2.default)('Loading...')
    );
  }

  if (!dataTypeDescriptors && rejected) {
    return _react2.default.createElement(
      _hints.Hint,
      { danger: true },
      'Could not load data type descriptors',
      _react2.default.createElement(
        'p',
        null,
        reason
      )
    );
  }

  return _react2.default.createElement(
    _reactBroadcast.Broadcast,
    {
      channel: FIELDS_CONTEXT_CHANNEL,
      value: {
        variables: variables,
        dataTypeDescriptors: dataTypeDescriptors || (0, _dataTypes.initDefaults)(value) || []
      }
    },
    _react.Children.only(children)
  );
};

function identity(c) {
  return c;
}

exports.default = (0, _recompose.branch)(function (_ref3) {
  var dataTypeDescriptors = _ref3.dataTypeDescriptors;
  return !!dataTypeDescriptors;
}, identity, (0, _effektifApi.connect)(function () {
  return {
    fetchDataTypeDescriptors: { type: _effektifApi.types.DATA_TYPE_DESCRIPTORS }
  };
}))(ProvideFieldsContext);


// WEBPACK FOOTER //
// ./packages/fields/lib/components/ProvideFieldsContext.js