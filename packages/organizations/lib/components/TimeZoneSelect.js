'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _recompose = require('recompose');

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _extensions = require('@signavio/effektif-commons/lib/extensions');

var _utils = require('@signavio/effektif-commons/lib/utils');

var _components = require('@signavio/effektif-commons/lib/components');

var _forms = require('@signavio/effektif-commons/lib/components/forms');

var _tiles = require('@signavio/effektif-commons/lib/components/tiles');

var _buttons = require('@signavio/effektif-commons/lib/components/buttons');

var _effektifApi = require('@signavio/effektif-api');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function TimeZoneSelect(_ref) {
  var value = _ref.value,
      labelId = _ref.labelId,
      organization = _ref.organization,
      onChange = _ref.onChange,
      onOverride = _ref.onOverride,
      onDefault = _ref.onDefault;

  if (!value) {
    if (organization.timeZone) {
      return _react2.default.createElement(
        _tiles.TextTile,
        {
          toolbar: _react2.default.createElement(
            _buttons.TextButton,
            { onClick: onOverride },
            (0, _signavioI18n2.default)('Change')
          )
        },
        organization.timeZone.replace(/_/g, ' '),
        _react2.default.createElement(
          _components.ContextHelp,
          null,
          (0, _signavioI18n2.default)('You are using your organizations default timezone.')
        )
      );
    }

    if (_utils.DateUtils.currentTimezone()) {
      return _react2.default.createElement(
        _tiles.TextTile,
        {
          toolbar: _react2.default.createElement(
            _buttons.TextButton,
            { primary: true, onClick: onDefault },
            (0, _signavioI18n2.default)('Use'),
            _react2.default.createElement(
              _components.ContextHelp,
              null,
              (0, _signavioI18n2.default)('We guessed that timezone. In order to use it throughout the system please apply it first.')
            )
          )
        },
        _utils.DateUtils.currentTimezone()
      );
    }
  }

  return _react2.default.createElement(_components.Select, {
    id: labelId,
    options: getTimeZones(),
    placeholder: (0, _signavioI18n2.default)('Your timezone'),
    value: value,
    onChange: onChange
  });
}


var getTimeZones = function getTimeZones() {
  return (0, _lodash.reduce)(_extensions.moment.tz.names(), function (zones, zone) {
    if (zone.indexOf('/') === -1) {
      return zones;
    }

    return [].concat((0, _toConsumableArray3.default)(zones), [{
      id: zone,
      value: zone.replace(/_/g, ' ')
    }]);
  }, []);
};

exports.default = (0, _recompose.compose)(_effektifApi.withOrganization, (0, _recompose.withHandlers)({
  onChange: function (_onChange) {
    function onChange(_x) {
      return _onChange.apply(this, arguments);
    }

    onChange.toString = function () {
      return _onChange.toString();
    };

    return onChange;
  }(function (_ref2) {
    var onChange = _ref2.onChange;
    return function (timeZone) {
      return onChange(timeZone);
    };
  }),
  onOverride: function onOverride(_ref3) {
    var onChange = _ref3.onChange,
        organization = _ref3.organization;
    return function () {
      return onChange(organization.timeZone);
    };
  },
  onDefault: function onDefault(_ref4) {
    var onChange = _ref4.onChange;
    return function () {
      return onChange(_utils.DateUtils.currentTimezone());
    };
  }
}), _forms.withLabel)(TimeZoneSelect);


// WEBPACK FOOTER //
// ./packages/organizations/lib/components/TimeZoneSelect.js