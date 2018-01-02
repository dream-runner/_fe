'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _recompose = require('recompose');

var _effektifApi = require('@signavio/effektif-api');

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _components = require('@signavio/effektif-commons/lib/components');

var _hints = require('@signavio/effektif-commons/lib/components/hints');

var _List = require('./List');

var _List2 = _interopRequireDefault(_List);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Groups(props) {
  var readOnly = props.readOnly,
      onAdd = props.onAdd,
      fetchGroups = props.fetchGroups,
      expanded = props.expanded,
      setExpanded = props.setExpanded;


  return _react2.default.createElement(
    'div',
    null,
    fetchGroups.pending ? _react2.default.createElement(
      _hints.Hint,
      { loading: true },
      (0, _signavioI18n2.default)('Loading user groups...')
    ) : _react2.default.createElement(_List2.default, (0, _extends3.default)({
      groups: fetchGroups.value
    }, { readOnly: readOnly, expanded: expanded, setExpanded: setExpanded })),
    _react2.default.createElement(_components.InputWithButton, {
      clearOnSubmit: true,
      readOnly: readOnly,
      placeholder: (0, _signavioI18n2.default)('Enter a name to add a new group'),
      buttonLabel: (0, _signavioI18n2.default)('Create'),
      onSubmit: onAdd
    })
  );
}
exports.default = (0, _recompose.compose)((0, _effektifApi.connect)({
  fetchGroups: { type: _effektifApi.types.GROUPS },
  addGroup: {
    type: _effektifApi.types.GROUP,
    method: 'create'
  }
}), (0, _recompose.withState)('expanded', 'setExpanded', undefined), (0, _recompose.withHandlers)({
  onAdd: function onAdd(_ref) {
    var addGroup = _ref.addGroup;
    return function (name) {
      addGroup({ name: name });
    };
  }
}), (0, _recompose.lifecycle)({
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    if (this.props.addGroup.pending && nextProps.addGroup.fulfilled) {
      nextProps.setExpanded(nextProps.addGroup.value.id);
    }
  }
}))(Groups);


// WEBPACK FOOTER //
// ./packages/organizations/lib/groups/components/Groups.js