'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLanguage = undefined;

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _recompose = require('recompose');

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _components = require('@signavio/effektif-commons/lib/components');

var _Country = require('./Country');

var _Country2 = _interopRequireDefault(_Country);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var countries = require('i18n-iso-countries');

var getCountries = (0, _lodash.memoize)(function (language) {
  return (0, _lodash.sortBy)((0, _lodash.map)(countries.getNames(language), function (country, key) {
    return {
      id: key,
      value: country
    };
  }), 'value');
});

var getLanguage = exports.getLanguage = function getLanguage(locale) {
  var _locale$split = locale.split('_'),
      _locale$split2 = (0, _slicedToArray3.default)(_locale$split, 1),
      language = _locale$split2[0];

  return (0, _lodash.includes)(countries.langs(), language) ? language : 'en';
};

exports.default = (0, _recompose.compose)((0, _recompose.withHandlers)({
  renderSelection: function renderSelection(_ref) {
    var value = _ref.value;
    return function () {
      var language = getLanguage((0, _signavioI18n.locale)());

      return _react2.default.createElement(
        _Country2.default,
        { countryCode: value },
        countries.getName(value, language)
      );
    };
  },
  renderItem: function renderItem() {
    return function (_ref2) {
      var id = _ref2.id,
          value = _ref2.value;
      return _react2.default.createElement(
        _Country2.default,
        { transparent: true, countryCode: id },
        value
      );
    };
  }
}), (0, _recompose.withProps)(function () {
  var language = getLanguage((0, _signavioI18n.locale)());

  return {
    options: getCountries(language),
    placeholder: (0, _signavioI18n2.default)('Country*')
  };
}))(_components.Select);


// WEBPACK FOOTER //
// ./packages/organizations/lib/users/components/CountrySelect.js