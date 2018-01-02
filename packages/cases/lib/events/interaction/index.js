'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fileAdd = exports.commentAdd = exports.assign = undefined;

var _Assign = require('./Assign');

var _Assign2 = _interopRequireDefault(_Assign);

var _CommentAdd = require('./CommentAdd');

var _CommentAdd2 = _interopRequireDefault(_CommentAdd);

var _FileAdd = require('./FileAdd');

var _FileAdd2 = _interopRequireDefault(_FileAdd);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.assign = _Assign2.default;
exports.commentAdd = _CommentAdd2.default;
exports.fileAdd = _FileAdd2.default;
exports.default = {
  assign: _Assign2.default,
  commentAdd: _CommentAdd2.default,
  fileAdd: _FileAdd2.default
};


// WEBPACK FOOTER //
// ./packages/cases/lib/events/interaction/index.js