import React from 'react'
import createReactClass from 'create-react-class'
import i18n from 'i18n'

import { BaseMixin } from 'commons-mixins'
import { Confirm, Hint } from '@signavio/effektif-commons/lib/components'
import { IconButton } from '@signavio/effektif-commons/lib/components/buttons'

module.exports = createReactClass({
  displayName: 'DisableEntity',

  mixins: [BaseMixin],

  getInitialState: function() {
    return {
      enabling: false,
      disabling: false,
      failed: false,
    }
  },

  componentDidUpdate: function(prevProps, prevState) {
    if (
      (prevState.enabling && !this.state.enabling) ||
      (prevState.disabling && !this.state.disabling)
    ) {
      this.props.model.off('error', null, this)
    }
  },

  render: function() {
    return (
      <span className="disable-entity">
        {this.renderButton()}

        {this.renderConfirmation()}
        {this.renderDisableHint()}
        {this.renderErrorMessage()}
      </span>
    )
  },

  renderConfirmation: function() {
    if (!this.state.confirm) {
      return
    }

    return (
      <Confirm onCancel={this.cancel} onConfirm={this.confirm}>
        <Hint warning>
          {this.state.message}
        </Hint>
      </Confirm>
    )
  },

  cancel: function() {
    this.setState({
      confirm: false,
      message: '',
    })
  },

  confirm: function() {
    this.setState({
      confirm: false,
      message: '',
    })

    this.state.action()
  },

  renderButton: function() {
    if (this.props.model.get('disabled')) {
      return (
        <IconButton light icon="check" onClick={this.requestEnable}>
          {i18n('Enable')}
        </IconButton>
      )
    }

    return (
      <IconButton light icon="cancel" onClick={this.requestDisable}>
        {i18n('Disable')}
      </IconButton>
    )
  },

  renderDisableHint: function() {
    if (this.state.disabling) {
      return (
        <Hint modal={true} loading={true}>
          {i18n('Disabling __entity__...', {
            entity: this.props.name,
          })}
        </Hint>
      )
    }

    if (this.state.enabling) {
      return (
        <Hint modal={true} loading={true}>
          {i18n('Enabling __entity__...', {
            entity: this.props.name,
          })}
        </Hint>
      )
    }
  },

  renderErrorMessage: function() {
    if (!this.state.failed) {
      return
    }

    return (
      <Hint modal={true} error={true} onDismiss={this.resetError}>
        <p>
          {i18n(
            'The operation could not be performed for __entity__. The server responded with the followign error:',
            {
              entity: this.props.name,
            }
          )}
        </p>

        <pre>
          {this.state.errorMessage}
        </pre>
      </Hint>
    )
  },

  resetError: function() {
    this.setState({
      failed: false,
      errorMessage: '',
    })
  },

  handleError: function(response) {
    this.setState({
      failed: true,
      enabling: false,
      disabling: false,
      errorMessage: response.message,
    })
  },

  watchForErrors: function() {
    this.props.model.once('error', this.handleError, this)
  },

  requestDisable: function() {
    this.setState({
      confirm: true,
      action: this.disable,
      message: i18n('Do you really want to disable __entity__?', {
        entity: this.props.name,
      }),
    })
  },

  disable: function() {
    this.setState({
      disabling: true,
    })

    this.watchForErrors()

    this.props.model.once(
      'action:disable',
      function() {
        this.setState({
          disabling: false,
        })

        this.props.model.set('disabled', true)
      },
      this
    )

    this.props.model.action('disable')
  },

  requestEnable: function() {
    this.setState({
      confirm: true,
      action: this.enable,
      message: i18n('Do you really want to enable __entity__?', {
        entity: this.props.name,
      }),
    })
  },

  enable: function() {
    this.setState({
      enabling: true,
    })

    this.watchForErrors()

    this.props.model.once(
      'action:enable',
      function() {
        this.setState({
          enabling: false,
        })

        this.props.model.set('disabled', false)
      },
      this
    )

    this.props.model.action('enable')
  },
})



// WEBPACK FOOTER //
// ./src/admin/views/DisableEntityView.js