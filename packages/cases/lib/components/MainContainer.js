'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _recompose = require('recompose');

var _styles = require('@signavio/effektif-commons/lib/styles');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function MainContainer(_ref) {
  var children = _ref.children,
      panel = _ref.panel,
      toolbar = _ref.toolbar,
      style = _ref.style;

  return _react2.default.createElement(
    'div',
    style,
    _react2.default.createElement(
      'div',
      style('content'),
      children
    ),
    panel && _react2.default.createElement(
      'div',
      style('panelContainer'),
      _react2.default.createElement(
        'div',
        style('toolbarContainer'),
        _react2.default.createElement(
          'div',
          style('toolbar'),
          toolbar
        )
      ),
      _react2.default.createElement(
        'div',
        style('panel'),
        panel
      )
    )
  );
}


var styled = (0, _styles.defaultStyle)(function (_ref2) {
  var font = _ref2.font,
      lineHeight = _ref2.lineHeight,
      padding = _ref2.padding,
      color = _ref2.color;

  var headerHeight = _styles.utils.calculateHeight(font.size.normal, lineHeight, padding.normal);

  var smTopPadding = headerHeight + padding.large;

  return {
    content: (0, _extends3.default)({
      position: 'fixed',

      top: headerHeight,
      left: 0,

      height: 'calc(100vh - ' + headerHeight + 'px)',
      width: '100%',

      overflowY: 'auto',

      // in order for the done button to not
      // stick to the bottom border of the page
      paddingBottom: 200

    }, _styles.utils.transition(['width', 'filter'])),

    panelContainer: (0, _extends3.default)({
      position: 'fixed',

      top: headerHeight,
      right: 0,

      height: 'calc(100vh - ' + headerHeight + 'px)',

      width: '0%',
      overflowY: 'auto'

    }, _styles.utils.transition('width'), _styles.utils.media.sm((0, _extends3.default)({}, _styles.utils.transition('height'), {

      bottom: 0,
      left: 0,

      right: 'initial',
      top: 'initial'
    }))),

    toolbarContainer: (0, _extends3.default)({
      position: 'fixed',

      right: padding.normal,

      top: headerHeight + padding.large

    }, _styles.utils.transition('right'), _styles.utils.media.sm((0, _extends3.default)({
      right: 0,
      top: 'auto',
      bottom: 0,

      backgroundColor: color.mono.ultralight,

      width: '100%',

      paddingTop: padding.normal,
      paddingLeft: padding.normal,
      paddingRight: padding.normal,
      paddingBottom: padding.normal,

      transition: 'initial'

    }, _styles.utils.borderTop(1, 'solid', color.mono.light)))),

    toolbar: (0, _extends3.default)({}, _styles.utils.media.sm({
      display: 'inline-block',

      marginLeft: '50%',

      transform: 'translate(-50%, 0)'
    })),

    '&withPanel': {
      content: (0, _extends3.default)({
        width: '70%'

      }, _styles.utils.media.md({
        width: '60%'
      }, { strict: true }), _styles.utils.media.sm({
        width: 'auto',

        filter: 'blur(5px)'
      })),

      panelContainer: (0, _extends3.default)({
        width: '30%'

      }, _styles.utils.borderLeft(1, 'solid', color.mono.light), _styles.utils.media.sm((0, _extends3.default)({
        width: '100%',
        height: 'calc(90vh - ' + smTopPadding + 'px)',

        backgroundColor: 'white',
        bosmhadow: '0 0 40px rgba(0 ,0, 0, 0.2)',

        paddingTop: 0

      }, _styles.utils.borderTop(1, 'solid', color.mono.light), _styles.utils.borderLeft(0))), _styles.utils.media.md({
        width: '40%'
      }, { strict: true })),

      toolbarContainer: (0, _extends3.default)({
        position: 'absolute',

        top: padding.large,
        left: padding.normal,
        right: null,

        transform: null

      }, _styles.utils.media.md({
        right: '40%'
      }, {
        strict: true
      }), _styles.utils.media.sm((0, _extends3.default)({
        position: 'fixed',

        top: 'calc(10% + ' + smTopPadding / 2 + 'px)',
        right: '50%',
        bottom: 'auto',
        left: 'auto',

        transform: 'translate(50%, 0)',

        paddingLeft: 0,
        paddingRight: 0,
        paddingBottom: 0,
        paddingTop: padding.normal,

        width: 'auto',
        backgroundColor: 'transparent',

        zIndex: 1

      }, _styles.utils.borderTop(0)))),

      toolbar: (0, _extends3.default)({}, _styles.utils.media.sm({
        marginLeft: 'auto',

        transform: 'initial'
      })),

      panel: (0, _extends3.default)({
        paddingLeft: padding.normal,
        paddingRight: padding.normal,
        paddingBottom: padding.normal,
        paddingTop: 2 * padding.large + padding.normal

      }, _styles.utils.media.sm({
        position: 'relative',

        zIndex: 0,

        paddingTop: padding.large
      }))
    }
  };
}, function (_ref3) {
  var showPanel = _ref3.showPanel;
  return {
    '&withPanel': showPanel
  };
});

exports.default = styled(MainContainer);


// WEBPACK FOOTER //
// ./packages/cases/lib/components/MainContainer.js