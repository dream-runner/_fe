import { reduce } from 'lodash'
import PropTypes from 'prop-types'
import React from 'react'
import createReactClass from 'create-react-class'
import i18n from 'signavio-i18n'

import { BaseMixin } from 'commons-mixins'
import { List } from '@signavio/effektif-commons/lib/components'
import {
  Hint,
} from '@signavio/effektif-commons/lib/components/hints'
import { IconButton } from '@signavio/effektif-commons/lib/components/buttons'

import { Form } from '../../../../../packages/forms'

import Account from 'services/models/Account'

import Activity from '../../../models/Activity'

import CheckConfiguration from '../CheckConfiguration'

import AccountConfig from './AccountConfigView'
import Parameters from './ParametersView'

var HIDE_ACCOUNTS = ['signavio']

module.exports = createReactClass({
  displayName: 'ServiceAction',

  mixins: [BaseMixin],

  propTypes: {
    model: PropTypes.instanceOf(Activity).isRequired,

    readOnly: PropTypes.bool,
  },

  getInitialState: function() {
    return {
      loading: true,
    }
  },

  isServiceMisconfigured: function() {
    return !!this.props.model.get('type').get('isMisconfigured')
  },

  componentWillMount: function() {
    if (this.isServiceMisconfigured()) {
      return
    }
    this.props.model
      .get('type')
      .getService()
      .get('accounts')
      .once('sync', () => {
        this.setState({
          loading: false,
        })
      })
    this.props.model.get('type').getService().get('accounts').fetch()
  },

  componentWillUnmount: function() {
    if (this.isServiceMisconfigured()) {
      return
    }
    this.props.model
      .get('type')
      .getService()
      .get('accounts')
      .off(null, null, this)
  },

  childContextTypes: {
    account: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
    service: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  },

  getChildContext: function() {
    return {
      account: this.getAccount(),
      service: this.props.model.get('type').getService(),
    }
  },

  // TODO: remove this once the signavio account is also
  // attached to the activity
  getAccount: function() {
    if (this.props.model.get('type').getService().get('key') === 'signavio') {
      return this.props.model.get('type').getService().get('accounts').last()
    }

    return this.props.model.get('account')
  },

  render: function() {
    var service = this.props.model.get('type').getService()

    if (!service) {
      return null
    }

    return (
      <CheckConfiguration
        isMisconfigured={this.isServiceMisconfigured()}
        service={i18n(`__service__ integration`, {
          service: this.props.model.get('type').getService().get('name'),
        })}
      >
        <div className="activity-configuration service-action">
          <h3>
            {service.get('name') + ' : '}
            <span className="action small">
              {this.props.model.get('type').get('name')}
            </span>
          </h3>

          {this.renderAccount()}
          {this.renderContent()}
        </div>
      </CheckConfiguration>
    )
  },

  renderAccount: function() {
    if (this.isServiceMisconfigured()) {
      return
    }

    if (this.state.loading) {
      return (
        <Hint loading>
          {i18n('Loading account configuration')}
        </Hint>
      )
    }

    var { model, ...rest } = this.props

    return (
      <AccountConfig
        service={model.get('type').getService()}
        account={model.get('account')}
        hideAccount={this.hideAccounts()}
        {...rest}
        onAdd={this.handleAdd}
        onSelect={this.handleSelect}
      />
    )
  },

  renderContent: function() {
    if (this.state.loading || this.isServiceMisconfigured()) {
      return
    }

    var account = this.props.model.get('account')

    if (account) {
      if (!account.collection) {
        return (
          <div className="account-error">
            <Hint danger>
              {i18n(
                "The account you configured doesn't exist anymore. Please choose another one."
              )}
            </Hint>
          </div>
        )
      }

      if (account.get('needsAuthorization')) {
        return (
          <div className="account-error">
            <Hint danger>
              {i18n(
                'This action no longer works as the authorization of this account has expired. ' +
                  'Reauthorize or choose another account to fix this.'
              )}{' '}
            </Hint>

            <IconButton primary icon="reload" onClick={this.reauthorize}>
              {i18n('Click to reauthorize')}
            </IconButton>
          </div>
        )
      }
    }

    // TODO: remove this hack when Signavio activities also
    // have an account assigned to them
    if (
      !account &&
      this.props.model.get('type').getService().get('key') !== 'signavio'
    ) {
      return
    }

    return (
      <List>
        {this.props.children}

        {this.renderConfiguration()}
        {this.renderParameters()}
        {this.props.bottomChildren}
      </List>
    )
  },

  renderParameters: function() {
    var parameters = this.props.model
      .get('type')
      .get('inputDescriptors')
      .filter(descriptor => {
        return !descriptor.get('hidden') && !descriptor.get('fixed')
      })

    if (parameters.length === 0) {
      return
    }

    return (
      <Parameters
        model={this.props.model}
        collection={parameters}
        readOnly={this.props.readOnly}
        onChange={() => this.props.model.save()}
      />
    )
  },

  handleSelect: function(account) {
    this.props.model.setAccount(account)
    this.props.model.save()
  },

  handleAdd: function() {
    this.props.model.addAccount()
  },

  reauthorize: function() {
    this.props.model.refreshAccount()
  },

  hasAccount: function() {
    var accounts = this.props.model.get('type').getService().get('accounts')

    return accounts && accounts.length > 0
  },

  hideAccounts: function() {
    return _.includes(
      HIDE_ACCOUNTS,
      this.props.model.get('type').getService().get('key')
    )
  },

  renderConfiguration: function() {
    if (!this.hideAccounts() && !this.hasAccount()) {
      return
    }

    const { model, readOnly } = this.props

    var configurationForm = model.get('type').get('configurationForm')
    if (!configurationForm) {
      return
    }

    return (
      <div className="application-configuration">
        <Form
          hideDoneButton
          narrowLabels
          readOnly={readOnly}
          fields={setValues(
            configurationForm.get('fields'),
            model.get('configuration')
          )}
          onChange={this.saveConfiguration}
        />
      </div>
    )
  },

  saveConfiguration: function(fields) {
    this.props.model.set(
      'configuration',
      reduce(
        fields,
        (values, field) => ({
          ...values,
          [field.key || field.id]: field.value,
        }),
        {}
      )
    )
    this.props.model.save()
  },
})

const setValues = (fields, values = {}) =>
  reduce(
    fields,
    (result, field) => [
      ...result,

      {
        ...field,
        id: field.id || field.key,
        value: values[field.key || field.id] || field.value,
      },
    ],
    []
  )



// WEBPACK FOOTER //
// ./src/activities/views/activities/service/ServiceActionView.js