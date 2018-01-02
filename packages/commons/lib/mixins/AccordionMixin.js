"use strict";

exports.getInitialState = function () {
  return {
    activeItem: this.props.activeItem || null
  };
};
exports.componentWillUpdate = function (nextProps) {
  if (nextProps.activeItem !== this.props.activeItem) {
    this.setState({ activeItem: nextProps.activeItem });
  }
};
exports.isExpanded = function (group) {
  return this.state.activeItem === group;
};
exports.expand = function (group) {
  if (this.state.activeItem === group) {
    return;
  }

  this.handleToggle(group);
};
exports.handleToggle = function (group) {
  var closed = this.state.activeItem === group;

  if (this.state.activeItem === group) {
    this.setState({
      activeItem: null
    });
  } else {
    this.setState({
      activeItem: group
    });
  }

  if (this.afterToggle) {
    this.afterToggle(group, !closed);
  }
};


// WEBPACK FOOTER //
// ./packages/commons/lib/mixins/AccordionMixin.js