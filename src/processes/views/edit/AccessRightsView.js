import _ from 'underscore'
import PropTypes from 'prop-types'
import React from 'react'
import createReactClass from 'create-react-class'
import i18n from 'i18n'

import Process from 'processes/models/Process'
import { BaseMixin } from 'commons-mixins'
import Login from 'singleton/Login'

import { Rights } from '../../../../packages/access'

import { Confirm, Feature, Divider } from 'commons-components'
import { IconButton } from 'commons-components/buttons'

import { getAccessDefinition } from '../../utils'

module.exports = createReactClass({
  displayName: 'ProcessAccessRights',

  mixins: [BaseMixin],

  propTypes: {
    model: PropTypes.instanceOf(Process).isRequired,
  },

  getInitialState: function() {
    return {
      confirmPublic: false,
    }
  },

  render: function() {
    return (
      <Feature feature="Component.AccessRights">
        <div className="process-rights">
          {this.renderDescription()}
          {this.renderConfiguration()}

          {this.renderConfirmModal()}
        </div>
      </Feature>
    )
  },

  renderDescription: function() {
    if (this.props.model.isPrivate()) {
      return
    }

    return (
      <div className="description">
        {i18n(
          'This process is currently public, which has the following implications:'
        )}

        {this.renderImplications()}
        {this.renderVisibilityButton()}
      </div>
    )
  },

  renderConfiguration: function() {
    const { model, readOnly } = this.props

    if (!this.props.model.isPrivate()) {
      return
    }

    return (
      <div className="configuration">
        <p>
          {i18n(
            'This is a private process, which means the access to this process is restricted. Use the following table to specify which users and groups can perform certain actions on this process.'
          )}
        </p>

        <Rights
          readOnly={readOnly}
          onChange={this.handleAccessChange}
          definition={getAccessDefinition()}
          access={model.get('access')}
          fixedEntries={[model.get('owner').id]}
        />

        <Divider />

        {this.renderVisibilityButton()}
      </div>
    )
  },

  renderVisibilityButton: function() {
    if (this.props.readOnly) {
      return
    }

    if (this.props.model.isPrivate()) {
      return (
        <IconButton
          iconSet="fontAwesome"
          icon="globe"
          onClick={this.makePublic}
        >
          {i18n('Make this process public')}
        </IconButton>
      )
    }

    return (
      <IconButton iconSet="fontAwesome" icon="lock" onClick={this.makePrivate}>
        {i18n('Make this process private')}
      </IconButton>
    )
  },

  renderConfirmModal: function() {
    if (!this.state.confirmPublic) {
      return
    }

    return (
      <Confirm
        danger
        title={i18n('Really make this process public?')}
        onCancel={this.hideModal}
        onConfirm={this.confirmSetPublic}
      >

        {this.renderImplications()}
      </Confirm>
    )
  },

  renderImplications: function() {
    return (
      <ul>
        <li key={0}>
          {i18n('**Everybody** in the organization can edit this process', {
            markdown: true,
          })}
        </li>
        <li key={4}>
          {i18n(
            '**Everybody** in the organization can create reports for this process',
            {
              markdown: true,
            }
          )}
        </li>
        <li key={1}>
          {i18n('**Everybody** in the organization can start this process', {
            markdown: true,
          })}
        </li>
        <li key={3}>
          {i18n('**Everybody** in the organization can see this process', {
            markdown: true,
          })}
        </li>
        <li key={2}>
          {i18n(
            '**Everybody** in the organization can see cases of this process',
            {
              markdown: true,
            }
          )}
        </li>
      </ul>
    )
  },

  makePrivate: function() {
    this.props.model.makePrivate(
      _.uniq([Login.user(), this.props.model.get('owner')])
    )
    this.props.model.save()

    if (this.props.onAccessChange) {
      this.props.onAccessChange()
    }
  },

  makePublic: function() {
    this.setState({
      confirmPublic: true,
    })
  },

  confirmSetPublic: function() {
    this.setState({
      confirmPublic: false,
    })

    this.props.model.makePublic()
    this.props.model.save()
  },

  handleAccessChange(access) {
    this.props.model.set('access', access)
    this.props.model.save()
  },

  hideModal: function() {
    this.setState({
      confirmPublic: false,
    })
  },
})



// WEBPACK FOOTER //
// ./src/processes/views/edit/AccessRightsView.js