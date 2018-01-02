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

var _lodash = require('lodash');

var _recompose = require('recompose');

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _effektifApi = require('@signavio/effektif-api');

var _styles = require('@signavio/effektif-commons/lib/styles');

var _components = require('@signavio/effektif-commons/lib/components');

var _utils = require('../utils');

var _ReferenceSection = require('./ReferenceSection');

var _ReferenceSection2 = _interopRequireDefault(_ReferenceSection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function References(_ref) {
  var organizations = _ref.organizations,
      groups = _ref.groups,
      users = _ref.users,
      fixedEntries = _ref.fixedEntries,
      fixedRights = _ref.fixedRights,
      readOnly = _ref.readOnly,
      aboutToRevoke = _ref.aboutToRevoke,
      onGrant = _ref.onGrant,
      onSoftRevoke = _ref.onSoftRevoke,
      onCancelRevoke = _ref.onCancelRevoke,
      onConfirmRevoke = _ref.onConfirmRevoke,
      rest = (0, _objectWithoutProperties3.default)(_ref, ['organizations', 'groups', 'users', 'fixedEntries', 'fixedRights', 'readOnly', 'aboutToRevoke', 'onGrant', 'onSoftRevoke', 'onCancelRevoke', 'onConfirmRevoke']);

  return _react2.default.createElement(
    _components.List,
    rest,
    _react2.default.createElement(_ReferenceSection2.default, {
      key: 'organizations',
      entries: organizations,
      type: 'organization',
      fixedEntries: fixedEntries,
      fixedRights: fixedRights,
      readOnly: readOnly,
      onGrant: onGrant,
      onRevoke: onSoftRevoke
    }),
    _react2.default.createElement(_ReferenceSection2.default, {
      key: 'groups',
      type: 'group',
      fixedEntries: fixedEntries,
      fixedRights: fixedRights,
      entries: groups,
      readOnly: readOnly,
      onGrant: onGrant,
      onRevoke: onSoftRevoke
    }),
    _react2.default.createElement(_ReferenceSection2.default, {
      key: 'users',
      type: 'user',
      fixedEntries: fixedEntries,
      fixedRights: fixedRights,
      entries: users,
      readOnly: readOnly,
      onGrant: onGrant,
      onRevoke: onSoftRevoke
    }),
    aboutToRevoke && _react2.default.createElement(
      _components.Confirm,
      {
        danger: true,
        title: (0, _signavioI18n2.default)('Please confirm this action.'),
        onCancel: onCancelRevoke,
        onConfirm: onConfirmRevoke
      },
      (0, _signavioI18n2.default)('You are revoking this right for yourself or a group you are a member of. Please confirm this action and double check that this is what you anticipated.')
    )
  );
}


var getAllConcernedReferences = function getAllConcernedReferences(user, organization) {
  return [{
    id: user.id,
    type: 'user'
  }, {
    id: organization.id,
    type: 'organization'
  }].concat((user.groupIds || []).map(function (id) {
    return {
      id: id,
      type: 'group'
    };
  }));
};

exports.default = (0, _recompose.compose)(_effektifApi.withUser, _effektifApi.withOrganization, (0, _recompose.withState)('aboutToRevoke', 'setRevoke', null), (0, _recompose.withPropsOnChange)(['access'], function (_ref2) {
  var access = _ref2.access,
      availableRights = _ref2.availableRights;
  return {
    organizations: (0, _utils.computeOverview)(access, {
      availableRights: availableRights,
      targetType: 'organization'
    }),
    groups: (0, _utils.computeOverview)(access, { availableRights: availableRights, targetType: 'group' }),
    users: (0, _utils.computeOverview)(access, { availableRights: availableRights, targetType: 'user' })
  };
}), (0, _recompose.withHandlers)({
  onConfirmRevoke: function onConfirmRevoke(_ref3) {
    var aboutToRevoke = _ref3.aboutToRevoke,
        setRevoke = _ref3.setRevoke,
        onRevoke = _ref3.onRevoke;

    return function () {
      var right = aboutToRevoke.right,
          reference = aboutToRevoke.reference;


      onRevoke(reference, right);
      setRevoke(null);
    };
  },
  onCancelRevoke: function onCancelRevoke(_ref4) {
    var setRevoke = _ref4.setRevoke;

    return function () {
      return setRevoke(null);
    };
  },
  onSoftRevoke: function onSoftRevoke(_ref5) {
    var setRevoke = _ref5.setRevoke,
        user = _ref5.user,
        organization = _ref5.organization,
        access = _ref5.access,
        onRevoke = _ref5.onRevoke;

    return function (reference, right) {
      if ((0, _utils.coversCurrentUser)(user, reference)) {
        var newAccess = (0, _utils.revokeRight)(access, right, reference);
        var references = getAllConcernedReferences(user, organization);

        var loosesRight = (0, _lodash.every)(references, function (ref) {
          return !(0, _utils.getRightsFromOverview)(newAccess, [right], ref)[right];
        });

        if (loosesRight) {
          setRevoke({ reference: reference, right: right });

          return;
        }
      }

      onRevoke(reference, right);
    };
  }
}), (0, _components.omitProps)(['onRevoke', 'setRevoke', 'user', 'access', 'availableRights', 'organization']), (0, _styles.defaultStyle)(function (_ref6) {
  var color = _ref6.color;
  return (0, _extends3.default)({}, _styles.utils.borderLeft('1px', 'solid', color.mono.light), _styles.utils.borderRight('1px', 'solid', color.mono.light));
}))(References);


// WEBPACK FOOTER //
// ./packages/access/lib/components/References.js