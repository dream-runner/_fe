import React from 'react'
import i18n from 'signavio-i18n'
import { compose, withHandlers, withState } from 'recompose'

import Router from 'singleton/Router'

import { connect, types, withOrganization } from '@signavio/effektif-api'

import {
  DocumentTitle,
  Feature,
} from '@signavio/effektif-commons/lib/components'
import { defaultStyle } from '@signavio/effektif-commons/lib/styles'
import { Tab, TabBar } from '@signavio/effektif-commons/lib/components/tabs'
import { PrimaryHeader } from '@signavio/effektif-commons/lib/components/headers'

import Members from './members'
import LDAP from './ldap'
import {
  MainView as LabelsView,
  Billing,
} from '../../../packages/organizations'

const SUBVIEWS = {
  members: Members,
  ldap: LDAP,
  billing: Billing,
  labels: LabelsView,
}

/**
 * A view to show all setting for an organization.
 * Also it is used to invite new people.
 * URL: /organization
 */
function Organization(props) {
  const {
    tab = 'members',
    name,
    model,
    style,
    fetchOrganization,
    onChange,
    onNameChange,
    onSave,
  } = props
  const SubView = SUBVIEWS[tab]

  if (fetchOrganization.pending) {
    return <div />
  }

  return (
    <div className="view organization">
      <DocumentTitle title={i18n('Organization settings')} />

      <div className="view-header">
        <PrimaryHeader
          readOnly={model.licenseRequired}
          value={name}
          onChange={onNameChange}
          onBlur={onSave}
          placeholder={i18n('Organization')}
        />

        <TabBar style={style('tabs')}>
          <a href={Router.reverse('organization', { tab: 'members' })}>
            <Tab active={tab === 'members'}>{i18n('Members')}</Tab>
          </a>

          <a href={Router.reverse('organization', { tab: 'billing' })}>
            <Tab active={tab === 'billing'}>{i18n('Billing')}</Tab>
          </a>

          <Feature feature="Component.LdapSynchronisation">
            <a href={Router.reverse('organization', { tab: 'ldap' })}>
              <Tab active={tab === 'ldap'}>{i18n('LDAP')}</Tab>
            </a>
          </Feature>

          <a href={Router.reverse('organization', { tab: 'labels' })}>
            <Tab active={tab === 'labels'}>{i18n('Labels')}</Tab>
          </a>
        </TabBar>
      </div>
      <div className="view-content">
        <SubView
          {...props}
          organization={fetchOrganization.value}
          onChange={onChange}
        />
      </div>
    </div>
  )
}

export default compose(
  withOrganization,
  connect(({ organization }) => ({
    fetchOrganization: {
      type: types.ORGANIZATION,
    },
    updateOrganization: {
      type: types.ORGANIZATION,
      method: 'update',
    },
  })),
  withState('name', 'setName', ({ model }) => model.name),
  withHandlers({
    onNameChange: ({ setName }) => ev => setName(ev.target.value),
    onSave: ({ model, name, updateOrganization }) => () =>
      updateOrganization({
        ...model,
        name,
      }),
    onChange: ({ fetchOrganization, updateOrganization }) => changes =>
      updateOrganization({
        ...fetchOrganization.value,
        ...changes,
      }),
  }),
  defaultStyle(({ padding }) => ({
    tabs: {
      marginTop: padding.large,
    },
  }))
)(Organization)



// WEBPACK FOOTER //
// ./src/organizations/views/OrganizationView.js