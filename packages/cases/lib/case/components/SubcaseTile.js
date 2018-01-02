'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _reactRouterDom = require('react-router-dom');

var _effektifApi = require('@signavio/effektif-api');

var _components = require('@signavio/effektif-commons/lib/components');

var _tiles = require('@signavio/effektif-commons/lib/components/tiles');

var _styles = require('@signavio/effektif-commons/lib/styles');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SubcaseTile = function SubcaseTile(_ref) {
  var caze = _ref.caze,
      style = _ref.style;
  return _react2.default.createElement(
    _tiles.TextTile,
    {
      header: _react2.default.createElement(_components.Icon, {
        style: style('icon'),
        iconSet: 'fontAwesome',
        icon: caze.closeTime ? 'folder-o' : 'folder-open-o'
      })
    },
    _react2.default.createElement(
      _reactRouterDom.Link,
      { to: (0, _effektifApi.prependOrg)('/case/' + caze.id) },
      _react2.default.createElement(
        'span',
        style('name'),
        (0, _lodash.isNil)(caze.name) ? (0, _signavioI18n2.default)('Unnamed') : caze.name
      )
    )
  );
};

var styled = (0, _styles.defaultStyle)(function (_ref2) {
  var color = _ref2.color;
  return {
    icon: {
      backgroundColor: color.mono.light
    },

    '&completed': {
      name: {
        color: color.mono.middle
      }
    }
  };
}, function (_ref3) {
  var caze = _ref3.caze;
  return {
    '&completed': caze.closeTime
  };
});

exports.default = styled(SubcaseTile);


// WEBPACK FOOTER //
// ./packages/cases/lib/case/components/SubcaseTile.js