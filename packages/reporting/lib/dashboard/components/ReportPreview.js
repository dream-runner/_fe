'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _effektifApi = require('@signavio/effektif-api');

var _utils = require('@signavio/effektif-commons/lib/utils');

var _tiles = require('@signavio/effektif-commons/lib/components/tiles');

var _components = require('@signavio/effektif-commons/lib/components');

var _buttons = require('@signavio/effektif-commons/lib/components/buttons');

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _types = require('../../types');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ReportPreview = function ReportPreview(_ref) {
  var id = _ref.id,
      name = _ref.name,
      creator = _ref.creator;
  return _react2.default.createElement(
    _tiles.Tile,
    {
      icon: 'chart',
      header: creator && _react2.default.createElement(
        _components.Popover,
        {
          small: true,
          popover: (0, _signavioI18n2.default)('Owner: __user__', { user: _utils.UserUtils.name(creator) })
        },
        _react2.default.createElement(_components.Avatar, { user: creator, style: { verticalAlign: 'top' } })
      )
    },
    _react2.default.createElement(
      _buttons.LinkButton,
      { to: (0, _effektifApi.prependOrg)('/analytics/report/' + id), block: true },
      name
    )
  );
};

exports.default = ReportPreview;


// WEBPACK FOOTER //
// ./packages/reporting/lib/dashboard/components/ReportPreview.js