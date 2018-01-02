'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = UserSelectItems;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _components = require('@signavio/effektif-commons/lib/components');

var _buttons = require('@signavio/effektif-commons/lib/components/buttons');

var _groups = require('../../../groups');

var _User = require('../User');

var _User2 = _interopRequireDefault(_User);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isEmail = function isEmail(user) {
  return (0, _lodash.isString)(user);
};

function UserSelectItems(_ref) {
  var _ref$users = _ref.users,
      users = _ref$users === undefined ? [] : _ref$users,
      _ref$groups = _ref.groups,
      groups = _ref$groups === undefined ? [] : _ref$groups,
      readOnly = _ref.readOnly,
      onRemove = _ref.onRemove;

  return _react2.default.createElement(
    _components.List,
    null,
    groups.map(function (group) {
      return _react2.default.createElement(_groups.Group, {
        key: group.id,
        value: group.id,
        toolbar: onRemove && _react2.default.createElement(_buttons.RemoveButton, {
          disabled: readOnly,
          onClick: function onClick() {
            return onRemove(group, { isGroup: true });
          }
        })
      });
    }),
    users.map(function (user) {
      return _react2.default.createElement(_User2.default, {
        key: isEmail(user) ? user : user.id,
        icon: isEmail(user) && 'at',
        toolbar: onRemove && _react2.default.createElement(_buttons.RemoveButton, {
          disabled: readOnly,
          onClick: function onClick() {
            return onRemove(user, { isUser: true, isEmail: isEmail(user) });
          }
        }),
        value: user.id
      });
    })
  );
}


// WEBPACK FOOTER //
// ./packages/organizations/lib/users/components/select/Items.js