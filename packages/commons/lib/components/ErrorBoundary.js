'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _ui = require('@signavio/ui');

var _styles = require('../styles');

var _hints = require('./hints');

var _buttons = require('./buttons');

var _tiles = require('./tiles');

var _index = require('./index');

var _ErrorDetails = require('./ErrorDetails');

var _ErrorDetails2 = _interopRequireDefault(_ErrorDetails);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var trackJs = window.trackJs;

var ErrorBoundary = function (_PureComponent) {
  (0, _inherits3.default)(ErrorBoundary, _PureComponent);

  function ErrorBoundary() {
    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, ErrorBoundary);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, _PureComponent.call.apply(_PureComponent, [this].concat(args))), _this), _this.state = { error: null }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  ErrorBoundary.prototype.render = function render() {
    var children = this.props.children;
    var error = this.state.error;


    if (error) {
      return this.renderError(error);
    }

    return _react2.default.createElement(
      'div',
      null,
      children
    );
  };

  ErrorBoundary.prototype.renderError = function renderError(error) {
    var _props = this.props,
        errorMessage = _props.errorMessage,
        asTile = _props.asTile,
        small = _props.small,
        transparent = _props.transparent;

    if (errorMessage && typeof errorMessage !== 'string') {
      return typeof errorMessage === 'function' ? errorMessage(error) : errorMessage;
    }

    if (asTile) {
      return _react2.default.createElement(
        _index.PopoverNew,
        {
          popover: _react2.default.createElement(
            _ErrorDetails2.default,
            { debug: window.EFFEKTIF_DEBUG },
            _react2.default.createElement(
              'pre',
              null,
              error.stack
            )
          ),
          small: true
        },
        _react2.default.createElement(
          _tiles.TextTile,
          (0, _extends3.default)({ small: small, transparent: transparent }, {
            style: { main: { paddingLeft: 0 } }
          }),
          _react2.default.createElement(
            _hints.Hint,
            { danger: true, small: small, inline: true },
            errorMessage || (0, _signavioI18n2.default)('Something went wrong')
          )
        )
      );
    }

    return _react2.default.createElement(
      _hints.Hint,
      { danger: true, style: { message: { display: 'block' } } },
      _react2.default.createElement(
        'div',
        { style: { fontStyle: 'normal' } },
        _react2.default.createElement(
          'h3',
          { style: { marginBottom: _styles.padding.large } },
          errorMessage || (0, _signavioI18n2.default)('Oops, something went wrong!')
        ),
        _react2.default.createElement(
          _ErrorDetails2.default,
          { debug: true },
          _react2.default.createElement(
            'pre',
            null,
            error.stack
          )
        ),
        _react2.default.createElement(_ui.Divider, null),
        _react2.default.createElement(
          _buttons.IconButton,
          {
            icon: 'refresh',
            onClick: function onClick() {
              location.reload();
            }
          },
          (0, _signavioI18n2.default)('Reload application')
        )
      )
    );
  };

  ErrorBoundary.prototype.unstable_handleError = function unstable_handleError(error) {
    // eslint-disable-line camelcase
    if (trackJs) {
      trackJs.track(error);
    }
    console.error(error); // eslint-disable-line no-console
    this.setState({ error: error });
  };

  return ErrorBoundary;
}(_react.PureComponent);

exports.default = ErrorBoundary;


// WEBPACK FOOTER //
// ./packages/commons/lib/components/ErrorBoundary.js