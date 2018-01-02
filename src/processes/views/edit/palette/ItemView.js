import i18n from 'i18n'
import React from 'react'
import createReactClass from 'create-react-class'
import $ from 'jquery'

import { CSSUtils } from 'commons-utils'
import { BaseMixin } from 'commons-mixins'
import { Draggable, Popover, Feature, Icon } from 'commons-components'
import { applicationName } from '@signavio/effektif-commons'

import Action from 'activities/models/Action'
import { CheckConfiguration } from 'activities/views'

module.exports = createReactClass({
  displayName: 'Item',

  mixins: [BaseMixin],

  getInitialState: function() {
    return {
      isMouseDown: false,
    }
  },

  isDisabled: function() {
    return this.props.disabled || this.props.model.get('isComingSoon')
  },

  componentDidMount: function() {
    var that = this
    this._onDocumentMouseDownBound = function(ev) {
      return that._onDocumentMouseDown.apply(that, [ev])
    }
    this._onDocumentMouseUpBound = function(ev) {
      return that._onDocumentMouseUp.apply(that, [ev])
    }
    $(document).on('mousedown', this._onDocumentMouseDownBound)
    $(document).on('mouseup', this._onDocumentMouseUpBound)
  },

  componentWillUnmount: function() {
    if (this._onDocumentMouseDownBound) {
      $(document).off('mousedown', this._onDocumentMouseDownBound)
    }
    if (this._onDocumentMouseUpBound) {
      $(document).off('mouseup', this._onDocumentMouseUpBound)
    }
  },

  render: function() {
    return (
      // set trigger to "click" to prevent reopening the overlay when mousemoving over the item while dragging
      <li
        className={
          'action-palette-item col-md-3 col-sm-6 action-' + this.props.model.id
        }
      >
        <Feature
          tooltip={i18n(
            'This feature is not included in your version of __applicationName__',
            { applicationName }
          )}
          feature={this.props.model.get('feature')}
        >
          <CheckConfiguration
            asTooltip
            isMisconfigured={this.props.model.get('isMisconfigured')}
            service={i18n(`__service__ integration`, {
              service: this.props.model.getService().get('name'),
            })}
          >

            <Popover
              placement="top"
              popover={this.renderPopover()}
              disabled={this.state.isMouseDown}
              ref="overlayTrigger"
            >

              <div
                onMouseDown={this.handleMouseDown}
                onClick={this.handleClick}
              >

                {this.renderDraggable()}
                {this.renderComingSoon()}
              </div>
            </Popover>
          </CheckConfiguration>
        </Feature>
      </li>
    )
  },

  renderDraggable: function() {
    if (this.props.disabled || this.props.model.get('isComingSoon')) {
      return this.renderButton()
    }

    return (
      <Draggable
        helper="clone"
        onDrop={this.handleDrop}
        onDrag={this.props.onDrag}
      >

        {this.renderButton()}
      </Draggable>
    )
  },

  handleDrop: function(sortPosition, uiPosition) {
    var activity = new Action({ type: this.props.model })

    this.props.onDrop(activity, sortPosition, uiPosition)
  },

  renderPopover: function() {
    return (
      <div className="palette-item-description">
        {this.props.model.get('description')}
      </div>
    )
  },

  renderButton: function() {
    var disabled = this.isDisabled()
    var cls = CSSUtils.cls({
      btn: true,
      'btn-palette': true,
      'btn-text': true,
      'btn-add-on': true,
      'btn-add-left': true,
      'btn-disabled': disabled,
      'select-type': true,
    })

    const icon = this.props.model.getIcon(this.props.defaultIcon)

    return (
      <button className={cls} disabled={disabled}>
        <Icon
          icon={icon}
          iconSet={icon.indexOf('icon-bpmn') >= 0 ? 'bpmn' : 'signavio'}
          primary
          style={
            this.props.model.get('key') === 'userTask' && {
              height: 99,
              lineHeight: '99px',
            }
          }
        />
        {this.props.model.get('name')}
      </button>
    )
  },

  renderComingSoon: function() {
    if (!this.props.model.get('comingSoon')) {
      return
    }

    return (
      <div className="coming-soon">
        {i18n('Coming soon')}
      </div>
    )
  },

  handleMouseDown: function() {
    if (this.isDisabled()) {
      return
    }

    if (this.props.onSelect) {
      // this.props.onSelect(this.props.model);
    }
  },

  handleClick: function() {
    if (this.isDisabled()) {
      return
    }

    if (this.props.onAdd) {
      this.props.onAdd(new Action({ type: this.props.model }))
    }
  },

  _onDocumentMouseDown: function() {
    this.trySetState({ isMouseDown: true })
  },

  _onDocumentMouseUp: function() {
    this.trySetState({ isMouseDown: false })
  },
})



// WEBPACK FOOTER //
// ./src/processes/views/edit/palette/ItemView.js