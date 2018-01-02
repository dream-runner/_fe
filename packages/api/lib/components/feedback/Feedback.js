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

var _recompose = require('recompose');

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _lodash = require('lodash');

var _components = require('@signavio/effektif-commons/lib/components');

var _hints = require('@signavio/effektif-commons/lib/components/hints');

var _index = require('../../index');

var _getFeedbackOptions = require('./getFeedbackOptions');

var _getFeedbackOptions2 = _interopRequireDefault(_getFeedbackOptions);

var _SystemInformation = require('./SystemInformation');

var _SystemInformation2 = _interopRequireDefault(_SystemInformation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Feedback(_ref) {
  var browser = _ref.browser,
      feedback = _ref.feedback,
      fetchAbout = _ref.fetchAbout,
      includeInfos = _ref.includeInfos,
      onClose = _ref.onClose,
      onConfirm = _ref.onConfirm,
      onIncludeInfosChange = _ref.onIncludeInfosChange,
      onMessageChange = _ref.onMessageChange,
      onSubjectChange = _ref.onSubjectChange,
      page = _ref.page,
      sendFeedback = _ref.sendFeedback,
      sent = _ref.sent;

  var isComplete = feedback.subject && (0, _lodash.trim)(feedback.message);

  return _react2.default.createElement(
    'div',
    null,
    (sent || sendFeedback.pending) && _react2.default.createElement(
      _components.Modal,
      { title: (0, _signavioI18n2.default)('Feedback Sent') },
      sendFeedback.pending && _react2.default.createElement(
        _hints.Hint,
        { loading: true },
        (0, _signavioI18n2.default)('Sending your feedback...')
      ),
      sent && _react2.default.createElement(
        _hints.Hint,
        null,
        (0, _signavioI18n2.default)('We received your feedback. Thanks!')
      )
    ),
    !sendFeedback.pending && !sent && _react2.default.createElement(
      _components.Confirm,
      {
        className: 'feedback',
        title: (0, _signavioI18n2.default)('Send Feedback'),
        disabled: !isComplete || sendFeedback.pending || sent,
        onCancel: onClose,
        onConfirm: onConfirm
      },
      _react2.default.createElement(
        'div',
        {
          className: 'form form-horizontal',
          style: { backgroundColor: 'transparent' }
        },
        _react2.default.createElement(
          'div',
          { className: 'row' },
          _react2.default.createElement(
            'div',
            { className: 'col-lg-12' },
            _react2.default.createElement(_components.Select, {
              className: 'subject',
              placeholder: (0, _signavioI18n2.default)('Subject'),
              value: feedback.subject,
              onChange: onSubjectChange,
              options: (0, _getFeedbackOptions2.default)()
            })
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'row' },
          _react2.default.createElement(
            'div',
            { className: 'col-lg-12' },
            _react2.default.createElement('textarea', {
              className: 'message form-control',
              value: feedback.message,
              onChange: onMessageChange,
              placeholder: (0, _signavioI18n2.default)('What would you like to tell us?')
            })
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'infos' },
          _react2.default.createElement(
            'div',
            { className: 'checkbox' },
            _react2.default.createElement(
              'label',
              null,
              _react2.default.createElement('input', {
                type: 'checkbox',
                checked: includeInfos,
                onChange: onIncludeInfosChange
              }),
              (0, _signavioI18n2.default)('Include the following information about your system?')
            )
          ),
          _react2.default.createElement(_SystemInformation2.default, {
            browser: browser,
            includeInfos: includeInfos,
            page: page,
            version: fetchAbout.pending ? (0, _signavioI18n2.default)('Fetching version...') : fetchAbout.value.version
          })
        )
      )
    )
  );
}
exports.default = (0, _recompose.compose)((0, _recompose.withState)('includeInfos', 'toggleIncludeInfos', true), (0, _recompose.withState)('sent', 'toggleSent', false), (0, _recompose.withState)('feedback', 'setFeedback', {
  subject: '',
  message: ''
}), (0, _index.connect)(function () {
  return {
    fetchAbout: {
      id: 'about',
      type: _index.types.ABOUT
    },
    sendFeedback: {
      method: 'create',
      type: _index.types.FEEDBACK
    }
  };
}), (0, _recompose.withProps)(function (_ref2) {
  var page = _ref2.page,
      rest = (0, _objectWithoutProperties3.default)(_ref2, ['page']);
  return (0, _extends3.default)({
    browser: window.navigator.platform + ' - ' + window.navigator.userAgent,
    page: [window.location.host, page].join('')
  }, rest);
}), (0, _recompose.withHandlers)({
  onClose: function onClose(_ref3) {
    var onSubmit = _ref3.onSubmit;
    return function () {
      onSubmit();
    };
  },
  onConfirm: function onConfirm(_ref4) {
    var browser = _ref4.browser,
        feedback = _ref4.feedback,
        fetchAbout = _ref4.fetchAbout,
        includeInfos = _ref4.includeInfos,
        page = _ref4.page,
        sendFeedback = _ref4.sendFeedback;
    return function () {
      sendFeedback((0, _extends3.default)({}, feedback, includeInfos ? {
        effektifVersion: fetchAbout.value.version,
        browser: browser,
        url: page
      } : {}));
    };
  },
  onIncludeInfosChange: function onIncludeInfosChange(_ref5) {
    var toggleIncludeInfos = _ref5.toggleIncludeInfos;
    return function (event) {
      toggleIncludeInfos(event.target.checked);
    };
  },
  onMessageChange: function onMessageChange(_ref6) {
    var feedback = _ref6.feedback,
        setFeedback = _ref6.setFeedback;
    return function (event) {
      setFeedback((0, _extends3.default)({}, feedback, {
        message: event.target.value
      }));
    };
  },
  onSubjectChange: function onSubjectChange(_ref7) {
    var feedback = _ref7.feedback,
        setFeedback = _ref7.setFeedback;
    return function (subject) {
      setFeedback((0, _extends3.default)({}, feedback, {
        subject: subject
      }));
    };
  }
}), (0, _recompose.lifecycle)({
  componentWillReceiveProps: function componentWillReceiveProps(_ref8) {
    var sendFeedback = _ref8.sendFeedback;

    if (this.props.sendFeedback.pending && !sendFeedback.pending) {
      this.props.toggleSent(true);

      (0, _lodash.delay)(this.props.onClose, 2000);
    }
  }
}))(Feedback);


// WEBPACK FOOTER //
// ./packages/api/lib/components/feedback/Feedback.js