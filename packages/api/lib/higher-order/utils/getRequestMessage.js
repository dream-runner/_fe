'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getRequestMessage;

var _lodash = require('lodash');

function getRequestMessage(methodMap, ownProps, status) {
  var methodsToWatch = (0, _lodash.keys)(methodMap);

  if (status === 'rejected') {
    var rejectedMessage = getRejectedMessage(methodsToWatch, methodMap, ownProps);
    if (rejectedMessage) {
      return rejectedMessage;
    }
  }

  if (status === 'pending') {
    var pendingMessage = getPendingMessage(methodsToWatch, methodMap, ownProps);
    if (pendingMessage) {
      return pendingMessage;
    }
  }
}

var getRejectedMessage = function getRejectedMessage(methodsToWatch, methodMap, ownProps) {
  var rejectedMethods = (0, _lodash.map)(methodsToWatch, function (method) {
    return isRejected(method, methodMap, ownProps);
  }).filter(function (method) {
    return method.rejected;
  });

  if (!(0, _lodash.isEmpty)(rejectedMethods)) {
    return rejectedMethods[0].message;
  }
};

var isRejected = function isRejected(method, methodMap, ownProps) {
  if (!ownProps[method]) {
    return {
      rejected: false
    };
  }

  return {
    message: ownProps[method].rejected && methodMap[method].rejected(ownProps),
    rejected: ownProps[method].rejected
  };
};

var getPendingMessage = function getPendingMessage(methodsToWatch, methodMap, ownProps) {
  var pendingMethods = (0, _lodash.map)(methodsToWatch, function (method) {
    return isPending(method, methodMap, ownProps);
  }).filter(function (method) {
    return method.pending;
  });

  if (!(0, _lodash.isEmpty)(pendingMethods)) {
    return pendingMethods[0].message;
  }
};

var isPending = function isPending(method, methodMap, ownProps) {
  if (!ownProps[method]) {
    return {
      pending: false
    };
  }

  var hasOptionalPending = (0, _lodash.isFunction)(methodMap[method].isPending);

  if (hasOptionalPending && methodMap[method].isPending(ownProps)) {
    return {
      message: methodMap[method].pending(ownProps),
      pending: true
    };
  }

  if (!hasOptionalPending && ownProps[method].pending) {
    return {
      message: methodMap[method].pending(ownProps),
      pending: true
    };
  }

  return {
    pending: false
  };
};


// WEBPACK FOOTER //
// ./packages/api/lib/higher-order/utils/getRequestMessage.js