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

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _components = require('@signavio/effektif-commons/lib/components');

var _tiles = require('@signavio/effektif-commons/lib/components/tiles');

var _RemoveModal = require('./RemoveModal');

var _RemoveModal2 = _interopRequireDefault(_RemoveModal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ConfigurationToolbarActions = function (_PureComponent) {
  (0, _inherits3.default)(ConfigurationToolbarActions, _PureComponent);

  function ConfigurationToolbarActions(props) {
    (0, _classCallCheck3.default)(this, ConfigurationToolbarActions);

    var _this = (0, _possibleConstructorReturn3.default)(this, _PureComponent.call(this, props));

    _this.state = {
      showRemoveModal: false
    };
    return _this;
  }

  ConfigurationToolbarActions.prototype.render = function render() {
    var _this2 = this;

    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        _components.DropDown,
        { closeOnClick: true, pushRight: true, toggleIcon: 'ellipsis' },
        _react2.default.createElement(
          _components.Disable,
          { disabled: !!this.props.readOnly },
          _react2.default.createElement(
            _tiles.ActionTile,
            {
              className: 'delete',
              icon: 'trash status-danger',
              onClick: function onClick() {
                return _this2.setState({ showRemoveModal: true });
              },
              style: { marginTop: 1 }
            },
            (0, _signavioI18n2.default)('Delete report')
          )
        )
      ),
      this.renderRemoveModal()
    );
  };

  ConfigurationToolbarActions.prototype.renderRemoveModal = function renderRemoveModal() {
    var _this3 = this;

    if (!this.state.showRemoveModal) {
      return null;
    }

    return _react2.default.createElement(_RemoveModal2.default, {
      onCancel: function onCancel() {
        return _this3.setState({ showRemoveModal: false });
      },
      onConfirm: function onConfirm() {
        return _this3.props.onRemove();
      }
    });
  };

  return ConfigurationToolbarActions;
}(_react.PureComponent);

exports.default = ConfigurationToolbarActions;


// WEBPACK FOOTER //
// ./packages/reporting/lib/report/components/ToolbarActions.js