import _ from 'underscore'
import React from 'react'
import createReactClass from 'create-react-class'
import i18n from 'signavio-i18n'
import ReactDOM from 'react-dom'
import $ from 'jquery'

import { CSSUtils } from 'commons-utils'
import { BaseMixin } from 'commons-mixins'
import Submenu from 'processes/views/edit/palette/SubmenuView'
import { Feature, Icon } from 'commons-components'

import { applicationName } from '@signavio/effektif-commons'

module.exports = createReactClass({
  displayName: 'ServiceGroup',

  mixins: [BaseMixin],

  componentDidMount: function() {
    $(ReactDOM.findDOMNode(this))
      .find('.select-type:not(.disabled)')
      .on('dragstart', this.props.onToggle.bind(null, null))
  },

  isDisabled: function() {
    if (this.props.disabled || this.props.readOnly) {
      return true
    }

    return this.props.model.get('actionTypes').length === 0
  },

  render: function() {
    var cls = CSSUtils.cls(
      {
        'action-palette-item': true,
        'service-group': true,
        'col-md-3': true,
        'col-sm-6': true,
        disabled: this.isDisabled(),
        'submenu-open': this.props.open,
      },
      'service-' + this.props.model.get('key')
    )

    return (
      <li className={cls} onMouseDown={this.handleMouseDown}>
        {this.renderButton()}

        {this.renderDescription()}
        {this.renderSubmenu()}
      </li>
    )
  },

  renderSubmenu: function() {
    if (!this.props.open) {
      return
    }

    return (
      <Submenu
        {...this.props}
        service={this.props.model}
        onAdd={this.handleAdd}
      />
    )
  },

  renderButton: function() {
    var cls = CSSUtils.cls({
      btn: true,
      'btn-palette': true,
      'btn-text': true,
      'btn-add-on': true,
      'btn-add-left': true,
      'btn-disabled': this.isDisabled(),
      'select-service': true,
    })

    return (
      <Feature
        tooltip={i18n(
          'This feature is not included in your version of __applicationName__',
          { applicationName }
        )}
        feature={this.props.model.get('feature')}
      >
        <button className={cls} onClick={this.toggle}>
          <Icon icon={this.props.model.get('icon')} primary />

          {this.props.model.get('name')}
        </button>
      </Feature>
    )
  },

  renderDescription: function() {
    if (!this.props.model.get('description')) {
      return
    }

    return (
      <div className="description">
        {this.props.model.get('description')}
      </div>
    )
  },

  handleAdd: function() {
    this.props.onAdd.apply(null, arguments)
    if (_.isFunction(this.props.onToggle)) {
      this.props.onToggle(null)
    }
  },

  toggle: function() {
    if (_.isFunction(this.props.onToggle)) {
      this.props.onToggle(this.props.open ? null : this.props.model)
    }
  },
})



// WEBPACK FOOTER //
// ./src/processes/views/edit/palette/ServiceGroupView.js