'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _recompose = require('recompose');

var _lodash = require('lodash');

var _reactForms = require('@signavio/react-forms');

var _buttons = require('@signavio/effektif-commons/lib/components/buttons');

var _styles = require('@signavio/effektif-commons/lib/styles');

var _tiles = require('@signavio/effektif-commons/lib/components/tiles');

var _getFieldsContext = require('../../../getFieldsContext');

var _getFieldsContext2 = _interopRequireDefault(_getFieldsContext);

var _Edit = require('../../Edit');

var _Edit2 = _interopRequireDefault(_Edit);

var _dataTypes = require('../../../../dataTypes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var shallUseAddButton = function shallUseAddButton(dataTypeDescriptors, dataType) {
  return (0, _dataTypes.isPrimitive)(dataTypeDescriptors, dataType) && dataType.name !== 'choice' || dataType.name === 'money';
};

var shallRestrictToAddButton = function shallRestrictToAddButton(dataType) {
  return dataType.name === 'money' || dataType.name === 'date' && dataType.kind === 'datetime';
};

var AddItem = function AddItem(_ref) {
  var autoFocus = _ref.autoFocus,
      dataTypeDescriptors = _ref.dataTypeDescriptors,
      type = _ref.type,
      onChange = _ref.onChange,
      onComplete = _ref.onComplete,
      style = _ref.style;
  return _react2.default.createElement(
    _tiles.Tile,
    {
      toolbar: shallUseAddButton(dataTypeDescriptors, type) && _react2.default.createElement(_buttons.AddButton, { style: style('addButton'), onClick: onComplete })
    },
    _react2.default.createElement(_Edit2.default, {
      autoFocus: autoFocus,
      type: type,
      onChange: onChange,
      onComplete: !shallRestrictToAddButton(type) && onComplete,
      noClear: true
    })
  );
};

var ignoreAllButFirstOnComplete = (0, _recompose.withHandlers)(function () {
  var onCompleteTriggered = false;

  return {
    onComplete: function onComplete(_ref2) {
      var _onComplete = _ref2.onComplete;
      return function (value) {
        if (onCompleteTriggered || (0, _lodash.isNil)(value)) {
          return;
        }

        onCompleteTriggered = _onComplete(value);
      };
    }
  };
});

exports.default = (0, _recompose.compose)(_getFieldsContext2.default, ignoreAllButFirstOnComplete, _reactForms.wrapOnComplete, (0, _styles.defaultStyle)({
  addButton: (0, _extends3.default)({}, _styles.utils.borderLeft(1, 'solid', 'white'))
}))(AddItem);


// WEBPACK FOOTER //
// ./packages/fields/lib/components/fields/types/list/AddItem.js