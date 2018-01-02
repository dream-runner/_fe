import PropTypes from 'prop-types'
import React from 'react'
import createReactClass from 'create-react-class'
import i18n from 'i18n'
import Login from 'singleton/Login'

import User from 'users/models/User'

import { BaseMixin } from 'commons-mixins'

import { Disable, Hint, Confirm } from 'commons-components'

import { UserSelect } from '../../../../packages/organizations'

import { grantRights } from '../../../../packages/access'

import { getAccessDefinition } from '../../utils'

module.exports = createReactClass({
  displayName: 'ChangeOwner',

  mixins: [BaseMixin],

  propTypes: {
    model: PropTypes.object.isRequired,

    readOnly: PropTypes.bool,
  },

  componentWillUnmount: function() {
    this.props.model.off(null, null, this)
  },

  getInitialState: function() {
    return {
      newOwner: null,
      changing: false,
    }
  },

  render: function() {
    const { model } = this.props

    return (
      <div className="change-owner">
        <Disable
          disabled={this.isDisabled()}
          hint={i18n(
            'Only the owner himself can transfer ownership to someone else.'
          )}
        >
          <UserSelect
            ref="select"
            readOnly={this.props.readOnly || this.isDisabled()}
            value={model.get('owner')}
            onUserSelect={this.handleUserSelect}
          />
        </Disable>

        {this.renderConfirmDialog()}
        {this.renderChangeHint()}
      </div>
    )
  },

  renderConfirmDialog: function() {
    if (!this.state.newOwner || this.state.changing) {
      return
    }

    return (
      <Confirm
        title={i18n('Transfer ownership')}
        danger
        onCancel={this.abort}
        onConfirm={this.transfer}
      >
        <p>
          {i18n(
            'Are you sure you want to transfer the owner ship of the process *__process__* to *__user__*?',
            {
              markdown: true,
              process: this.props.model.get('name'),
              user: this.state.newOwner.name(),
            }
          )}
        </p>

        {i18n('This action cannot be undone.')}
      </Confirm>
    )
  },

  abort: function() {
    this.setState({
      newOwner: null,
    })
  },

  transfer: function() {
    this.setState({
      changing: true,
    })

    const { model } = this.props

    if (model.isPrivate()) {
      const definition = getAccessDefinition().rights.edit
      const access = grantRights(
        model.get('access'),
        ['edit'].concat(definition.implies),
        {
          id: this.state.newOwner.id,
          type: 'user',
        }
      )

      model.set('access', access)
    }

    this.updateOwner()
  },

  updateOwner: function() {
    this.props.model.once(
      'sync',
      function() {
        this.setState({
          changing: false,
          newOwner: false,
        })
      },
      this
    )

    this.props.model.set('owner', this.state.newOwner)
    this.props.model.save()
  },

  renderChangeHint: function() {
    if (!this.state.changing) {
      return
    }

    return (
      <Hint modal loading>
        {i18n('Transferring the ownership to *__user__*...', {
          markdown: true,
          user: this.state.newOwner.name(),
        })}
      </Hint>
    )
  },

  handleUserSelect: function(user) {
    if (user.id !== this.props.model.get('ownerId')) {
      this.setState({
        newOwner: new User(user),
      })
    }
  },

  isDisabled: function() {
    if (this.props.readOnly) {
      return false
    }

    var rights = this.props.model.getRights(Login.user())

    if (!this.props.model.get('owner')) {
      return !rights.edit
    }

    return this.props.model.get('owner').id !== Login.user().id
  },
})



// WEBPACK FOOTER //
// ./src/processes/views/edit/ChangeOwnerView.js