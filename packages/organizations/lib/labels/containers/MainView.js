'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _effektifApi = require('@signavio/effektif-api');

var _hints = require('@signavio/effektif-commons/lib/components/hints');

var _Main = require('../components/Main');

var _Main2 = _interopRequireDefault(_Main);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function MainViewContainer(_ref) {
  var fetchLabels = _ref.fetchLabels;

  if (fetchLabels.pending) {
    return _react2.default.createElement(
      _hints.Hint,
      { loading: true },
      (0, _signavioI18n2.default)('Loading labels...')
    );
  }

  if (fetchLabels.rejected) {
    return _react2.default.createElement(
      _hints.Hint,
      { danger: true },
      _react2.default.createElement(
        'p',
        null,
        (0, _signavioI18n2.default)('There was an error loading the labels: __reason__', {
          reason: fetchLabels.reason
        })
      )
    );
  }

  return _react2.default.createElement(_Main2.default, { labels: fetchLabels.value });
}

exports.default = (0, _effektifApi.connect)({
  fetchLabels: {
    type: _effektifApi.types.LABELS
  }
})(MainViewContainer);


// WEBPACK FOOTER //
// ./packages/organizations/lib/labels/containers/MainView.js