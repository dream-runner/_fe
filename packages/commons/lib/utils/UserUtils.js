'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateEmail = validateEmail;
exports.changeColor = changeColor;
exports.retrieveUser = retrieveUser;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _LoginUtils = require('./LoginUtils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AVATAR_COLORS = ['#f36a4f', '#ee9529', '#dfc62e', '#a9cf36', '#83cb76', '#72c6b2', '#6aaff2', '#a581dd', '#d960b4', '#e9607b'];

function validateEmail(email) {
  // http://snipplr.com/view/19594/
  var re = /[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  return re.test(email);
}

function changeColor(current) {
  var color = void 0;

  while ((color = _lodash2.default.shuffle(AVATAR_COLORS)[0]) === current) {}

  return color;
}

function retrieveUser(id) {
  return new Promise(function (resolve, reject) {
    _jquery2.default.get((0, _LoginUtils.makeUrl)('/users/' + id)).then(function (body, status, response) {
      if (status !== 'success') {
        return reject(response, status, body);
      }

      resolve(body);
    });
  });
}


// WEBPACK FOOTER //
// ./packages/commons/lib/utils/UserUtils.js