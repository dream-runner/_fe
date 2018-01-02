'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _recompose = require('recompose');

var _components = require('@signavio/effektif-commons/lib/components');

var _Reference = require('./Reference');

var _Reference2 = _interopRequireDefault(_Reference);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ReferenceSection(_ref) {
  var entries = _ref.entries,
      type = _ref.type,
      readOnly = _ref.readOnly,
      fixedEntries = _ref.fixedEntries,
      fixedRights = _ref.fixedRights,
      onGrant = _ref.onGrant,
      onRevoke = _ref.onRevoke,
      rest = (0, _objectWithoutProperties3.default)(_ref, ['entries', 'type', 'readOnly', 'fixedEntries', 'fixedRights', 'onGrant', 'onRevoke']);

  return _react2.default.createElement(
    _components.List,
    rest,
    (0, _lodash.keys)(entries).sort().map(function (id) {
      return _react2.default.createElement(_Reference2.default, {
        key: id,
        id: id,
        readOnly: readOnly || (0, _lodash.includes)(fixedEntries, id),
        rights: entries[id],
        onGrant: onGrant,
        onRevoke: onRevoke,
        type: type,
        fixedRights: fixedRights
      });
    })
  );
}


var enhance = (0, _recompose.shouldUpdate)(function (props, nextProps) {
  return !(0, _lodash.isEqual)(props.entries, nextProps.entries);
});

exports.default = enhance(ReferenceSection);


// WEBPACK FOOTER //
// ./packages/access/lib/components/ReferenceSection.js