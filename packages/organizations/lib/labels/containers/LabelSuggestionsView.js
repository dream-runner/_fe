'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _effektifApi = require('@signavio/effektif-api');

var _components = require('@signavio/effektif-commons/lib/components');

var _hints = require('@signavio/effektif-commons/lib/components/hints');

var _Suggestions = require('../components/Suggestions');

var _Suggestions2 = _interopRequireDefault(_Suggestions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LabelSuggestionsViewContainer = function LabelSuggestionsViewContainer(_ref) {
  var fetchLabels = _ref.fetchLabels,
      onChange = _ref.onChange,
      value = _ref.value,
      readOnly = _ref.readOnly;

  if (fetchLabels.rejected) {
    return _react2.default.createElement(
      _hints.Hint,
      { danger: true, inline: true },
      _react2.default.createElement(
        'p',
        null,
        (0, _signavioI18n2.default)('There was an error loading the labels: __reason__', {
          reason: fetchLabels.reason
        })
      )
    );
  }

  if (fetchLabels.pending) {
    return _react2.default.createElement(_components.Spinner, { small: true });
  }

  return _react2.default.createElement(_Suggestions2.default, {
    readOnly: readOnly,
    labels: fetchLabels.value || [],
    value: value,
    onChange: onChange
  });
};

exports.default = (0, _effektifApi.connect)({
  fetchLabels: {
    type: _effektifApi.types.LABELS
  }
})(LabelSuggestionsViewContainer);


// WEBPACK FOOTER //
// ./packages/organizations/lib/labels/containers/LabelSuggestionsView.js