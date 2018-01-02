'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _recompose = require('recompose');

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _effektifCommons = require('@signavio/effektif-commons');

var _organizations = require('../../higher-order/organizations');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function SystemInformation(_ref) {
  var browser = _ref.browser,
      includeInfos = _ref.includeInfos,
      organization = _ref.organization,
      page = _ref.page,
      user = _ref.user,
      version = _ref.version;

  return _react2.default.createElement(
    'table',
    {
      className: 'table table-bordered',
      style: { opacity: includeInfos ? 1 : 0.3 }
    },
    _react2.default.createElement(
      'tbody',
      null,
      _react2.default.createElement(Row, { name: (0, _signavioI18n2.default)('Organization'), value: organization.name }),
      _react2.default.createElement(Row, { name: (0, _signavioI18n2.default)('User'), value: _organizations.userUtils.name(user) }),
      _react2.default.createElement(Row, {
        name: (0, _signavioI18n2.default)('__applicationName__ version', { applicationName: _effektifCommons.applicationName }),
        value: version
      }),
      _react2.default.createElement(Row, { name: (0, _signavioI18n2.default)('Browser'), value: browser }),
      _react2.default.createElement(Row, { name: (0, _signavioI18n2.default)('CurrentPage'), value: page })
    )
  );
}


function Row(_ref2) {
  var name = _ref2.name,
      value = _ref2.value;

  return _react2.default.createElement(
    'tr',
    null,
    _react2.default.createElement(
      'th',
      null,
      name
    ),
    _react2.default.createElement(
      'td',
      null,
      _react2.default.createElement(
        'div',
        { className: 'wrapper' },
        value
      )
    )
  );
}

exports.default = (0, _recompose.compose)(_organizations.withOrganization, _organizations.withUser)(SystemInformation);


// WEBPACK FOOTER //
// ./packages/api/lib/components/feedback/SystemInformation.js