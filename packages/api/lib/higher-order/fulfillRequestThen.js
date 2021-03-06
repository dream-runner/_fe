'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = fulfillRequestThen;

var _recompose = require('recompose');

var _lodash = require('lodash');

function fulfillRequestThen(methodMap) {
  var methodsToWatch = (0, _lodash.keys)(methodMap);

  return (0, _recompose.lifecycle)({
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
      var _this = this;

      (0, _lodash.each)(methodsToWatch, function (method) {
        var methodExists = _this.props[method] && nextProps[method];

        if (!methodExists) {
          return;
        }

        var methodFulfilled = _this.props[method].pending && !nextProps[method].pending && nextProps[method].fulfilled;

        if (methodFulfilled) {
          methodMap[method](nextProps);
        }
      });
    }
  });
}


// WEBPACK FOOTER //
// ./packages/api/lib/higher-order/fulfillRequestThen.js