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

var _recompose = require('recompose');

var _reactForms = require('@signavio/react-forms');

var _effektifApi = require('@signavio/effektif-api');

var _components = require('@signavio/effektif-commons/lib/components');

var _higherOrder = require('@signavio/effektif-commons/lib/components/higher-order');

var _buttons = require('@signavio/effektif-commons/lib/components/buttons');

var _styles = require('@signavio/effektif-commons/lib/styles');

var _forms = require('@signavio/effektif-commons/lib/components/forms');

var _tiles = require('@signavio/effektif-commons/lib/components/tiles');

var _GroupTile = require('./GroupTile');

var _GroupTile2 = _interopRequireDefault(_GroupTile);

var _ManageMembers = require('./ManageMembers');

var _ManageMembers2 = _interopRequireDefault(_ManageMembers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var enhance = (0, _recompose.compose)(_reactForms.triggerOnCompleteOnEnter, _reactForms.triggerOnCompleteOnBlur, (0, _styles.defaultStyle)({ width: '100%' }), (0, _higherOrder.omitProps)(['onComplete']));

var CompletableText = enhance(_forms.Text);

var stopPropagation = function stopPropagation(ev) {
  return ev.stopPropagation();
};

function CollapsibleEdit(_ref) {
  var group = _ref.group,
      name = _ref.name,
      setName = _ref.setName,
      expanded = _ref.expanded,
      onChange = _ref.onChange,
      onRemove = _ref.onRemove,
      rest = (0, _objectWithoutProperties3.default)(_ref, ['group', 'name', 'setName', 'expanded', 'onChange', 'onRemove']);

  return _react2.default.createElement(
    _components.Collapsible,
    (0, _extends3.default)({}, rest, {
      expanded: expanded,
      header: expanded ? _react2.default.createElement(
        _tiles.Tile,
        {
          icon: 'group',
          toolbar: _react2.default.createElement(
            _components.List,
            { direction: 'horizontal' },
            _react2.default.createElement(_components.Remove, { onRemove: onRemove }),
            _react2.default.createElement(_buttons.IconButton, { icon: 'angle-up', iconSet: 'fontAwesome' })
          )
        },
        _react2.default.createElement(CompletableText, {
          autoFocus: true,
          value: name,
          onClick: stopPropagation,
          onChange: function onChange(newName) {
            return setName(newName);
          },
          onComplete: function onComplete(newName) {
            if (newName !== group.name) {
              onChange({ name: newName });
            }
          }
        })
      ) : _react2.default.createElement(_GroupTile2.default, {
        group: group,
        toolbar: _react2.default.createElement(
          _components.List,
          { direction: 'horizontal' },
          _react2.default.createElement(_components.Remove, { onRemove: onRemove }),
          _react2.default.createElement(_buttons.IconButton, { icon: 'angle-down', iconSet: 'fontAwesome' })
        ),
        style: { cursor: 'pointer' }
      })
    }),
    _react2.default.createElement(
      _components.Box,
      null,
      _react2.default.createElement(
        _components.Box,
        { white: true },
        _react2.default.createElement(_ManageMembers2.default, { groupId: group.id })
      )
    )
  );
}

exports.default = (0, _recompose.compose)((0, _effektifApi.connect)(function (_ref2) {
  var id = _ref2.group.id;
  return {
    deleteGroup: {
      type: _effektifApi.types.GROUP,
      method: 'remove',
      id: id
    },
    updateGroup: {
      type: _effektifApi.types.GROUP,
      method: 'update',
      id: id
    }
  };
}), (0, _recompose.withHandlers)({
  onChange: function onChange(_ref3) {
    var updateGroup = _ref3.updateGroup;
    return function (newGroup) {
      return updateGroup(newGroup);
    };
  },
  onToggle: function (_onToggle) {
    function onToggle(_x) {
      return _onToggle.apply(this, arguments);
    }

    onToggle.toString = function () {
      return _onToggle.toString();
    };

    return onToggle;
  }(function (_ref4) {
    var expanded = _ref4.expanded,
        onToggle = _ref4.onToggle;
    return function () {
      return onToggle(!expanded);
    };
  }),
  onRemove: function onRemove(_ref5) {
    var deleteGroup = _ref5.deleteGroup;
    return deleteGroup;
  }
}), (0, _higherOrder.omitProps)(['deleteGroup', 'updateGroup']), (0, _recompose.withState)('name', 'setName', function (_ref6) {
  var group = _ref6.group;
  return group.name;
}))(CollapsibleEdit);


// WEBPACK FOOTER //
// ./packages/organizations/lib/groups/components/CollapsibleEdit.js