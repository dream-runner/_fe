"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Query = function () {
  function Query() {
    (0, _classCallCheck3.default)(this, Query);
  }

  Query.prototype.getDescriptor = function getDescriptor() {
    throw new Error("Subclasses must override 'getDescriptor'!");
  };

  Query.prototype.fetch = function fetch() {
    throw new Error("Subclasses must override 'fetch'!");
  };

  Query.prototype.setSize = function setSize(xhr) {
    this.size = parseInt(xhr.getResponseHeader('Meta-Result-Size'), 10);
  };

  Query.prototype.setDisabled = function setDisabled(disabled) {
    this.disabled = disabled;
  };

  Query.prototype.isDisabled = function isDisabled() {
    return !!this.disabled;
  };

  return Query;
}();

exports.default = Query;


// WEBPACK FOOTER //
// ./packages/commons/lib/models/Query.js