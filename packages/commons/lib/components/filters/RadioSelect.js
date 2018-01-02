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

var _styles = require('../../styles');

var _ = require('../');

var _Filter = require('./Filter');

var _Filter2 = _interopRequireDefault(_Filter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isActive = function isActive(active, filter) {
  return active === filter.id;
};


var RadioSelect = function RadioSelect(_ref) {
  var active = _ref.active,
      filters = _ref.filters,
      onChange = _ref.onChange,
      style = _ref.style,
      rest = (0, _objectWithoutProperties3.default)(_ref, ['active', 'filters', 'onChange', 'style']);

  if (!filters || filters.length === 0) {
    return _react2.default.createElement(
      _.Hint,
      null,
      (0, _signavioI18n2.default)('No filters available')
    );
  }

  return _react2.default.createElement(
    _.List,
    (0, _extends3.default)({}, rest, style),
    filters.map(function (filter) {
      return _react2.default.createElement(
        _Filter2.default,
        (0, _extends3.default)({
          key: filter.id,
          active: true,
          icon: isActive(active, filter) ? 'dot-circle-o' : 'circle-o',
          iconSet: 'fontAwesome',
          onClick: function onClick() {
            return onChange(isActive(active, filter) ? null : filter.id);
          }
        }, style('filter')),
        filter.name
      );
    })
  );
};

var styled = (0, _styles.defaultStyle)(function (theme) {
  return {
    filter: {
      header: {
        backgroundColor: theme.color.mono.light
      }
    }
  };
});

exports.default = styled(RadioSelect);


// WEBPACK FOOTER //
// ./packages/commons/lib/components/filters/RadioSelect.js