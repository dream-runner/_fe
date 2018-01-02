'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = withPeriodicAction;

var _recompose = require('recompose');

var _lodash = require('lodash');

var _components = require('@signavio/effektif-commons/lib/components');

var _utils = require('@signavio/effektif-commons/lib/utils');

function withPeriodicAction(action) {
  var actionId = (0, _lodash.uniqueId)('action');

  return (0, _recompose.compose)((0, _recompose.withHandlers)({
    onPeriodicAction: function onPeriodicAction(props) {
      return function () {
        return action(props);
      };
    }
  }), (0, _recompose.withHandlers)({
    onRestartAction: function onRestartAction(_ref) {
      var onPeriodicAction = _ref.onPeriodicAction;
      return function () {
        _utils.TimeUtils.stop(actionId);
        _utils.TimeUtils.create(actionId).perform(onPeriodicAction).seconds(15);
      };
    }
  }), (0, _recompose.lifecycle)({
    componentDidMount: function componentDidMount() {
      var onPeriodicAction = this.props.onPeriodicAction;


      _utils.TimeUtils.create(actionId).perform(onPeriodicAction).seconds(15);

      onPeriodicAction();
    },
    componentWillUnmount: function componentWillUnmount() {
      _utils.TimeUtils.stop(actionId);
    }
  }), (0, _components.omitProps)(['onPeriodicAction']));
}


// WEBPACK FOOTER //
// ./packages/cases/lib/components/higher-order/withPeriodicAction.js