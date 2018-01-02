'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _recompose = require('recompose');

var _components = require('@signavio/effektif-commons/lib/components');

var _hints = require('@signavio/effektif-commons/lib/components/hints');

var _effektifApi = require('@signavio/effektif-api');

var _styles = require('@signavio/effektif-commons/lib/styles');

var _select = require('../../users/components/select');

var _Member = require('./Member');

var _Member2 = _interopRequireDefault(_Member);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function MemberList(_ref) {
  var style = _ref.style,
      userQuery = _ref.userQuery,
      addMember = _ref.addMember,
      groupId = _ref.groupId,
      onPreventClick = _ref.onPreventClick;

  var autocomplete = null;
  return _react2.default.createElement(
    'div',
    null,
    addMember.pending ? _react2.default.createElement(
      _hints.Hint,
      { loading: true },
      (0, _signavioI18n2.default)('Adding new group member...')
    ) : _react2.default.createElement(_components.Autocomplete, {
      'static': true,
      ref: function ref(_ref3) {
        autocomplete = _ref3;
      },
      query: userQuery,
      emptyText: (0, _signavioI18n2.default)('No user found in this group'),
      placeholder: (0, _signavioI18n2.default)('Search for users in this group...'),
      onComplete: function onComplete() {
        return null;
      },
      fetchOptions: { groupIds: [groupId] },
      renderItem: function renderItem(_ref2) {
        var entity = _ref2.entity;
        return _react2.default.createElement(
          'div',
          (0, _extends3.default)({}, style, { onClick: onPreventClick }),
          _react2.default.createElement(_Member2.default, {
            user: entity,
            groupId: groupId,
            onRemoved: function onRemoved() {
              if (autocomplete) {
                // triggers re-fetch and will cause the removed user to not show up anylonger
                autocomplete.focus();
              }
            }
          })
        );
      }
    }),
    _react2.default.createElement(_components.Divider, null),
    _react2.default.createElement(_select.UserSelect, {
      placeholder: (0, _signavioI18n2.default)('Select users to add to the group'),
      onUserSelect: function onUserSelect(user) {
        return addMember({ userId: user.id, groupId: groupId });
      },
      filter: function filter(matches) {
        return matches.map(function (match) {
          var isMember = match.entity.groupIds && match.entity.groupIds.indexOf(groupId) >= 0;
          return isMember ? (0, _extends3.default)({}, match, { disabled: true }) : match;
        });
      }
    })
  );
}

exports.default = (0, _recompose.compose)((0, _effektifApi.connect)(function () {
  return {
    addMember: {
      type: _effektifApi.types.GROUP_MEMBER,
      method: 'create'
    }
  };
}), (0, _recompose.withHandlers)({
  onPreventClick: function onPreventClick() {
    return function (event) {
      event.stopPropagation();
      event.preventDefault();
    };
  }
}), _components.WithUserQuery, (0, _styles.defaultStyle)({
  cursor: 'default'
}))(MemberList);


// WEBPACK FOOTER //
// ./packages/organizations/lib/groups/components/ManageMembers.js