import React from 'react'
import createReactClass from 'create-react-class'
import i18n from 'i18n'
import Router from 'singleton/Router'
import { BaseMixin } from 'commons-mixins'

import { OrganizationType } from '@signavio/effektif-api'

import { Tab, TabBar } from 'commons-components/tabs'
import { padding } from 'commons-style'

import { applicationName } from '@signavio/effektif-commons'

import { ProvideFieldsContext } from '../../../packages/fields'

const adminOrganization = {
  id: 'admin',
  key: 'admin',
  name: 'Admin',
}

module.exports = createReactClass({
  displayName: 'Admin',

  mixins: [BaseMixin],

  childContextTypes: {
    organization: OrganizationType.isRequired,
  },

  getChildContext: function() {
    return {
      organization: adminOrganization,
    }
  },

  render: function() {
    return (
      <div className="view admin">
        {this.renderHeader()}

        <ProvideFieldsContext>{this.renderContent()}</ProvideFieldsContext>
      </div>
    )
  },

  renderHeader: function() {
    return (
      <div className="view-header">
        <h2>
          {i18n('__applicationName__ administration', {
            applicationName,
          })}
        </h2>

        {this.renderNavigation()}
      </div>
    )
  },

  renderTab: function(id, label) {
    return (
      <a href={Router.reverse(id)}>
        <Tab
          active={this.props.tab === id}
          style={{
            paddingLeft: padding.normal,
            paddingRight: padding.normal,
          }}
        >
          {label}
        </Tab>
      </a>
    )
  },

  renderNavigation: function() {
    return (
      <TabBar style={{ marginTop: padding.large }}>
        {this.renderTab('admin_organizations', i18n('Organizations'))}
        {this.renderTab('admin_users', i18n('Users'))}
        {this.renderTab('admin_registrations', i18n('Registrations'))}
        {this.renderTab('admin_auth', i18n('Licenses'))}
        {this.renderTab('admin_releases', i18n('Releases'))}
        {this.renderTab('admin_feedback', i18n('Feedback'))}
        {this.renderTab('admin_purchase', i18n('Purchases'))}
        {this.renderTab('admin_logs', i18n('Logs'))}
        {this.renderTab('admin_system', i18n('System'))}
      </TabBar>
    )
  },

  renderContent: function() {
    return <div className="view-content">{this.props.children}</div>
  },
})



// WEBPACK FOOTER //
// ./src/admin/views/AdminView.js