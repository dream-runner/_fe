import React, { Component } from 'react'
import i18n from 'signavio-i18n'
import { compose } from 'recompose'

import { connect, types } from '@signavio/effektif-api'

import { defaultStyle } from '@signavio/effektif-commons/lib/styles'
import {
  List,
  Remove,
  Select,
  Feature,
} from '@signavio/effektif-commons/lib/components'
import { IconButton } from '@signavio/effektif-commons/lib/components/buttons'
import { Hint } from '@signavio/effektif-commons/lib/components/hints'
import { Tile } from '@signavio/effektif-commons/lib/components/tiles'

import connectToAPI from '../../models/LdapConfigurationAPI'

import ConfigurationForm from './ConfigurationForm'
import ValidationResult from './ValidationResult'
import SynchronisationResult from './SynchronisationResult'

/**
 * Main component which wraps the configuration UI for the LDAP connection, as well
 * as visualisation of validation and synchronisation results.
 */
class Configuration extends Component {
  constructor() {
    super(...arguments)
    this.state = {
      type: 'activeDirectory',
      loading: false,
      validating: false,
      synchronising: false,
    }
    this.handleCreate = this.handleCreate.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleValidation = this.handleValidation.bind(this)
    this.handleSynchronisation = this.handleSynchronisation.bind(this)
  }

  componentDidMount() {
    this.fetchConfiguration()
  }

  hasConfiguration() {
    return !!this.state.configuration
  }

  hasValidConfiguration() {
    const { configuration } = this.state

    return configuration && configuration.valid
  }

  canChangeConfiguration() {
    const { loading, validating, synchronising } = this.state

    return !loading && !validating && !synchronising
  }

  render() {
    return (
      <Feature feature="Component.LdapSynchronisation">
        <div>
          {this.renderHeader()}
          <div className="row">
            <div className="col-sm-6">{this.renderConfigurationForm()}</div>
            <div className="col-sm-6">
              {this.renderActions()}
              {this.renderValidationResult()}
              {this.renderSynchronisationResult()}
            </div>
          </div>
        </div>
      </Feature>
    )
  }

  renderHeader() {
    return (
      <div>
        <h3 {...this.props.style('header')}>
          {i18n('User and group synchronisation')}
        </h3>
        <Hint inline style={this.props.style('description')}>
          {i18n(
            'You can synchronise your users and groups with a directory service like Active Directory. You have to fill in the configuration and run the validation before you can start the synchronisation.'
          )}
        </Hint>
        {this.renderLoading()}
        {this.renderError()}
      </div>
    )
  }

  renderLoading() {
    if (!this.state.loading) {
      return
    }
    return <Hint loading>{i18n('Loading LDAP configuration...')}</Hint>
  }

  renderError() {
    if (!this.state.error) {
      return
    }
    return <Hint warning>{this.state.error}</Hint>
  }

  renderConfigurationForm() {
    const { fetchLicenses } = this.props
    const { loading, configuration, type } = this.state

    if (loading) {
      return
    }

    if (!configuration) {
      return (
        <Select
          label={i18n('Directory Service')}
          options={[{ id: 'activeDirectory', value: i18n('Active Directory') }]}
          value={type}
          onChange={newType => {
            this.setState({ type: newType })
          }}
        />
      )
    }

    if (fetchLicenses.pending) {
      return <Hint loading>{i18n('Loading licenses...')}</Hint>
    }

    return (
      <ConfigurationForm
        configuration={configuration}
        licenses={fetchLicenses.value}
        readOnly={!this.canChangeConfiguration()}
        onChange={this.handleChange}
      />
    )
  }

  renderActions() {
    const { loading, configuration, validating, synchronising } = this.state

    if (loading) {
      return
    }

    if (!configuration) {
      return (
        <Tile>
          <IconButton light icon="plus" onClick={this.handleCreate}>
            {i18n('Add')}
          </IconButton>
        </Tile>
      )
    }

    return (
      <Tile toolbar={<Remove light onRemove={this.handleDelete} />}>
        <List direction="horizontal">
          <IconButton
            light
            icon="check"
            onClick={this.handleValidation}
            disabled={!!validating || !!synchronising}
          >
            {i18n('Validate')}
          </IconButton>
          <IconButton
            light
            icon="refresh"
            onClick={this.handleSynchronisation}
            disabled={!!validating || !!synchronising || !configuration.valid}
          >
            {i18n('Synchronise')}
          </IconButton>
        </List>
      </Tile>
    )
  }

  renderValidationResult() {
    const { loading, validationResult, validating } = this.state

    if (loading || (!validationResult && !validating)) {
      return
    }

    return <ValidationResult result={validationResult} loading={validating} />
  }

  renderSynchronisationResult() {
    const { loading, synchronisationResult, synchronising } = this.state

    if (loading || (!synchronisationResult && !synchronising)) {
      return
    }

    return (
      <SynchronisationResult
        result={synchronisationResult}
        loading={synchronising}
      />
    )
  }

  fetchConfiguration() {
    this.setState({
      loading: true,
    })

    this.props.api
      .get()
      .then(configuration => this.setState({ loading: false, configuration }))
      .catch(error => this.setState({ loading: false, error }))
  }

  handleCreate(ev) {
    ev.preventDefault()
    ev.stopPropagation()

    const { loading, type } = this.state
    const { model } = this.props

    if (!loading) {
      this.setState({
        loading: true,
      })
      // create an empty configuration
      this.props.api
        .create({
          organizationId: model.id,

          type,
        })
        .then(configuration => this.setState({ loading: false, configuration }))
        .catch(error => this.setState({ loading: false, error }))
    }
  }

  handleChange(newConfiguration) {
    this.setState({
      configuration: newConfiguration,
    })

    const { configuration } = this.state

    this.props.api
      .update(newConfiguration)
      .then(({ valid }) => {
        if (configuration && configuration.valid !== valid) {
          // just update the validate state
          // could possibly lead to update bugs
          this.setState({
            configuration: {
              ...configuration,

              valid,
            },
          })
        }
      })
      .catch(error => this.setState({ error }))
  }

  handleValidation() {
    this.setState({
      validating: true,
      validationResult: null,
      synchronisationResult: null,
    })

    const { configuration } = this.state

    this.props.api.validate().then(result =>
      this.setState({
        validating: false,
        validationResult: result,
        configuration: {
          ...configuration,

          valid: result.valid,
        },
      })
    )
  }

  handleSynchronisation() {
    this.setState({
      synchronising: true,
      validationResult: null,
      synchronisationResult: null,
    })
    this.props.api
      .synchronise()
      .then(synchronisationResult =>
        this.setState({ synchronising: false, synchronisationResult })
      )
  }

  handleDelete() {
    this.setState({
      loading: true,
    })

    this.props.api.delete().then(() =>
      this.setState({
        loading: false,
        configuration: null,
        validationResult: null,
        synchronisationResult: null,
      })
    )
  }
}

export default compose(
  connect(() => ({
    fetchLicenses: {
      type: types.LICENSES,
    },
  })),
  defaultStyle(({ padding }) => ({
    header: {
      paddingBottom: padding.normal,
    },

    description: {
      paddingBottom: padding.normal,
    },
  })),
  connectToAPI
)(Configuration)



// WEBPACK FOOTER //
// ./src/organizations/views/ldap/Configuration.js