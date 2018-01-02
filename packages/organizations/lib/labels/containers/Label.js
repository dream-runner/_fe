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

var _components = require('../components');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Label(_ref) {
  var fetchLabel = _ref.fetchLabel,
      rest = (0, _objectWithoutProperties3.default)(_ref, ['fetchLabel']);

  if (fetchLabel.rejected) {
    return _react2.default.createElement(
      _tiles.TextTile,
      rest,
      _react2.default.createElement(
        _hints.Hint,
        { danger: true, inline: true },
        (0, _signavioI18n2.default)('Failed to load label.')
      )
    );
  }

  if (fetchLabel.pending || !fetchLabel.value) {
    return _react2.default.createElement(
      _tiles.TextTile,
      rest,
      _react2.default.createElement(
        _hints.Hint,
        { loading: true, inline: true },
        (0, _signavioI18n2.default)('Loading label...')
      )
    );
  }

  return _react2.default.createElement(_components.LabelTile, (0, _extends3.default)({}, fetchLabel.value, rest));
}

var enhance = (0, _effektifApi.connect)(function (_ref2) {
  var value = _ref2.value;
  return {
    fetchLabel: {
      type: _effektifApi.types.LABEL,
      id: value
    }
  };
});

exports.default = enhance(Label);


// WEBPACK FOOTER //
// ./packages/organizations/lib/labels/containers/Label.js