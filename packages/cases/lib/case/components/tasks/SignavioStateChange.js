'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _recompose = require('recompose');

var _ErrorTask = require('./ErrorTask');

var _ErrorTask2 = _interopRequireDefault(_ErrorTask);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _recompose.withProps)(function (_ref) {
  var newStateName = _ref.newStateName;
  return {
    subtitle: newStateName,
    allowRetry: false,
    icon: 'exchange',
    iconSet: 'fontAwesome'
  };
})(_ErrorTask2.default);


// WEBPACK FOOTER //
// ./packages/cases/lib/case/components/tasks/SignavioStateChange.js