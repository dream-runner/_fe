import PropTypes from 'prop-types'
import React from 'react'
import createReactClass from 'create-react-class'
import i18n from 'i18n'

import { AdminInvites } from 'organizations/views/members'

import { BaseMixin } from '@signavio/effektif-commons/lib/mixins'
import { Group } from '@signavio/effektif-commons/lib/components'

import { Events } from '../../../../packages/admin'

import Organization from '../../models/Organization'

import Toolbar from '../Toolbar'
import Details from '../DetailsView'
import { Profiles as LicenseProfiles } from '../licenses'
import OrganizationInfo from './Info'
import DangerZone from './DangerZone'
import Licenses from './Licenses'

export default createReactClass({
  displayName: 'Details',

  propTypes: {
    model: PropTypes.instanceOf(Organization).isRequired,
  },

  mixins: [BaseMixin],

  componentWillUnmount: function() {
    this.props.model.off(null, null, this)
  },

  render: function() {
    const { model } = this.props

    return (
      <Details model={model}>
        <Toolbar model={model} category="organization" />

        <Group title={i18n('Details')}>
          <OrganizationInfo model={model} />
        </Group>

        <div className="row">
          <div className="col-md-6">{this.renderLicenseInfo()}</div>
          <div className="col-md-6">
            <Group title={i18n('Events')}>
              <Events
                filter={{
                  organizationId: model.id,
                }}
              />
            </Group>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <Group title={i18n('Danger zone')}>
              <DangerZone model={model} />
            </Group>
          </div>
        </div>
      </Details>
    )
  },

  renderLicenseInfo: function() {
    const { model } = this.props

    return (
      <div className="license-info">
        <Group title={i18n('Editions')}>
          <LicenseProfiles
            model={model}
            collection={model.get('licenseProfiles')}
          />
        </Group>

        <Group title={i18n('Licenses & Generators')}>
          <Licenses model={model} organizationId={model.id} />
        </Group>

        <Group title={i18n('Invitations')}>
          <AdminInvites organizationId={model.id} />
        </Group>
      </div>
    )
  },
})



// WEBPACK FOOTER //
// ./src/admin/views/organizations/Details.js