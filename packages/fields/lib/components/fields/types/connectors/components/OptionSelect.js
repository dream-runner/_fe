'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _recompose = require('recompose');

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _effektifApi = require('@signavio/effektif-api');

var _reactForms = require('@signavio/react-forms');

var _forms = require('@signavio/effektif-commons/lib/components/forms');

var _hints = require('@signavio/effektif-commons/lib/components/hints');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getMessage = function getMessage(_ref) {
  var pending = _ref.pending,
      rejected = _ref.rejected,
      reason = _ref.reason,
      fulfilled = _ref.fulfilled;

  if (rejected) {
    return _react2.default.createElement(
      _hints.Hint,
      { danger: true, inline: true },
      reason
    );
  }

  if (!fulfilled || pending) {
    return _react2.default.createElement(
      _hints.Hint,
      { loading: true, inline: true },
      (0, _signavioI18n2.default)('Fetching...')
    );
  }

  return (0, _signavioI18n2.default)('No matching value found');
};

function EditConnectorReference(_ref2) {
  var value = _ref2.value,
      fetchOptions = _ref2.fetchOptions,
      type = _ref2.type,
      valueDisplay = _ref2.valueDisplay,
      onSearch = _ref2.onSearch,
      onChange = _ref2.onChange;

  var optionsLoaded = fetchOptions.fulfilled && !fetchOptions.pending;
  var options = fetchOptions.value;

  return _react2.default.createElement(
    _forms.DropdownSelect,
    {
      value: value,
      emptyMessage: getMessage(fetchOptions),
      matchString: True,
      valueDisplay: valueDisplay,
      onSearch: onSearch,
      onChange: onChange
    },
    optionsLoaded && (0, _lodash.map)(options, function (option) {
      return _react2.default.createElement(_forms.Option, { key: option.id, value: option, name: option.name });
    })
  );
}

var True = function True() {
  return true;
};

exports.default = (0, _recompose.compose)((0, _recompose.withState)('search', 'onSearch'), (0, _effektifApi.connect)(function (_ref3) {
  var search = _ref3.search,
      type = _ref3.type;
  return {
    fetchOptions: {
      type: _effektifApi.types.CONNECTOR_DATA_SOURCE_OPTIONS,
      query: {
        connectorDataSourceId: type.id,
        search: search
      },
      lazy: true
    }
  };
}), (0, _reactForms.withAsyncHandlers)({
  debouncedFetch: function debouncedFetch(_ref4) {
    var fetchOptions = _ref4.fetchOptions;
    return function () {
      if (!fetchOptions.fulfilled && !fetchOptions.pending) {
        fetchOptions();
      }
    };
  }
}, function (handler) {
  return (0, _lodash.debounce)(handler, 500);
}), (0, _recompose.withHandlers)({
  onSearch: function onSearch(_ref5) {
    var _onSearch = _ref5.onSearch,
        debouncedFetch = _ref5.debouncedFetch;
    return function (search) {
      _onSearch(search);
      debouncedFetch();
    };
  }
}), (0, _reactForms.omitProps)(['search', 'debouncedFetch']))(EditConnectorReference);


// WEBPACK FOOTER //
// ./packages/fields/lib/components/fields/types/connectors/components/OptionSelect.js