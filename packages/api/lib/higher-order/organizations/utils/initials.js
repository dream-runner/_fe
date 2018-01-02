'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = initials;


var initialRegex = new RegExp('([a-z0-9äöüß]+\\. |Prof |Dr )', 'gi');


function strip(value) {
  return (value.replace(initialRegex, '').match(/[A-ZÄÖÜ]/) || [])[0] || (value.replace(initialRegex, '').match(/[a-zäöüß]/i) || [])[0] || value[0] || '';
}

function initials(user) {
  var firstName = user.firstName,
      lastName = user.lastName;


  return ('' + strip(firstName || '') + strip(lastName || '')).toUpperCase();
}


// WEBPACK FOOTER //
// ./packages/api/lib/higher-order/organizations/utils/initials.js