'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = requestRejectedThen;

var _recompose = require('recompose');

var _lodash = require('lodash');

function requestRejectedThen(methodMap) {
  var methodsToWatch = (0, _lodash.keys)(methodMap);

  return (0, _recompose.lifecycle)({
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
      var _this = this;

      (0, _lodash.each)(methodsToWatch, function (method) {
        var methodExists = _this.props[method] && nextProps[method];

        if (!methodExists) {
          return;
        }

        var methodRejected = _this.props[method].pending && !nextProps[method].pending && nextProps[method].rejected;

        if (methodRejected) {
          methodMap[method](nextProps);
        }
      });
    }
  });
}


// WEBPACK FOOTER //
// ./packages/api/lib/higher-order/requestRejectedThen.js