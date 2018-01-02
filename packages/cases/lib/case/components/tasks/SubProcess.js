'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require('react-router-dom');

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _extensions = require('@signavio/effektif-commons/lib/extensions');

var _hints = require('@signavio/effektif-commons/lib/components/hints');

var _tiles = require('@signavio/effektif-commons/lib/components/tiles');

var _styles = require('@signavio/effektif-commons/lib/styles');

var _caseUrl = require('../../../caseUrl');

var _caseUrl2 = _interopRequireDefault(_caseUrl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SubProcess = function SubProcess(_ref) {
  var calledCaseId = _ref.calledCaseId,
      calledCaseName = _ref.calledCaseName,
      closeTime = _ref.closeTime,
      style = _ref.style;
  return _react2.default.createElement(
    _tiles.TextTile,
    {
      icon: closeTime ? 'folder-o' : 'folder-open-o',
      iconSet: 'fontAwesome',
      subtitle: closeTime && (0, _signavioI18n2.default)('Closed on __closeTime__', {
        closeTime: (0, _extensions.moment)(closeTime).format('LLL')
      })
    },
    _react2.default.createElement(
      _reactRouterDom.Link,
      { to: (0, _caseUrl2.default)({ caseId: calledCaseId }) },
      _react2.default.createElement(
        'div',
        style('link'),
        calledCaseName || _react2.default.createElement(
          _hints.Hint,
          { inline: true },
          (0, _signavioI18n2.default)('Unnamed case')
        )
      )
    )
  );
};

var enhance = (0, _styles.defaultStyle)(function (_ref2) {
  var color = _ref2.color;
  return {
    '&closed': {
      link: {
        color: color.mono.dark
      }
    }
  };
}, function (_ref3) {
  var closeTime = _ref3.closeTime;
  return {
    '&closed': !!closeTime
  };
});

exports.default = enhance(SubProcess);


// WEBPACK FOOTER //
// ./packages/cases/lib/case/components/tasks/SubProcess.js