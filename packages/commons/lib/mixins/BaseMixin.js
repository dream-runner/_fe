'use strict';

var _lodash = require('lodash');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _backboneRelPartialput = require('backbone-rel-partialput');

var _backboneRelPartialput2 = _interopRequireDefault(_backboneRelPartialput);

var _reactMixin = require('backbone-rel/react-mixin');

var _reactMixin2 = _interopRequireDefault(_reactMixin);

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 *  This mixin composes some base functionality and is meant to be the single mixin that is used in all of the app's view components
 */
module.exports = (0, _lodash.assignIn)({}, _backboneRelPartialput2.default.Events, _reactMixin2.default, {
  contextTypes: {
    locale: _propTypes2.default.string
  },

  /**
     * Shortcut for saving the model bound to the view to be used as an event handler.
     */
  saveModel: function saveModel() {
    if (this.props.model) {
      this.props.model.save();
    }
  },

  renderInRow: function renderInRow(content) {
    return _react2.default.createElement('div', { className: 'row' }, _react2.default.createElement('div', { className: 'col-lg-12' }, content));
  },

  /**
     * Return whether the component is in a lifecycle state where calling #forceUpdate() and
     * #setState() do not throw errors
     */
  canUpdate: function canUpdate() {
    return _utils.StateUtils.canUpdate(this);
  },

  tryForceUpdate: function tryForceUpdate(callback) {
    if (this.canUpdate()) {
      // if this method is bound to events, react will throw when the
      // event object is passed in as the callback argument.
      // so do an extra check
      callback = (0, _lodash.isFunction)(callback) ? callback : undefined;
      this.forceUpdate(callback);
    }
  },

  trySetState: function trySetState() {
    if (this.canUpdate()) {
      this.setState.apply(this, arguments);
    }
  }
});


// WEBPACK FOOTER //
// ./packages/commons/lib/mixins/BaseMixin.js