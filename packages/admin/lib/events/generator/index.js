'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generatorDeleted = exports.generatorUpdated = exports.generatorCreated = undefined;

var _Created = require('./Created');

var _Created2 = _interopRequireDefault(_Created);

var _Updated = require('./Updated');

var _Updated2 = _interopRequireDefault(_Updated);

var _Deleted = require('./Deleted');

var _Deleted2 = _interopRequireDefault(_Deleted);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.generatorCreated = _Created2.default;
exports.generatorUpdated = _Updated2.default;
exports.generatorDeleted = _Deleted2.default;
exports.default = {
  generatorCreated: _Created2.default,
  generatorUpdated: _Updated2.default,
  generatorDeleted: _Deleted2.default
};


// WEBPACK FOOTER //
// ./packages/admin/lib/events/generator/index.js