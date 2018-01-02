'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _recompose = require('recompose');

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _styles = require('@signavio/effektif-commons/lib/styles');

var _components = require('@signavio/effektif-commons/lib/components');

var _tiles = require('@signavio/effektif-commons/lib/components/tiles');

var _workflowOrganizations = require('@signavio/workflow-organizations');

var _RightToggle = require('./RightToggle');

var _RightToggle2 = _interopRequireDefault(_RightToggle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function AddReference(_ref) {
  var rights = _ref.rights,
      defaults = _ref.defaults,
      onUserGrant = _ref.onUserGrant,
      onGroupGrant = _ref.onGroupGrant,
      onOrganizationGrant = _ref.onOrganizationGrant,
      onFilter = _ref.onFilter,
      style = _ref.style;

  return _react2.default.createElement(
    _tiles.Tile,
    {
      toolbar: rights.map(function (right) {
        return _react2.default.createElement(_RightToggle2.default, {
          style: style('toggle'),
          readOnly: true,
          key: right,
          granted: (0, _lodash.includes)(defaults, right)
        });
      })
    },
    _react2.default.createElement(_workflowOrganizations.UserSelect, {
      showGroups: true,
      showOrganization: true,
      placeholder: (0, _signavioI18n2.default)('Grant rights to a user or group'),
      filter: onFilter,
      onUserSelect: onUserGrant,
      onGroupSelect: onGroupGrant,
      onOrganizationSelect: onOrganizationGrant
    })
  );
}
exports.default = (0, _recompose.compose)((0, _recompose.withHandlers)({
  onUserGrant: function onUserGrant(_ref2) {
    var onAdd = _ref2.onAdd;
    return function (_ref3) {
      var id = _ref3.id;
      return onAdd({
        id: id,
        type: 'user'
      });
    };
  },
  onGroupGrant: function onGroupGrant(_ref4) {
    var onAdd = _ref4.onAdd;
    return function (_ref5) {
      var id = _ref5.id;
      return onAdd({
        id: id,
        type: 'group'
      });
    };
  },
  onOrganizationGrant: function onOrganizationGrant(_ref6) {
    var onAdd = _ref6.onAdd;
    return function (_ref7) {
      var id = _ref7.id;
      return onAdd({
        id: id,
        type: 'organization'
      });
    };
  },
  onFilter: function onFilter(_ref8) {
    var entries = _ref8.entries;
    return function (results) {
      (0, _lodash.each)(results, function (result) {
        if (!(0, _lodash.includes)(entries, result.entity.id)) {
          return result;
        }

        result.disabled = true;
      });

      return results;
    };
  }
}), (0, _styles.defaultStyle)({
  toggle: (0, _extends3.default)({}, _styles.utils.borderLeft('1px', 'solid', 'white'))
}), (0, _components.omitProps)(['overview', 'onAdd']))(AddReference);


// WEBPACK FOOTER //
// ./packages/access/lib/components/AddReference.js