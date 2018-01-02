'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _lodash = require('lodash');

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _jquery3 = require('blueimp-file-upload/js/jquery.fileupload');

var _jquery4 = _interopRequireDefault(_jquery3);

var _jquery5 = require('blueimp-file-upload/js/jquery.iframe-transport');

var _jquery6 = _interopRequireDefault(_jquery5);

var _propTypes3 = require('../propTypes');

var _utils = require('../utils');

var _Icon = require('./Icon');

var _Icon2 = _interopRequireDefault(_Icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MAX_FILE_SIZE = 50 * 1000 * 1000;
/* eslint-enable */

/* eslint-disable */

var _class = function (_React$Component) {
  (0, _inherits3.default)(_class, _React$Component);

  function _class() {
    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, _class);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.renderContent = function () {
      if (_this.props.inline) {
        return _this.renderInline();
      }

      var classes = _this.props.buttonClassName ? _this.props.buttonClassName + ' fileinput-button' : _utils.CSSUtils.cls({
        btn: true,
        'btn-text': true,
        'btn-add-on': !_this.props.avatar,
        'btn-add-left': !_this.props.avatar,
        'btn-eff-ternary': true,
        'fileinput-button': true,
        flat: _this.props.flat
      });

      return _react2.default.createElement(
        'div',
        { className: classes },
        _this.renderIcon(),
        _this.getTitle(),
        _react2.default.createElement('input', { ref: 'input', type: 'file', value: '' }),
        _react2.default.createElement('div', { className: 'upload-msg disappear' })
      );
    }, _this.renderIcon = function () {
      return _this.props.avatar || _this.props.icon;
    }, _this.renderInline = function () {
      return _react2.default.createElement(
        'div',
        { className: 'fileinput-button btn btn-link' },
        _this.getTitle(),
        _react2.default.createElement('input', { ref: 'input', type: 'file', value: '' }),
        _react2.default.createElement('div', { className: 'upload-msg disappear' })
      );
    }, _this.proxy = function (event) {
      // fix for firefox as the click event of the input is always
      // captured by the surrounding button
      // comparing with this.refs.input did not always work
      // (sometimes this.refs.input ref was out of date and not in the DOM anymore)
      if (event.target.tagName.toLowerCase() === 'input' && event.target.type === 'file') {
        return;
      }

      _this.open();
    }, _this.open = function () {
      (0, _jquery2.default)(_reactDom2.default.findDOMNode(_this.refs.input)).click();
    }, _this.getTitle = function () {
      return _this.props.title || (0, _signavioI18n2.default)('Upload Document');
    }, _this.initFileUpload = function () {
      var me = _this;
      var progress = (0, _jquery2.default)(_reactDom2.default.findDOMNode(_this)).find('.upload-msg');
      // var file = new File();

      var supportsXhr = _jquery2.default.support.xhrFileUpload;
      var url = _this.props.endpoint || _utils.LoginUtils.makeUrl('files', _this.context.organization);

      // if using iframe transport, append iframe to the regular upload endpoint URL,
      // to get the endpoint with "text/html" response content type
      if (!supportsXhr) url = url + 'iframe';

      var timer;
      var _fail = function _fail(text) {
        progress.text(text).addClass('progress-warning').fadeIn();

        window.clearTimeout(timer);
        timer = window.setTimeout(function () {
          progress.fadeOut().text('').removeClass('progress-warning');
        }, 5000); // After 5 seconds
      };

      // Enable file upload
      (0, _jquery2.default)(_this.refs.input).fileupload({
        // Define upload endpoint
        url: url,

        // Add additional security parameter
        formData: (0, _lodash.pick)(_jquery2.default.ajaxSettings.headers, 'Authorization'),

        dropZone: _this.getDropZone(),

        add: function add(e, data) {
          if (!data.files) {
            return data.submit();
          }

          var file = data.files[0];

          // < 10MB
          if (file.size === undefined || file.size < MAX_FILE_SIZE) {
            return data.submit();
          }

          _fail((0, _signavioI18n2.default)('The maximum file size is __size__MB', {
            size: MAX_FILE_SIZE / 1000 / 1000
          }));
        },

        // Set finished label, hide progress bar
        done: function done(e, data) {
          progress.text((0, _signavioI18n2.default)('Finished'));

          window.clearTimeout(timer);
          timer = window.setTimeout(function () {
            progress.fadeOut();
          }, 1000); // After 1 seconds

          var jsonResponse = data.result;
          if (jsonResponse instanceof _jquery2.default) {
            // when supportsXhr === false, iframe transport has the iframe's document jquery-wrapped as a result,
            // parse the body text to JSON
            jsonResponse = _jquery2.default.parseJSON(jsonResponse.text());
          }
          // var file = new File(jsonResponse);

          if ((0, _lodash.isFunction)(me.props.onUploaded)) {
            me.props.onUploaded(jsonResponse);
          }
        },

        // Show progress bar
        start: function start() {
          window.clearTimeout(timer);
          progress.fadeIn();
          if (me.props.onStart) {
            me.props.onStart();
          }
        },

        fail: function fail(e, data) {
          var text = (0, _signavioI18n2.default)('Failed!');
          if (data.xhr().status === 413) {
            text = (0, _signavioI18n2.default)('File too big!');
            try {
              text = JSON.parse(data.xhr().response).message;
            } catch (e) {}
          }
          _fail(text);
        },

        // Update progress bar
        progressall: function progressall(e, data) {
          if (me.props.inline) {
            return;
          }

          var value = parseInt(data.loaded / data.total * 100, 10);
          progress.css('width', value + '%');
        }
      });

      if (_this.props.dropZoneConnection) {
        _this.props.dropZoneConnection.onDropZoneChange(_this.handleDropZoneChange);
      }
    }, _this.getDropZone = function () {
      return _this.props.dropZoneConnection && _this.props.dropZoneConnection.dropZone ? _this.props.dropZoneConnection.dropZone : _reactDom2.default.findDOMNode(_this);
    }, _this.handleDropZoneChange = function () {
      if (!_this.refs.input) {
        return;
      }

      (0, _jquery2.default)(_this.refs.input).fileupload('option', 'dropZone', _this.getDropZone());
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  _class.prototype.componentDidMount = function componentDidMount() {
    this.initFileUpload();
  };

  // componentDidUpdate: function() {
  //     this.initFileUpload();
  // },

  _class.prototype.componentWillUnmount = function componentWillUnmount() {
    try {
      (0, _jquery2.default)(this.refs.input).fileupload('destroy');
    } catch (e) {
      // ignore;
    }
  };

  _class.prototype.render = function render() {
    var cls = _utils.CSSUtils.cls({
      'file-upload': true,
      inline: this.props.inline
    }, this.props.className);

    return _react2.default.createElement(
      'div',
      { className: cls, onClick: this.proxy },
      this.renderContent()
    );
  };

  return _class;
}(_react2.default.Component);

_class.displayName = 'FileUpload';
_class.contextTypes = {
  organization: _propTypes3.Organization.isRequired
};
_class.propTypes = {
  inline: _propTypes2.default.bool,
  flat: _propTypes2.default.bool,
  title: _propTypes2.default.string,
  buttonClassName: _propTypes2.default.string,
  icon: _propTypes2.default.node,
  avatar: _propTypes2.default.bool,
  className: _propTypes2.default.string,
  endpoint: _propTypes2.default.string,
  dropZoneConnection: _propTypes2.default.shape({
    onDropZoneChange: _propTypes2.default.func,
    dropZone: _propTypes2.default.element
  })
};
_class.defaultProps = {
  icon: _react2.default.createElement(_Icon2.default, { icon: 'document-add' })
};
exports.default = _class;


// WEBPACK FOOTER //
// ./packages/commons/lib/components/FileUpload.js