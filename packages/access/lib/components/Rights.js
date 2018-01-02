'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _recompose = require('recompose');

var _components = require('@signavio/effektif-commons/lib/components');

var _utils = require('../utils');

var _header = require('./header');

var _header2 = _interopRequireDefault(_header);

var _AddReference = require('./AddReference');

var _AddReference2 = _interopRequireDefault(_AddReference);

var _Defaults = require('./Defaults');

var _Defaults2 = _interopRequireDefault(_Defaults);

var _References = require('./References');

var _References2 = _interopRequireDefault(_References);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Rights(props) {
  var readOnly = props.readOnly,
      disabled = props.disabled,
      access = props.access,
      definition = props.definition,
      defaults = props.defaults,
      fixedEntries = props.fixedEntries,
      fixedRights = props.fixedRights,
      onGrant = props.onGrant,
      onRevoke = props.onRevoke,
      onAdd = props.onAdd;


  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(_header2.default, { readOnly: readOnly || disabled, definition: definition }),
    _react2.default.createElement(_References2.default, {
      readOnly: readOnly || disabled,
      fixedEntries: fixedEntries,
      fixedRights: fixedRights,
      access: access,
      availableRights: definition.order,
      onGrant: onGrant,
      onRevoke: onRevoke
    }),
    defaults && _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(_components.Divider, null),
      _react2.default.createElement(_Defaults2.default, { defaults: defaults })
    ),
    !readOnly && !disabled && _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(_components.Divider, null),
      _react2.default.createElement(_AddReference2.default, {
        rights: definition.order,
        defaults: definition.defaults,
        entries: (0, _utils.collectEntries)(access),
        onAdd: onAdd
      })
    )
  );
}

exports.default = (0, _recompose.withHandlers)({
  onGrant: function onGrant(_ref) {
    var access = _ref.access,
        definition = _ref.definition,
        onChange = _ref.onChange;

    return function (reference, right) {
      var rightDefinition = definition.rights[right];
      var rightsToGrant = [].concat((0, _toConsumableArray3.default)(rightDefinition.implies || []), [right]);

      onChange((0, _utils.grantRights)(access, rightsToGrant, reference));
    };
  },
  onRevoke: function onRevoke(_ref2) {
    var access = _ref2.access,
        onChange = _ref2.onChange;

    return function (reference, right) {
      onChange((0, _utils.revokeRight)(access, right, reference));
    };
  },
  onAdd: function onAdd(_ref3) {
    var access = _ref3.access,
        definition = _ref3.definition,
        onChange = _ref3.onChange;

    return function (reference) {
      onChange((0, _utils.grantRights)(access, definition.defaults, reference));
    };
  }
})(Rights);


// WEBPACK FOOTER //
// ./packages/access/lib/components/Rights.js