'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _recompose = require('recompose');

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _styles = require('@signavio/effektif-commons/lib/styles');

var _reactForms = require('@signavio/react-forms');

var _FieldDefinitionTile = require('./FieldDefinitionTile');

var _FieldDefinitionTile2 = _interopRequireDefault(_FieldDefinitionTile);

var _Configurations = require('./Configurations');

var _Configurations2 = _interopRequireDefault(_Configurations);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function FieldDefinition(_ref) {
  var active = _ref.active,
      fieldDefinition = _ref.fieldDefinition,
      style = _ref.style,
      readOnly = _ref.readOnly,
      transformConfiguration = _ref.transformConfiguration,
      canToggleList = _ref.canToggleList,
      onClick = _ref.onClick,
      onClickOutside = _ref.onClickOutside,
      onConfigurationChange = _ref.onConfigurationChange,
      onRemove = _ref.onRemove,
      onClose = _ref.onClose,
      onToggleList = _ref.onToggleList;

  return _react2.default.createElement(
    _reactForms.Dropdown,
    {
      align: 'top left',
      inline: true,
      isOpen: active,
      node: active && _react2.default.createElement(
        'div',
        (0, _extends3.default)({}, style('configContainer'), { 'data-configurationContainer': true }),
        _react2.default.createElement(
          'div',
          style('configTriangle'),
          _react2.default.createElement('div', style('configTriangleInner'))
        ),
        _react2.default.createElement(_Configurations2.default, {
          fieldDefinition: fieldDefinition,
          style: style('configurations'),
          transformConfiguration: transformConfiguration,
          canToggleList: canToggleList,
          onConfigurationChange: onConfigurationChange,
          onRemove: onRemove,
          onClose: onClose,
          onToggleList: onToggleList
        })
      ),
      onClickOutside: onClickOutside,
      position: 'top right',
      updateOnAnimationFrame: true,
      style: style
    },
    _react2.default.createElement(_FieldDefinitionTile2.default, {
      fieldDefinition: fieldDefinition,
      onClick: onClick,
      readOnly: readOnly
    })
  );
}


var hasClickedInsideCollapsibleBody = function hasClickedInsideCollapsibleBody(target) {
  var element = target.parentNode;

  var body = document.getElementsByTagName('body')[0];

  while (element && element !== body) {
    if (element.className === 'collapsible-body') {
      return true;
    }

    element = element.parentNode;
  }
  return false;
};

exports.default = (0, _recompose.compose)((0, _recompose.withHandlers)({
  onClick: function onClick(_ref2) {
    var fieldDefinition = _ref2.fieldDefinition,
        readOnly = _ref2.readOnly,
        onClick = _ref2.onClick;

    return function () {
      if (readOnly) {
        return;
      }

      onClick(fieldDefinition);
    };
  },
  onClickOutside: function onClickOutside(_ref3) {
    var onClose = _ref3.onClose;

    return function (_ref4) {
      var target = _ref4.target;

      var outermostContainer = document.getElementsByClassName('outermost-container')[0];

      if (!outermostContainer.contains(target) || hasClickedInsideCollapsibleBody(target)) {
        return;
      }

      onClose();
    };
  }
}), (0, _styles.defaultStyle)(function (_ref5) {
  var color = _ref5.color,
      font = _ref5.font;
  return {
    display: 'block',
    marginTop: 1,

    node: {
      width: '55%'
    },

    nodeContent: {
      width: '100%'
    },

    configContainer: {
      position: 'relative'
    },

    configTriangle: (0, _extends3.default)({
      height: 0,
      left: 0,
      position: 'absolute',
      top: 10,
      width: 0,
      zIndex: 2
    }, _styles.utils.borderBottom('10px', 'solid', 'transparent'), _styles.utils.borderRight('10px', 'solid', color.mono.lighter), _styles.utils.borderTop('10px', 'solid', 'transparent')),

    configTriangleInner: (0, _extends3.default)({
      position: 'relative',
      top: '-9px',
      left: '2px',
      width: 0,
      height: 0
    }, _styles.utils.borderBottom('9px', 'solid', 'transparent'), _styles.utils.borderRight('9px', 'solid', color.mono.light), _styles.utils.borderTop('9px', 'solid', 'transparent')),

    configurations: {
      left: 10,
      position: 'absolute',
      width: '100%',
      zIndex: 1
    }
  };
}))(FieldDefinition);


// WEBPACK FOOTER //
// ./packages/forms/lib/components/FieldDefinition.js