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

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _forms = require('@signavio/effektif-commons/lib/components/forms');

var _styles = require('@signavio/effektif-commons/lib/styles');

var _LabelTile = require('./LabelTile');

var _LabelTile2 = _interopRequireDefault(_LabelTile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styled = (0, _styles.defaultStyle)({
  option: {}
});


var Dropdown = styled(function (_ref) {
  var options = _ref.options,
      style = _ref.style,
      rest = (0, _objectWithoutProperties3.default)(_ref, ['options', 'style']);
  return _react2.default.createElement(
    _forms.DropdownSelect,
    (0, _extends3.default)({
      style: style,
      emptyMessage: (0, _signavioI18n2.default)('No label found'),
      placeholder: (0, _signavioI18n2.default)('Click to add labels'),
      searchPlaceholder: (0, _signavioI18n2.default)('Type to search labels'),
      wrapTrigger: function wrapTrigger(trigger) {
        return trigger;
      }
    }, rest),
    options.map(function (label) {
      return _react2.default.createElement(
        _forms.Option,
        {
          key: label.id,
          value: label.id,
          name: label.name,
          style: style('option')
        },
        _react2.default.createElement(_LabelTile2.default, (0, _extends3.default)({ small: true }, label))
      );
    })
  );
});

exports.default = Dropdown;


// WEBPACK FOOTER //
// ./packages/organizations/lib/labels/components/Dropdown.js