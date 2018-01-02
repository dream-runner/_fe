import i18n from 'i18n'
import PropTypes from 'prop-types'
import React from 'react'
import { compose } from 'recompose'

import createReactClass from 'create-react-class'

import Router from 'singleton/Router'

import { BaseMixin } from '@signavio/effektif-commons/lib/mixins'
import { Tab, TabBar } from '@signavio/effektif-commons/lib/components/tabs'
import {
  ErrorDetails,
  DocumentTitle,
} from '@signavio/effektif-commons/lib/components'
import { Alert, Hint } from '@signavio/effektif-commons/lib/components/hints'
import { padding } from '@signavio/effektif-commons/lib/styles'

import Process from '../models/Process'
import Trigger from './edit/TriggerView'
import Actions from './edit/ActionsView'
import Details from './edit/Details'
import Versions from './edit/VersionsView'
import Header from './edit/HeaderView'

import { Process as ProcessType } from '../propTypes'

import { withOrganization, withUser } from '../../../packages/api'

/**
 * A view to edit a process model
 *
 */
const ProcessEdit = createReactClass({
  displayName: 'ProcessEdit',

  mixins: [BaseMixin],

  propTypes: {
    model: PropTypes.instanceOf(Process).isRequired,
    tab: PropTypes.oneOf([
      'trigger',
      'actions',
      'details',
      'versions',
      'variables',
    ]).isRequired,
    sub: PropTypes.string,
    activityId: PropTypes.string,
  },

  childContextTypes: {
    process: ProcessType,
    readOnly: PropTypes.bool,
  },

  getChildContext: function() {
    return {
      process: this.props.model.toJSON(),
      readOnly: this.isReadOnly(),
    }
  },

  getInitialState: function() {
    return {
      serverError: false,
      conflict: false,
    }
  },

  componentWillMount: function() {
    const { model } = this.props

    model.on('servererror', () => {
      this.setState({
        serverError: true,
      })
    })

    model.on('conflict', () => {
      this.setState({
        conflict: true,
      })
    })

    window.addEventListener('error', this.handleClientError)
  },

  componentDidUpdate() {
    const { model, user, organization } = this.props

    if (!model.hasRight('edit', user) && model.isLockedTo(user)) {
      model.unlock(true, user, organization)
    }
  },

  componentWillUnmount: function() {
    this.props.model.off(null, null, this)
    window.removeEventListener('error', this.handleClientError)
  },

  render: function() {
    return (
      <div className="view process-edit">
        <DocumentTitle
          title={i18n('Process - __name__', {
            name: this.props.model.get('name'),
          })}
        />

        {this.renderHeader()}
        {this.renderContent()}

        {this.renderError()}
      </div>
    )
  },

  renderError: function() {
    const { serverError, conflict, clientError } = this.state

    if (serverError) {
      return (
        <Alert
          title={i18n('Server error')}
          onDismiss={() => this.setState({ serverError: false })}
        >
          <Hint warning>
            {i18n(
              'We could not save your process. Please reload the page and try again. If the problem persists [contact our support](mailto:support@signavio.com).',
              { markdown: true }
            )}
          </Hint>
        </Alert>
      )
    }

    if (clientError) {
      return (
        <Alert
          title={i18n('Application error')}
          onDismiss={() => window.location.reload()}
        >
          <ErrorDetails debug>
            <pre>{clientError}</pre>
            <p>
              {i18n(
                'An error occurred while you were working on this process.'
              )}
              {i18n(
                " To ensure that you don't lose any information, please reload the page."
              )}
            </p>
          </ErrorDetails>
        </Alert>
      )
    }

    if (conflict) {
      return (
        <Alert
          title={i18n('Conflict')}
          onDismiss={() => window.location.reload()}
        >
          <Hint warning>
            {i18n(
              'We could not save your process because you are working on an outdated version. Please reload the page to get to the newest version.'
            )}
          </Hint>
        </Alert>
      )
    }
  },

  renderHeader: function() {
    return (
      <div className="view-header">
        <Header
          model={this.props.model}
          tab={this.props.tab}
          readOnly={this.isReadOnly()}
        />

        {this.renderTabs()}
      </div>
    )
  },

  renderContent: function() {
    var renderTab = {
      trigger: this.renderTrigger,
      actions: this.renderActions,
      details: this.renderDetails,
      variables: this.renderDetails,
      versions: this.renderPublish,
    }[this.props.tab]
    return <div className="view-content process-edit-body">{renderTab()}</div>
  },

  renderTabs: function() {
    return (
      <TabBar style={{ marginTop: padding.large }}>
        {this.renderTab('trigger', i18n('Trigger'))}
        {this.renderTab('actions', i18n('Actions'))}
        {this.renderTab('details', i18n('Details'))}
        {this.renderTab('versions', i18n('Versions'))}
      </TabBar>
    )
  },

  renderTab: function(tab, label) {
    return (
      <a
        href={Router.reverse('process', {
          id: this.props.model.get('id'),
          tab: tab,
        })}
      >
        <Tab active={this.props.tab === tab}>{label}</Tab>
      </a>
    )
  },

  renderTrigger: function() {
    return (
      <Trigger
        model={this.props.model}
        services={this.props.services}
        readOnly={this.isReadOnly()}
      />
    )
  },

  renderActions: function() {
    return (
      <Actions
        model={this.props.model}
        services={this.props.services}
        readOnly={this.isReadOnly()}
        tab={this.props.sub}
        activityId={this.props.activityId}
      />
    )
  },

  renderDetails: function() {
    return (
      <Details
        model={this.props.model}
        tab={!!this.props.sub ? this.props.sub : undefined}
        readOnly={this.isReadOnly()}
      />
    )
  },

  renderPublish: function() {
    return <Versions model={this.props.model} readOnly={this.isReadOnly()} />
  },

  isReadOnly: function() {
    if (this.props.readOnly) {
      return true
    }

    return (
      !this.props.model.hasRight('edit', this.props.user) ||
      !this.props.model.isLockedTo(this.props.user)
    )
  },

  handleClientError: function(error) {
    this.setState({ clientError: error.message })
  },
})

module.exports = compose(withUser, withOrganization)(ProcessEdit)



// WEBPACK FOOTER //
// ./src/processes/views/EditView.js