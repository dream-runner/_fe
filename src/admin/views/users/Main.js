import React from 'react'
import createReactClass from 'create-react-class'
import i18n from 'i18n'

import { BaseMixin } from 'commons-mixins'
import { Hint, Group } from 'commons-components'

import Router from 'singleton/Router'

import UserSelect from './Select'
import UserDetails from './Details'

module.exports = createReactClass({
  displayName: 'ManageUsers',

  mixins: [BaseMixin],

  render: function() {
    return (
      <div className="manage-users">
        <div className="row">
          <div className="col-md-3">
            <Group title={i18n('User')}>
              <UserSelect
                value={this.props.user}
                onChange={this.handleUserChange}
              />
            </Group>
          </div>

          <div className="col-md-9">
            {this.renderUser()}
          </div>
        </div>
      </div>
    )
  },

  renderUser: function() {
    if (!this.props.user) {
      return (
        <Hint view={true}>
          {i18n('No user selected.')}
        </Hint>
      )
    }

    return <UserDetails model={this.props.user} events={this.props.events} />
  },

  handleUserChange: function(user) {
    var url

    if (user) {
      url = Router.reverse('admin_users', { id: user.id })
    } else {
      url = Router.reverse('admin_users')
    }

    Router.navigate(url, {
      trigger: true,
    })
  },
})



// WEBPACK FOOTER //
// ./src/admin/views/users/Main.js