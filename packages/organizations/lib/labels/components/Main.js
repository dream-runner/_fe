'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _components = require('@signavio/effektif-commons/lib/components');

var _hints = require('@signavio/effektif-commons/lib/components/hints');

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _Create = require('./Create');

var _Create2 = _interopRequireDefault(_Create);

var _Item = require('./Item');

var _Item2 = _interopRequireDefault(_Item);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Main = function Main(props) {
  return _react2.default.createElement(
    'div',
    { className: 'view labels-view' },
    _react2.default.createElement(
      _components.PageHeader,
      {
        hint: (0, _signavioI18n2.default)('Manage the labels that are available in your organization. These labels can then be used to categorize processes.')
      },
      (0, _signavioI18n2.default)('Process Labels')
    ),
    _react2.default.createElement(Labels, props),
    _react2.default.createElement(_components.Divider, null),
    _react2.default.createElement(_Create2.default, null)
  );
};

function Labels(_ref) {
  var labels = _ref.labels;

  if (!labels || labels.length === 0) {
    return _react2.default.createElement(
      _hints.Hint,
      null,
      (0, _signavioI18n2.default)('You have not created any labels yet.')
    );
  }

  return _react2.default.createElement(
    _components.List,
    null,
    labels.map(function (label) {
      return _react2.default.createElement(_Item2.default, (0, _extends3.default)({ key: label.id }, label));
    })
  );
}

exports.default = Main;


// WEBPACK FOOTER //
// ./packages/organizations/lib/labels/components/Main.js