'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _effektifApi = require('@signavio/effektif-api');

var _tiles = require('@signavio/effektif-commons/lib/components/tiles');

var _hints = require('@signavio/effektif-commons/lib/components/hints');

var _GroupTile = require('./GroupTile');

var _GroupTile2 = _interopRequireDefault(_GroupTile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Group(_ref) {
  var fetchGroup = _ref.fetchGroup,
      rest = (0, _objectWithoutProperties3.default)(_ref, ['fetchGroup']);

  if (fetchGroup.rejected) {
    return _react2.default.createElement(
      _tiles.TextTile,
      rest,
      _react2.default.createElement(
        _hints.Hint,
        { danger: true, inline: true },
        (0, _signavioI18n2.default)('Failed to load group.')
      )
    );
  }

  if (fetchGroup.pending || !fetchGroup.value) {
    return _react2.default.createElement(
      _tiles.TextTile,
      rest,
      _react2.default.createElement(
        _hints.Hint,
        { loading: true, inline: true },
        (0, _signavioI18n2.default)('Loading group...')
      )
    );
  }

  return _react2.default.createElement(_GroupTile2.default, (0, _extends3.default)({ group: fetchGroup.value }, rest));
}

exports.default = (0, _effektifApi.connect)(function (_ref2) {
  var value = _ref2.value;
  return {
    fetchGroup: {
      type: _effektifApi.types.GROUP,
      id: value
    }
  };
})(Group);


// WEBPACK FOOTER //
// ./packages/organizations/lib/groups/components/Group.js