import PropTypes from 'prop-types'
import React from 'react'
import createReactClass from 'create-react-class'
import i18n from 'signavio-i18n'
import { compose } from 'recompose'

import { Hint } from '@signavio/effektif-commons/lib/components/hints'
import { Modal } from '@signavio/effektif-commons/lib/components'
import { padding } from '@signavio/effektif-commons/lib/styles'

import { BaseMixin } from '@signavio/effektif-commons/lib/mixins'

import { Avatar } from '../../../packages/organizations'
import { withOrganization, withUser } from '../../../packages/api'

import Process from '../models/Process'

const ProcessLoadView = createReactClass({
  displayName: 'ProcessLoadView',

  mixins: [BaseMixin],

  propTypes: {
    model: PropTypes.instanceOf(Process).isRequired,
    readOnly: PropTypes.bool,
    loadingMessage: PropTypes.string,
  },

  getDefaultProps: function() {
    return {
      readOnly: false,
    }
  },

  getInitialState: function() {
    return {
      loading: true,
      readOnly: this.props.readOnly,
    }
  },

  componentWillMount: function() {
    this.syncSaveAndUnlock = this.saveAndUnlock.bind(null, false)

    if (window.onbeforeunload) {
      window.addEventListener('beforeunload', this.syncSaveAndUnlock)
    } else {
      window.addEventListener('unload', this.syncSaveAndUnlock)
    }

    this.loadProcess(this.props.model)
    this.props.model.on('lostlock', this.handleLostLock, this)
  },

  componentWillReceiveProps: function(nextProps) {
    if (nextProps.model !== this.props.model) {
      if (this.props.model) {
        this.saveAndUnlock()
        this.props.model.off('lostlock', this.handleLostLock)
      }
      this.loadProcess(nextProps.model)

      nextProps.model.on('lostlock', this.handleLostLock, this)
    }
  },

  componentWillUnmount: function() {
    this.props.model.off(null, null, this)

    if (window.onunload) {
      window.removeEventListener('unload', this.syncSaveAndUnlock)
    } else {
      window.removeEventListener('beforeunload', this.syncSaveAndUnlock)
    }
    this.saveAndUnlock()
  },

  loadProcess(process) {
    this.setState({
      loading: true,
      showLockedModal: null,
    })

    process.load(() => this.handleProcessLoaded())
  },

  handleProcessLoaded: function() {
    var rights = this.props.model.getRights(this.props.user)
    var readOnly = this.props.readOnly || !rights.edit

    this.setState({
      loading: false,
      showLockedModal: readOnly
        ? false
        : this.props.model.isLocked()
          ? !this.props.model.isLockedTo(this.props.user)
          : null,
    })
  },

  handleLostLock: function() {
    this.setState({
      showLostLockModal: true,
    })
  },

  render: function() {
    if (this.state.loading) {
      return (
        <Hint loading view>
          {this.props.loadingMessage ||
            i18n('Loading additional information for this process...')}
        </Hint>
      )
    }

    return (
      <div>
        {this.props.children}
        {this.renderLockedModal()}
        {this.renderLostLockModal()}
      </div>
    )
  },

  renderLockedModal() {
    if (!this.state.showLockedModal) {
      return
    }

    var editor = this.props.model.get('editor')
    var user = editor && (
      <span>
        <Avatar
          style={{
            display: 'inline-block',
            margin: `-10px ${padding.normal}px -10px -10px`,
          }}
          user={editor.toJSON()}
        />
        {this.props.model.get('editor').name()}
      </span>
    )

    return (
      <Modal
        title={
          editor
            ? i18n('__user__ is currently editing this process.', { user })
            : i18n('Someone is currently editing this process.')
        }
        onRequestHide={this.hideLockedModal}
      >
        <Hint warning>
          {i18n(
            "Only one user at a time is allowed to edit this process. You can look around, but you won't be able to change anything."
          )}
        </Hint>
      </Modal>
    )
  },

  renderLostLockModal() {
    if (!this.state.showLostLockModal) {
      return
    }

    return (
      <Modal
        onRequestHide={this.hideLostLockModal}
        title={i18n(
          'Sorry, you are not working on the latest version of the process'
        )}
      >
        <Hint warning>
          {i18n(
            'This process is being edited somewhere else. You might have it open in another tab. ' +
              'Reload the page to be able to edit again.'
          )}
        </Hint>
      </Modal>
    )
  },

  saveAndUnlock: function(async = true) {
    const { model, user, organization } = this.props

    if (model.isLockedTo(user)) {
      model.ensureSaved({ async }) // in case there's still an outstanding debounced save
      model.unlock(async, user, organization)
    }
  },

  hideLockedModal: function() {
    this.setState({
      showLockedModal: false,
    })
  },

  hideLostLockModal: function() {
    this.setState({
      showLostLockModal: false,
    })
  },
})

module.exports = compose(withUser, withOrganization)(ProcessLoadView)



// WEBPACK FOOTER //
// ./src/processes/views/LoadView.js