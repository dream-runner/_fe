'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _recompose = require('recompose');

exports.default = (0, _recompose.withHandlers)({
  onKeyDown: function onKeyDown(_ref) {
    var value = _ref.value,
        onComplete = _ref.onComplete;

    return function (event) {
      var keyCode = event.keyCode,
          shiftKey = event.shiftKey,
          metaKey = event.metaKey,
          ctrlKey = event.ctrlKey;


      if (keyCode !== 13 || !shiftKey && !metaKey && !ctrlKey) {
        return;
      }

      event.preventDefault();

      onComplete(value);
    };
  }
});


// WEBPACK FOOTER //
// ./packages/cases/lib/comments/components/higher-order/triggerOnCompleteOnShiftEnter.js