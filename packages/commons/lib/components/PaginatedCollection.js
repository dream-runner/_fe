'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Paginated = require('./Paginated');

var _Paginated2 = _interopRequireDefault(_Paginated);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var pageSize = _ref.pageSize;
  return function (WrappedComponent) {
    return (0, _Paginated2.default)({ pageSize: pageSize })(function (_ref2) {
      var _onNext = _ref2.onNext,
          collection = _ref2.collection,
          page = _ref2.page,
          offset = _ref2.offset,
          rest = (0, _objectWithoutProperties3.default)(_ref2, ['onNext', 'collection', 'page', 'offset']);
      return _react2.default.createElement(WrappedComponent, (0, _extends3.default)({}, rest, {
        collection: collection,
        page: page,
        offset: offset,
        onNext: function onNext(params) {
          if (collection.meta('size') === collection.length) {
            return;
          }
          if (collection.isSyncing) {
            return;
          }

          collection.once('sync', _onNext);

          collection.fetch({
            remove: page === 0,
            data: (0, _extends3.default)({
              offset: offset,

              pagesize: pageSize

            }, params)
          });
        }
      }));
    });
  };
};


// WEBPACK FOOTER //
// ./packages/commons/lib/components/PaginatedCollection.js