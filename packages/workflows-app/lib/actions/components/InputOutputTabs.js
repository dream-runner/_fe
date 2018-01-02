'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _recompose = require('recompose');

var _tabs = require('@signavio/effektif-commons/lib/components/tabs');

var _styles = require('@signavio/effektif-commons/lib/styles');

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function InputOutputTabs(_ref) {
  var tab = _ref.tab,
      setTab = _ref.setTab,
      inputs = _ref.inputs,
      outputs = _ref.outputs,
      rest = (0, _objectWithoutProperties3.default)(_ref, ['tab', 'setTab', 'inputs', 'outputs']);

  return _react2.default.createElement(
    'div',
    rest.style,
    _react2.default.createElement(
      _tabs.TabBar,
      { style: rest.style('bar') },
      _react2.default.createElement(
        _tabs.Tab,
        {
          style: rest.style('tab'),
          active: tab === 'inputs',
          onClick: function onClick() {
            return setTab('inputs');
          }
        },
        (0, _signavioI18n2.default)('Inputs')
      ),
      _react2.default.createElement(
        _tabs.Tab,
        {
          style: rest.style('tab'),
          active: tab === 'outputs',
          onClick: function onClick() {
            return setTab('outputs');
          }
        },
        (0, _signavioI18n2.default)('Outputs')
      )
    ),
    _react2.default.createElement(
      'div',
      rest.style('content'),
      tab === 'inputs' ? inputs : outputs
    )
  );
}
exports.default = (0, _recompose.compose)((0, _recompose.withState)('tab', 'setTab', 'inputs'), (0, _styles.defaultStyle)({
  content: {
    padding: _styles.padding.normal,
    backgroundColor: 'white'
  },

  bar: {
    marginTop: _styles.padding.large
  },

  tab: {
    flap: {
      backgroundColor: 'rgba(255, 255, 255, 0.8)'
    }
  }
}))(InputOutputTabs);


// WEBPACK FOOTER //
// ./packages/workflows-app/lib/actions/components/InputOutputTabs.js