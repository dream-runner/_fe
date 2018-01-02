'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = paginated;

var _recompose = require('recompose');

var _higherOrder = require('./higher-order');

function paginated(_ref) {
  var pageSize = _ref.pageSize;

  return (0, _recompose.compose)((0, _recompose.withState)('page', 'setPage', 0), (0, _recompose.withProps)(function (_ref2) {
    var page = _ref2.page;
    return {
      offset: page * pageSize
    };
  }), (0, _recompose.withHandlers)({
    onNext: function onNext(_ref3) {
      var page = _ref3.page,
          setPage = _ref3.setPage;
      return function () {
        return setPage(page + 1);
      };
    },
    onPrevious: function onPrevious(_ref4) {
      var page = _ref4.page,
          setPage = _ref4.setPage;
      return function () {
        return setPage(Math.max(page - 1, 0));
      };
    },
    onReset: function onReset(_ref5) {
      var setPage = _ref5.setPage;
      return function () {
        return setPage(0);
      };
    }
  }), (0, _higherOrder.omitProps)(['setPage']));
}


// WEBPACK FOOTER //
// ./packages/commons/lib/components/Paginated.js