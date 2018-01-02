import _ from 'underscore'
import React from 'react'
import createReactClass from 'create-react-class'
import i18n from 'i18n'

import Process from '../../models/Process'
import Router from 'singleton/Router'
import { BaseMixin } from 'commons-mixins'

import AdvancedItem from './AdvancedItemView'
import ExampleDefinition from './ExampleDefinition'
import ChangeOwner from './ChangeOwnerView'

import {
  Hint,
  BindingsTextInput,
  Disable,
  MarkdownInput,
  Feature,
} from 'commons-components'

module.exports = createReactClass({
  displayName: 'Options',

  mixins: [BaseMixin],

  getInitialState: function() {
    return {
      loading: true,
    }
  },

  componentWillMount: function() {
    var trigger = this.props.model.get('trigger')

    if (!trigger || trigger.get('type') !== 'form') {
      this.setState({
        loading: false,
      })

      return
    }

    trigger.get('form').once(
      'sync',
      function() {
        this.setState({
          loading: false,
        })
      },
      this
    )

    trigger.get('form').fetch()
  },

  componentWillUnmount: function() {
    var trigger = this.props.model.get('trigger')

    if (!trigger || trigger.get('type') !== 'form') {
      return
    }

    trigger.get('form').off(null, null, this)
  },

  render: function() {
    return (
      <div className="options">
        <div className="form-horizontal">
          {this.renderOwner()}
          {this.renderDescription()}

          <Feature feature="Action.CreateExamples" showHint={false}>
            {this.renderExample()}
          </Feature>

          {this.renderCaseNameTemplate()}
        </div>
      </div>
    )
  },

  renderOwner: function() {
    return (
      <AdvancedItem label={i18n('Process owner')}>
        <ChangeOwner readOnly={this.props.readOnly} model={this.props.model} />
      </AdvancedItem>
    )
  },

  renderDescription: function() {
    const { model } = this.props

    return (
      <AdvancedItem
        className="process-description"
        label={i18n('Process description')}
      >
        <MarkdownInput
          style={{
            tab: {
              flap: {
                backgroundColor: 'white',
              },
            },
          }}
          readOnly={this.props.readOnly}
          value={model.get('description')}
          onChange={ev => model.set('description', ev.target.value)}
          onBlur={this.saveProcess}
        />
      </AdvancedItem>
    )
  },

  renderExample: function() {
    const { model, readOnly } = this.props
    return (
      <AdvancedItem label={i18n('Show in Examples')}>
        <ExampleDefinition
          category={model.get('category')}
          template={model.get('template')}
          onCategoryChange={category => {
            model.set('category', category)
            model.save()
          }}
          onTemplateChange={template => {
            model.set('template', template)
            if (template && !model.get('category')) {
              model.set('category', 'example_en')
            }
            model.save()
          }}
          readOnly={readOnly}
        />
      </AdvancedItem>
    )
  },

  renderCaseNameTemplate: function() {
    var trigger = this.props.model.get('trigger')
    var help = i18n(
      'Define the name to use for new cases of this process. ' +
        'Press the __hashKey__ key to reference values of trigger fields. ' +
        'When a case is started the values of those fields will be inserted.',
      {
        hashKey: <kbd title="#">#</kbd>,
      }
    )
    return (
      <AdvancedItem
        className="case-name-template"
        contextHelp={help}
        label={i18n('Case name template')}
      >
        <Disable
          disabled={
            this.state.loading || !trigger || trigger.get('type') === 'manual'
          }
          hint={i18n(
            'Since a manual trigger is configured, case names are entered by the user when starting this process.'
          )}
        >
          <BindingsTextInput
            singleLine
            readOnly={this.props.readOnly}
            value={this.props.model.get('nameTemplate')}
            onChange={value => this.props.model.set('nameTemplate', value)}
            bindables={trigger && this.getBindables(trigger)}
            onBlur={this.saveProcess}
          />
        </Disable>
      </AdvancedItem>
    )
  },

  getBindables: function(trigger) {
    const caseVariable = this.props.model.getProcess().getCaseVariable()
    const baseBindables = (caseVariable && caseVariable.getBindables()) || []

    const triggerBindables = trigger ? trigger.getBindables() : []

    return _.filter(triggerBindables.concat(baseBindables), function(bindable) {
      return !_.includes(
        ['list', 'oid', 'email', 'custom', 'caseId'],
        bindable.getType().get('name')
      )
    })
  },

  saveProcess: function() {
    this.props.model.debouncedSave()
  },
})



// WEBPACK FOOTER //
// ./src/processes/views/edit/OptionsView.js