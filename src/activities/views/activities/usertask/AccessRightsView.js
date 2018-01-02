// @flow
import React from 'react'
import createReactClass from 'create-react-class'
import { compose, withProps } from 'recompose'
import { unionBy } from 'lodash'

import i18n from 'signavio-i18n'

import { BaseMixin } from 'commons-mixins'
import { padding } from 'commons-style'
import { Hint, Confirm, Disable } from 'commons-components'
import { IconButton } from 'commons-components/buttons'

import { withUser } from '../../../../../packages/api'
import { Rights } from '../../../../../packages/access'

import { getAccessDefinition } from '../../../utils'

import { ConfigurationBody } from '../components'

const AccessRights = createReactClass({
  displayName: 'UserTaskAccessRights',

  mixins: [BaseMixin],

  getInitialState() {
    return {
      showConfirmation: false,
    }
  },

  render() {
    const isPrivate = this.isPrivate()

    return (
      <ConfigurationBody>
        {this.renderRights()}

        <div
          style={{
            textAlign: isPrivate ? 'right' : 'center',
          }}
        >
          {this.renderMakePrivateButton()}
          {this.renderMakePublicButton()}
        </div>

        {this.renderConfirmation()}
      </ConfigurationBody>
    )
  },

  renderRights() {
    const { user, model, readOnly, defaults } = this.props

    if (!model.getProcess().isPrivate() && !this.isPrivate()) {
      return (
        <Hint info={true}>
          {i18n('The access for this task is not restricted.')}
        </Hint>
      )
    }

    const access = this.isPrivate()
      ? model.get('access')
      : this.getDefaultAccess(user)

    return (
      <Disable disabled={readOnly || !this.isPrivate()}>
        <Rights
          access={access}
          definition={getAccessDefinition()}
          readOnly={readOnly}
          onChange={this.handleRightsChange}
          defaults={defaults}
        />
      </Disable>
    )
  },

  handleRightsChange(access) {
    this.props.model.set('access', access)
    this.props.model.save()
  },

  getDefaults() {
    return
  },

  renderMakePublicButton() {
    if (!this.isPrivate()) {
      return
    }

    return (
      <IconButton
        iconSet="fontAwesome"
        style={{ marginTop: padding.normal }}
        icon="globe"
        disabled={this.props.readOnly}
        onClick={this.requestConfirmation}
      >
        {i18n('Remove specific access')}
      </IconButton>
    )
  },

  renderConfirmation() {
    if (!this.state.showConfirmation) {
      return
    }

    return (
      <Confirm
        danger
        title={i18n('Really remove specific access rights?')}
        onCancel={this.hideModal}
        onConfirm={this.makePublic}
      >
        {i18n(
          'Are you sure you want to remove the specific access rights from this task? After this action the task will use the defaults which are specified through the "Edit cases" and "View cases" rights on the process.'
        )}
      </Confirm>
    )
  },

  hideModal() {
    this.trySetState({
      showConfirmation: false,
    })
  },

  requestConfirmation() {
    this.trySetState({
      showConfirmation: true,
    })
  },

  makePublic() {
    this.props.model.set('access', null)

    this.trySetState({
      showConfirmation: false,
    })
  },

  renderMakePrivateButton() {
    if (this.isPrivate()) {
      return
    }

    return (
      <IconButton
        iconSet="fontAwesome"
        icon="lock"
        style={{ marginTop: padding.normal }}
        disabled={this.props.readOnly}
        onClick={this.makePrivate}
      >
        {i18n('Define specific access')}
      </IconButton>
    )
  },

  makePrivate() {
    const { model, user } = this.props

    model.set('access', this.getDefaultAccess(user))
    model.save()
  },

  isPrivate() {
    return !!this.props.model.get('access')
  },

  getDefaultAccess(user) {
    const process = this.props.model.getProcess()
    const access = (process && process.get('access')) || {}

    if (!user) {
      return {
        edit: access.casesEdit || [],
        view: access.casesView || [],
      }
    }

    return {
      edit: unionBy(access.casesEdit, [{ id: user.id, type: 'user' }], 'id'),
      view: unionBy(access.casesView, [{ id: user.id, type: 'user' }], 'id'),
    }
  },
})

export default compose(
  withUser,
  withProps(() => ({
    defaults: [
      {
        title: i18n(
          'Assignees will be able to **view** and **complete** this task.',
          {
            markdown: true,
          }
        ),
      },
      {
        title: i18n(
          'Candidates will be able to **view** and **assign** this task.',
          {
            markdown: true,
          }
        ),
      },
    ],
  }))
)(AccessRights)



// WEBPACK FOOTER //
// ./src/activities/views/activities/usertask/AccessRightsView.js