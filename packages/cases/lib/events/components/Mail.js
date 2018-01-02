'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _lodash = require('lodash');

var _components = require('@signavio/effektif-commons/lib/components');

var _hints = require('@signavio/effektif-commons/lib/components/hints');

var _styles = require('@signavio/effektif-commons/lib/styles');

var _effektifFields = require('@signavio/effektif-fields');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Mail(_ref) {
  var email = _ref.email,
      style = _ref.style;

  return _react2.default.createElement(
    _components.List,
    null,
    (0, _lodash.map)(email.from, function (sender) {
      return _react2.default.createElement(_effektifFields.LabeledField, {
        readOnly: true,
        label: (0, _signavioI18n2.default)('From'),
        type: _effektifFields.emailAddressType,
        value: extractEmailAddress(sender)
      });
    }),
    (0, _lodash.map)(email.replyTo, function (recipient) {
      return _react2.default.createElement(_effektifFields.LabeledField, {
        readOnly: true,
        label: (0, _signavioI18n2.default)('Reply to'),
        type: _effektifFields.emailAddressType,
        value: extractEmailAddress(recipient)
      });
    }),
    _react2.default.createElement(_effektifFields.LabeledField, {
      readOnly: true,
      label: (0, _signavioI18n2.default)('Subject'),
      type: _effektifFields.textType,
      value: extractEmailAddress(email.subject)
    }),
    _react2.default.createElement(_components.Divider, { title: (0, _signavioI18n2.default)('Message') }),
    email.bodyText ? _react2.default.createElement(
      'pre',
      style('body'),
      email.bodyText
    ) : _react2.default.createElement(
      _hints.Hint,
      { inline: true },
      (0, _signavioI18n2.default)('Message is empty')
    ),
    email.attachments && _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(_components.Divider, { title: (0, _signavioI18n2.default)('Attachments') }),
      (0, _lodash.map)(email.attachments, function (attachment) {
        return _react2.default.createElement(_effektifFields.Field, { readOnly: true, type: _effektifFields.fileType, value: attachment.id });
      })
    )
  );
}


var extractEmailAddress = function extractEmailAddress(email) {
  return (email.match(/[^\s<]+@[^\s>]+/) || [email])[0];
};

var styled = (0, _styles.defaultStyle)(function (_ref2) {
  var font = _ref2.font;
  return {
    body: {
      maxHeight: 230,

      border: 'none',

      fontSize: font.size.small,
      fontFamily: font.family.normal
    }
  };
});

exports.default = styled(Mail);


// WEBPACK FOOTER //
// ./packages/cases/lib/events/components/Mail.js