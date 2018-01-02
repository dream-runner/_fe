'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _recompose = require('recompose');

var _components = require('@signavio/effektif-commons/lib/components');

var _buttons = require('@signavio/effektif-commons/lib/components/buttons');

var _effektifApi = require('@signavio/effektif-api');

var _UserTile = require('../../users/components/UserTile');

var _UserTile2 = _interopRequireDefault(_UserTile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GroupMember = function GroupMember(_ref) {
  var user = _ref.user,
      onRemove = _ref.onRemove,
      removeGroupMember = _ref.removeGroupMember;
  return _react2.default.createElement(_UserTile2.default, {
    user: user,
    subtitle: user.emailAddress,
    toolbar: removeGroupMember.pending ? _react2.default.createElement(_components.Spinner, null) : _react2.default.createElement(_buttons.IconButton, { icon: 'times', onClick: onRemove })
  });
};

exports.default = (0, _recompose.compose)((0, _effektifApi.connect)(function (_ref2) {
  var user = _ref2.user,
      groupId = _ref2.groupId;
  return {
    removeGroupMember: {
      type: _effektifApi.types.GROUP_MEMBER,
      method: 'remove',
      query: {
        groupId: groupId,
        userId: user.id
      }
    }
  };
}), (0, _recompose.withHandlers)({
  onRemove: function onRemove(_ref3) {
    var removeGroupMember = _ref3.removeGroupMember;
    return function (event) {
      event.stopPropagation();
      event.preventDefault();

      removeGroupMember();
    };
  }
}), (0, _recompose.lifecycle)({
  componentWillReceiveProps: function componentWillReceiveProps(_ref4) {
    var removeGroupMember = _ref4.removeGroupMember,
        onRemoved = _ref4.onRemoved;

    if (!removeGroupMember.pending && this.props.removeGroupMember.pending) {
      onRemoved();
    }
  }
}))(GroupMember);


// WEBPACK FOOTER //
// ./packages/organizations/lib/groups/components/Member.js