import PropTypes from 'prop-types'
import React from 'react'
import createReactClass from 'create-react-class'
import i18n from 'signavio-i18n'
import { get, map } from 'lodash'

import Router from '../../../../src/singleton/Router'

import { CSSUtils } from '@signavio/effektif-commons/lib/utils'
import { BaseMixin } from '@signavio/effektif-commons/lib/mixins'
import { Menu, ContextHelp } from '@signavio/effektif-commons/lib/components'

import Process from '../../models/Process'
import Variable from 'processes/models/Variable'
import { removeInputsWithKey } from '../../utils'

import Options from './OptionsView'
import Variables from './VariablesView'
import AccessRights from './AccessRightsView'
import CoreInformation from './CoreInformation'

import { ProvideFieldsContext } from '../../../../packages/fields'

module.exports = createReactClass({
  displayName: 'Details',

  mixins: [BaseMixin],

  propTypes: {
    model: PropTypes.instanceOf(Process).isRequired,
    tab: PropTypes.oneOf(['general', 'access', 'fields']),
  },

  getDefaultProps: function() {
    return {
      tab: 'general',
    }
  },

  render: function() {
    return (
      <div className="process-details">
        <div className="row">
          <div className="col-md-3 col-sm-4">
            <Menu
              value={this.props.tab}
              options={this.getOptions()}
              onChange={this.navigateToTab}
            />
          </div>

          <div className="col-md-9 col-sm-8">
            {this.renderGeneral()}
            {this.renderAccess()}
            {this.renderVariables()}
            {this.renderCoreInformation()}
          </div>
        </div>
      </div>
    )
  },

  getOptions: function() {
    return [
      {
        id: 'general',
        title: i18n('General'),
      },
      {
        id: 'access',
        title: i18n('Access control'),
      },
      {
        id: 'fields',
        title: (
          <span>
            {i18n('Field overview')}
            <ContextHelp>
              {i18n(
                'This list shows all fields that are used in this process.'
              )}
            </ContextHelp>
          </span>
        ),
      },
      {
        id: 'coreInformation',
        title: (
          <span>
            {i18n('Core information')}
            <ContextHelp>
              {i18n(
                'Core information covers the information that captures the most important aspects of a case. You can capture who currently assumes a certain role or see which results have already been produced.'
              )}
            </ContextHelp>
          </span>
        ),
        feature: 'Component.CoreInformation',
      },
    ]
  },

  navigateToTab: function(tab) {
    Router.navigate(
      Router.reverse('process', {
        id: this.props.model.id,
        tab: 'details',
        sub: tab,
      }),
      { trigger: true }
    )
  },

  renderGeneral: function() {
    const { tab, model, readOnly } = this.props

    if (tab !== 'general') {
      return
    }

    return <Options model={model} readOnly={readOnly} />
  },

  renderAccess: function() {
    const { tab, model, onAccessChange, readOnly } = this.props

    if (tab !== 'access') {
      return
    }

    return (
      <AccessRights
        model={model}
        onAccessChange={onAccessChange}
        readOnly={readOnly}
      />
    )
  },

  renderVariables: function() {
    const { tab, model, readOnly } = this.props

    if (tab !== 'fields') {
      return
    }

    const variables = model
      .getProcess()
      .get('variables')
      .map(variable => variable.toJSON())

    return (
      <ProvideFieldsContext variables={variables}>
        <Variables collection={model.get('variables')} readOnly={readOnly} />
      </ProvideFieldsContext>
    )
  },

  renderCoreInformation() {
    const { tab, model, readOnly } = this.props

    if (tab !== 'coreInformation') {
      return
    }

    const fieldDefinitions = get(model.get('coreInformation'), 'fields', [])
    const variables = model
      .getProcess()
      .get('variables')
      .map(variable => variable.toJSON())

    return (
      <ProvideFieldsContext variables={variables}>
        <CoreInformation
          reuseNestedFields
          hasFieldReuse
          fieldDefinitions={fieldDefinitions}
          variables={variables}
          onChange={({
            fieldDefinitions,
            variables,
            removedFieldDefinition,
          }) => {
            if (fieldDefinitions) {
              fieldDefinitions = map(fieldDefinitions, fieldDefinition => ({
                ...fieldDefinition,
                readOnly: true,
              }))
            }
            model.set({
              coreInformation: {
                fields: fieldDefinitions,
              },
              variables,
            })
            if (removedFieldDefinition) {
              removeInputsWithKey(
                model,
                'setCoreInformation',
                removedFieldDefinition.binding.expression
              )
            }
            model.save()
          }}
          readOnly={readOnly}
          transformConfiguration={(fieldDefinition, configuration) => {
            if (configuration.key === 'readOnly') {
              return {
                ...configuration,
                readOnly: true,
              }
            }
            if (configuration.key === 'customRules') {
              return {
                ...configuration,
                hide: () => true,
              }
            }
            return configuration
          }}
        />
      </ProvideFieldsContext>
    )
  },
})



// WEBPACK FOOTER //
// ./src/processes/views/edit/Details.js