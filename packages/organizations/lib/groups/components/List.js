'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = GroupList;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _components = require('@signavio/effektif-commons/lib/components');

var _hints = require('@signavio/effektif-commons/lib/components/hints');

var _CollapsibleEdit = require('./CollapsibleEdit');

var _CollapsibleEdit2 = _interopRequireDefault(_CollapsibleEdit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function GroupList(_ref) {
  var groups = _ref.groups,
      expanded = _ref.expanded,
      setExpanded = _ref.setExpanded;

  if (groups.length === 0) {
    return _react2.default.createElement(
      _hints.Hint,
      null,
      (0, _signavioI18n2.default)('There are currently no groups present in this organization.')
    );
  }

  return _react2.default.createElement(
    _components.List,
    null,
    groups.map(function (group) {
      return _react2.default.createElement(_CollapsibleEdit2.default, {
        key: group.id,
        group: group,
        expanded: expanded === group.id,
        onToggle: function onToggle(expand) {
          return setExpanded(expand ? group.id : undefined);
        }
      });
    })
  );
}


// WEBPACK FOOTER //
// ./packages/organizations/lib/groups/components/List.js