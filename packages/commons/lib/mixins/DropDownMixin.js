'use strict';

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function preventClose(clickTarget) {
  if (!clickTarget) {
    return false;
  }

  var dropdown = this.getDropddown();

  if (clickTarget === dropdown) {
    return true;
  }

  if ((0, _jquery2.default)(clickTarget).parents('.dropdown').get(0) === dropdown) {
    return true;
  }

  if ((0, _jquery2.default)(clickTarget).parent().length === 0) {
    // required because a click a month in the datepicker removes that el from the DOM
    // so that is does not have parents anylonger
    return true;
  }

  if ((0, _jquery2.default)(clickTarget).is('.autocomplete-suggestions') || (0, _jquery2.default)(clickTarget).parents('.autocomplete-suggestions').length !== 0) {
    // when the dropdown renders a list of suggestions
    return true;
  }

  return false;
}

module.exports = {
  getInitialState: function getInitialState() {
    return {
      dropDownOpen: false
    };
  },

  getDropddown: function getDropddown() {
    var node = (0, _jquery2.default)(_reactDom2.default.findDOMNode(this));

    if (node.hasClass('dropdown')) {
      return node.get(0);
    }

    return node.find('.dropdown').get(0);
  },

  close: function close(event) {
    if (!this.state.dropDownOpen) {
      return;
    }

    // click on toggle button
    if (preventClose(event && event.target)) {
      return;
    }

    this.setState({
      dropDownOpen: false
    });
  },

  toggle: function toggle() {
    this.setState({
      dropDownOpen: !this.state.dropDownOpen
    });
  }
};


// WEBPACK FOOTER //
// ./packages/commons/lib/mixins/DropDownMixin.js