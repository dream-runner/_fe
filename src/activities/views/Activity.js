import React from 'react'
import createReactClass from 'create-react-class'
import i18n from 'i18n'

import { Effektif } from 'singleton'

import { BaseMixin } from '@signavio/effektif-commons/lib/mixins'

import {
  Feature,
  Popover,
  ErrorBoundary,
  DocumentTitle,
} from '@signavio/effektif-commons/lib/components'

import * as ActivityViews from './activities'

import ActivityHeader from './ActivityHeader'
import MorphMenu from './MorphMenu'

import { ProvideFieldsContext } from '../../../packages/fields'

import { applicationName } from '@signavio/effektif-commons'

const containerStyle = {
  position: 'relative',

  zIndex: 1,
}

/**
 *
 * A view for rendering an interface for editing activity definitions to be used within
 * an accordion
 */
module.exports = createReactClass({
  displayName: 'ActivityEditView',

  mixins: [BaseMixin],

  componentWillUnmount: function() {
    this.props.model.save()
  },

  render: function() {
    return (
      <div
        className="activity-edit"
        style={{
          ...containerStyle,
          ...this.props.style,
        }}
      >
        <DocumentTitle
          title={i18n('Process - __name__ - __activity__', {
            name: this.props.model.getProcess().get('name'),
            activity: this.props.model.get('name'),
          })}
        />

        <ActivityHeader
          header={<div>{this.renderMorphMenu()}</div>}
          icon={
            'icon signavio-icon icon-' + this.props.model.get('type').getIcon()
          }
          onRemove={this.handleRemove}
          onClose={this.props.onToggle}
          readOnly={this.props.readOnly}
          isNew={this.props.isNew}
          value={this.props.model.get('name')}
          onChange={name => this.handleNameChange(name)}
        />

        <div className="content">
          <Feature
            feature={this.props.model.get('type').get('feature')}
            sneakPeek={false}
            hint={i18n(
              'Unfortunately this action type is not included in your version of __applicationName__.',
              {
                applicationName,
              }
            )}
          >
            {this.renderConfiguration()}
          </Feature>
        </div>
      </div>
    )
  },

  handleNameChange: function(name) {
    this.props.model.set('name', name)
    this.props.model.save()
  },

  renderMorphMenu: function() {
    const { model, onMorph } = this.props

    return (
      <Popover
        small
        placement="top"
        popover={i18n('Click to change the action type.')}
      >
        <div style={{ float: 'left' }}>
          <MorphMenu
            type={model.get('type')}
            services={Effektif.list('services')}
            onMorph={onMorph}
          />
        </div>
      </Popover>
    )
  },

  handleRemove: function() {
    this.props.onRemove(this.props.model)
  },

  renderConfiguration: function() {
    var ActivityView = ActivityViews[this.props.model.get('type').get('key')]

    if (!ActivityView) {
      ActivityView = ActivityViews.genericAction
    }

    const variables = this.props.model
      .getProcess()
      .get('variables')
      .map(variable => variable.toJSON())

    return (
      <ProvideFieldsContext variables={variables}>
        <ErrorBoundary>
          <ActivityView
            readOnly={this.props.readOnly}
            model={this.props.model}
            tab={this.props.tab}
            variableCollection={this.props.variableCollection}
          />
        </ErrorBoundary>
      </ProvideFieldsContext>
    )
  },

  save: function() {
    this.props.model.save()
  },
})



// WEBPACK FOOTER //
// ./src/activities/views/Activity.js