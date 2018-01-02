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

var _recompose = require('recompose');

var _tiles = require('@signavio/effektif-commons/lib/components/tiles');

var _effektifFields = require('@signavio/effektif-fields');

var _RightsManager = require('./RightsManager');

var _RightsManager2 = _interopRequireDefault(_RightsManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Reference(_ref) {
  var id = _ref.id,
      type = _ref.type,
      rights = _ref.rights,
      readOnly = _ref.readOnly,
      onGrant = _ref.onGrant,
      onRevoke = _ref.onRevoke,
      fixedRights = _ref.fixedRights,
      rest = (0, _objectWithoutProperties3.default)(_ref, ['id', 'type', 'rights', 'readOnly', 'onGrant', 'onRevoke', 'fixedRights']);

  return _react2.default.createElement(
    _tiles.Tile,
    (0, _extends3.default)({}, rest, {
      toolbar: _react2.default.createElement(_RightsManager2.default, {
        fixedRights: fixedRights,
        readOnly: readOnly,
        rights: rights,
        onGrant: onGrant,
        onRevoke: onRevoke
      })
    }),
    _react2.default.createElement(_effektifFields.Field, { readOnly: true, type: { name: type + 'Id' }, value: id })
  );
}
exports.default = (0, _recompose.withHandlers)({
  onGrant: function (_onGrant) {
    function onGrant(_x) {
      return _onGrant.apply(this, arguments);
    }

    onGrant.toString = function () {
      return _onGrant.toString();
    };

    return onGrant;
  }(function (_ref2) {
    var id = _ref2.id,
        type = _ref2.type,
        onGrant = _ref2.onGrant;

    return function (right) {
      return onGrant({ id: id, type: type }, right);
    };
  }),
  onRevoke: function (_onRevoke) {
    function onRevoke(_x2) {
      return _onRevoke.apply(this, arguments);
    }

    onRevoke.toString = function () {
      return _onRevoke.toString();
    };

    return onRevoke;
  }(function (_ref3) {
    var id = _ref3.id,
        type = _ref3.type,
        onRevoke = _ref3.onRevoke;

    return function (right) {
      return onRevoke({ id: id, type: type }, right);
    };
  })
})(Reference);


// WEBPACK FOOTER //
// ./packages/access/lib/components/Reference.js