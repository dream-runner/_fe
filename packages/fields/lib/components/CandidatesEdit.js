'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _recompose = require('recompose');

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _lodash = require('lodash');

var _workflowOrganizations = require('@signavio/workflow-organizations');

var _forms = require('@signavio/effektif-commons/lib/components/forms');

var _dataTypes = require('../dataTypes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LabeledUserSelect = (0, _forms.withLabel)(_workflowOrganizations.UserSelect);


var CandidatesEdit = function CandidatesEdit(_ref) {
  var items = _ref.items,
      label = _ref.label,
      onGroupSelect = _ref.onGroupSelect,
      onRemoveCandidate = _ref.onRemoveCandidate,
      onUserSelect = _ref.onUserSelect,
      readOnly = _ref.readOnly;
  return _react2.default.createElement(LabeledUserSelect, {
    inline: true,
    items: items,
    label: label,
    onGroupSelect: onGroupSelect,
    onRemove: onRemoveCandidate,
    onUserSelect: onUserSelect,
    placeholder: (0, _signavioI18n2.default)('Select users or groups'),
    readOnly: readOnly,
    showGroups: true
  });
};

exports.default = (0, _recompose.compose)((0, _recompose.withProps)(function (_ref2) {
  var dataType = _ref2.dataType;
  return {
    items: {
      groups: (0, _lodash.map)((0, _dataTypes.isList)(dataType) ? dataType.elementType.candidateGroupIds : dataType.candidateGroupIds, function (groupId) {
        return { id: groupId };
      }),
      users: (0, _lodash.map)((0, _dataTypes.isList)(dataType) ? dataType.elementType.candidateIds : dataType.candidateIds, function (candidateId) {
        return { id: candidateId };
      })
    },
    elementType: (0, _dataTypes.isList)(dataType) ? dataType.elementType : dataType
  };
}), (0, _recompose.withHandlers)({
  onRemoveGroup: function onRemoveGroup(_ref3) {
    var onComplete = _ref3.onComplete,
        elementType = _ref3.elementType,
        items = _ref3.items;
    return function (deletedGroup) {
      var _elementType$candidat = elementType.candidateGroupIds,
          candidateGroupIds = _elementType$candidat === undefined ? [] : _elementType$candidat;

      var index = items.groups.findIndex(function (group) {
        return group.id === deletedGroup.id;
      });
      if (index === -1) {
        return;
      }

      onComplete((0, _extends3.default)({}, elementType, {
        candidateGroupIds: [].concat((0, _toConsumableArray3.default)(candidateGroupIds.slice(0, index)), (0, _toConsumableArray3.default)(candidateGroupIds.slice(index + 1)))
      }));
    };
  },
  onRemoveUser: function onRemoveUser(_ref4) {
    var onComplete = _ref4.onComplete,
        elementType = _ref4.elementType,
        items = _ref4.items;
    return function (deletedUser) {
      var _elementType$candidat2 = elementType.candidateIds,
          candidateIds = _elementType$candidat2 === undefined ? [] : _elementType$candidat2;

      var index = items.users.findIndex(function (user) {
        return user.id === deletedUser.id;
      });
      if (index === -1) {
        return;
      }

      onComplete((0, _extends3.default)({}, elementType, {
        candidateIds: [].concat((0, _toConsumableArray3.default)(candidateIds.slice(0, index)), (0, _toConsumableArray3.default)(candidateIds.slice(index + 1)))
      }));
    };
  }
}), (0, _recompose.withHandlers)({
  onGroupSelect: function onGroupSelect(_ref5) {
    var onComplete = _ref5.onComplete,
        elementType = _ref5.elementType,
        items = _ref5.items;
    return function (newGroup) {
      var index = items.groups.findIndex(function (group) {
        return group.id === newGroup.id;
      });
      if (index !== -1) {
        return;
      }

      onComplete((0, _extends3.default)({}, elementType, {
        candidateGroupIds: [].concat((0, _toConsumableArray3.default)(elementType.candidateGroupIds), [newGroup.id])
      }));
    };
  },
  onRemoveCandidate: function onRemoveCandidate(_ref6) {
    var onRemoveGroup = _ref6.onRemoveGroup,
        onRemoveUser = _ref6.onRemoveUser;
    return function (group, _ref7) {
      var isGroup = _ref7.isGroup;

      if (isGroup) {
        onRemoveGroup(group);
      } else {
        onRemoveUser(group);
      }
    };
  },
  onUserSelect: function onUserSelect(_ref8) {
    var onComplete = _ref8.onComplete,
        elementType = _ref8.elementType,
        items = _ref8.items;
    return function (newUser) {
      var index = items.users.findIndex(function (user) {
        return user.id === newUser.id;
      });
      if (index !== -1) {
        return;
      }

      onComplete((0, _extends3.default)({}, elementType, {
        candidateIds: [].concat((0, _toConsumableArray3.default)(elementType.candidateIds), [newUser.id])
      }));
    };
  }
}))(CandidatesEdit);


// WEBPACK FOOTER //
// ./packages/fields/lib/components/CandidatesEdit.js