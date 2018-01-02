import React from 'react'
import createReactClass from 'create-react-class'
import { filter, includes } from 'lodash'

import i18n from 'signavio-i18n'

import { BaseMixin } from 'commons-mixins'
import { Hint as LegacyHint } from 'commons-components'
import { Hint } from '@signavio/effektif-commons/lib/components/hints'

import Router from 'singleton/Router'

import OrganizationDetails from './Details'
import OrganizationMembers from './Members'
import OrganizationSelect from './Select'

export default createReactClass({
  displayName: 'ManageOrganizations',

  mixins: [BaseMixin],

  getInitialState: function() {
    return {
      loading: false,
    }
  },

  needsReload: function(nextProps) {
    if (!nextProps.organization) {
      return false
    }

    if (nextProps.organization !== this.props.organization) {
      return true
    }

    if (
      nextProps.organization.get('disabled') !==
      this.props.organization.get('disabled')
    ) {
      return true
    }

    return false
  },

  componentWillMount: function() {
    if (this.props.organization) {
      this.fetchOrganization(this.props.organization)
    }
  },

  componentWillUpdate: function(nextProps) {
    if (this.needsReload(nextProps)) {
      this.fetchOrganization(nextProps.organization)
    }
  },

  componentWillUnmount: function() {
    if (this.props.organization) {
      this.props.organization.off(null, null, this)
    }
  },

  fetchOrganization: function(organization) {
    this.setState({
      loading: true,
    })

    organization.once(
      'sync',
      function() {
        this.setState({
          loading: false,
        })
      },
      this
    )

    organization.fetch()
  },

  render: function() {
    return (
      <div className="manage-organizations">
        <div className="row">
          <div className="col-md-3 organization-select">
            <h4 className="container-header">{i18n('Organization')}</h4>
            {this.renderSelection()}

            {this.renderMembers()}
          </div>
          {this.renderOrganization()}
        </div>
      </div>
    )
  },

  renderMembers: function() {
    if (!this.props.organization || this.state.loading) {
      return
    }

    const organization = this.props.organization.toJSON()
    const { systemUsers, admins, users } = organization

    return (
      <OrganizationMembers
        organization={organization}
        systemUsers={systemUsers}
        admins={filter(admins, admin => !includes(systemUsers, admin))}
        onUserSelect={user =>
          Router.navigate(Router.reverse('admin_users', { id: user.id }), {
            trigger: true,
          })}
      />
    )
  },

  renderSelection: function() {
    return (
      <OrganizationSelect
        value={this.props.organization}
        onChange={this.handleOrganizationSelect}
      />
    )
  },

  renderOrganization: function() {
    if (!this.props.organization) {
      return (
        <div className="col-md-9">
          <LegacyHint view={true}>
            {i18n('No organization selected')}
          </LegacyHint>
        </div>
      )
    }

    if (this.state.loading) {
      return (
        <div className="col-md-9">
          <Hint loading view>
            {i18n('Loading organization...')}
          </Hint>
        </div>
      )
    }

    return (
      <div className="organization">
        <div className="col-md-9">
          <OrganizationDetails
            model={this.props.organization}
            events={this.props.events}
          />
        </div>
      </div>
    )
  },

  handleOrganizationSelect: function(organization) {
    var url

    if (organization) {
      url = Router.reverse('admin_organizations', { id: organization.id })
    } else {
      url = Router.reverse('admin_organizations')
    }

    Router.navigate(url)
  },
})



// WEBPACK FOOTER //
// ./src/admin/views/organizations/Main.js