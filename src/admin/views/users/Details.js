import React from 'react'
import createReactClass from 'create-react-class'
import i18n from 'signavio-i18n'

import { BaseMixin } from '@signavio/effektif-commons/lib/mixins'
import { List } from '@signavio/effektif-commons/lib/components'
import { Hint } from '@signavio/effektif-commons/lib/components/hints'

import { Events } from '../../../../packages/admin'

import { UserDetails } from '../../../../packages/organizations'

import Organizations from 'users/views/OrganizationsView'

import AuthQuery from '../../models/params/AuthQuery'

import { Item as AuthItem } from '../licenses/components'
import Toolbar from '../Toolbar'

export default createReactClass({
  displayName: 'UserDetails',

  mixins: [BaseMixin],

  getInitialState: function() {
    return {
      loading: true,
    }
  },

  componentDidMount: function() {
    this.fetchUser(this.props.model)
  },

  componentDidUpdate: function(prevProps) {
    if (this.props.model && prevProps.model !== this.props.model) {
      this.fetchUser()
    }
  },

  componentWillUnmount: function() {
    this.props.model.off(null, null, this)
  },

  fetchUser: function() {
    this.setState({
      loading: true,
    })

    this.props.model.once(
      'sync',
      function() {
        this.setState({
          loading: false,
        })
      },
      this
    )

    this.props.model.fetch()
  },

  render: function() {
    if (this.state.loading) {
      return (
        <Hint loading view>
          {i18n('Loading user...')}
        </Hint>
      )
    }

    const { model } = this.props

    return (
      <div className="user-details">
        <h4 className="container-header">
          {i18n('Details (ID: __id__)', {
            id: model.id,
          })}
        </h4>

        <Toolbar model={model} category="user" />

        <h4 className="container-header">{i18n('Licenses')}</h4>

        <List>
          {model
            .get('licenses')
            .map(license => (
              <AuthItem
                key={license.cid}
                model={license}
                category="licenses"
                query={new AuthQuery({ user: model })}
              />
            ))}
        </List>

        <div className="row">
          <div className="col-md-6">
            <h4 className="container-header">{i18n('Master data')}</h4>

            <div className="form">
              <UserDetails user={model.toJSON()} onChange={this.saveModel} />
            </div>

            <h4 className="container-header">{i18n('Organizations')}</h4>

            <Organizations
              admin
              user={model.toJSON()}
              collection={model.get('organizations')}
            />
          </div>

          <div className="col-md-6">
            <h4 className="container-header">{i18n('Events')}</h4>

            <Events
              filter={{
                actorId: model.id,
                userId: model.id,
              }}
            />
          </div>
        </div>
      </div>
    )
  },
})



// WEBPACK FOOTER //
// ./src/admin/views/users/Details.js