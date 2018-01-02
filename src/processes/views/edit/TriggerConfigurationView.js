import PropTypes from 'prop-types'
import React from 'react'
import createReactClass from 'create-react-class'
import i18n from 'signavio-i18n'

import { BaseMixin } from '@signavio/effektif-commons/lib/mixins'
import { applicationName } from '@signavio/effektif-commons'
import {
  LegacyRemoveWhichCanHaveALabel,
  Hint as LegacyHint,
  Feature,
  Divider,
  Disable,
} from '@signavio/effektif-commons/lib/components'
import { Hint } from '@signavio/effektif-commons/lib/components/hints'

import { ProvideFieldsContext } from '../../../../packages/fields'

import { Effektif } from '../../../singleton'
import Router from '../../../singleton/Router'

import Trigger from '../../../activities/models/Trigger'
import * as ActivityViews from '../../../activities/views'
import { CaseStartLink } from '../../../activities/views/components'

module.exports = createReactClass({
  displayName: 'TriggerConfiguration',

  mixins: [BaseMixin],

  contextTypes: {
    features: PropTypes.arrayOf(PropTypes.string),
  },

  propTypes: {
    model: PropTypes.instanceOf(Trigger).isRequired,

    onRemove: PropTypes.func,
  },

  render() {
    return (
      <div className="trigger-configuration">
        {this.renderHeader()}
        {this.renderConfiguration()}
      </div>
    )
  },

  renderHeader() {
    const { model } = this.props
    const workflow = model.getProcess()

    const isStartedInApp = model.get('type').get('key') === 'form'

    const path = Router.reverse('create_case', { id: workflow.id })
    const url = `${window.location.protocol}//${window.location.host}${path}`

    return (
      <div className="page-header" style={{ borderBottom: 'none' }}>
        <div className="row">
          <div className="col-sm-7 col-md-8">
            <h3 className="container-header">
              {model.get('type').get('name')}
            </h3>
            <p>
              {model.get('type').get('description')}
            </p>
          </div>
          <div className="col-sm-5 col-md-4">
            {this.renderRemoveButton()}
          </div>
        </div>

        {isStartedInApp &&
          <div>
            <Divider padding="large" />

            <Disable
              disabled={!workflow.isPublished()}
              hint={i18n('You can use this once you publish this workflow.')}
            >
              <CaseStartLink url={url} />
            </Disable>
          </div>}
      </div>
    )
  },

  renderRemoveButton() {
    return (
      <Feature feature="Trigger.Manual">
        <div className="actions-menu">
          <LegacyRemoveWhichCanHaveALabel
            onRemove={this.props.onRemove}
            readOnly={this.props.readOnly}
            className="btn-light btn-clear-trigger"
          >
            {i18n('Remove this trigger')}
          </LegacyRemoveWhichCanHaveALabel>
        </div>
      </Feature>
    )
  },

  renderConfiguration() {
    const { model, readOnly } = this.props
    const triggerType = model.get('type')
    const TriggerConfigView = ActivityViews[triggerType.get('key')]

    if (triggerType && !triggerType.get('key')) {
      return (
        <Hint danger>
          {i18n(
            'The initial trigger of this process is no longer available. After removing it you can choose a different trigger.'
          )}
        </Hint>
      )
    }

    if (!TriggerConfigView) {
      return (
        <LegacyHint info>
          {i18n('This trigger needs no further configuration.')}
        </LegacyHint>
      )
    }

    const variables = model.getProcess().get('variables')
      ? model.getProcess().get('variables').toJSON()
      : []

    return (
      <div>
        <Disable
          disabled={!!triggerType.get('disabledMessage')}
          hint={triggerType.get('disabledMessage')}
        >
          <Feature
            feature={triggerType.get('feature')}
            sneakPeek={false}
            hint={i18n(
              'Unfortunately this trigger type is not included in your version of __applicationName__.',
              { applicationName }
            )}
          >
            <ProvideFieldsContext variables={variables}>
              <TriggerConfigView
                readOnly={readOnly}
                model={model}
                systemConfiguration={Effektif.config()}
              />
            </ProvideFieldsContext>
          </Feature>
        </Disable>
      </div>
    )
  },
})



// WEBPACK FOOTER //
// ./src/processes/views/edit/TriggerConfigurationView.js