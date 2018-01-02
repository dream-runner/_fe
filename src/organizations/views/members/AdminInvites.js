// @flow
import React from 'react'
import { some } from 'lodash'
import { withHandlers, compose } from 'recompose'
import { connect, types, fulfillRequestThen } from '@signavio/effektif-api'

import type { InviteT } from '../../types'

import InvitesContent from './InvitesContent'

type PropsT = {
  invites: Array<string>,
  organizationId: string,

  onRemove: (email: string) => void,
  onResend: (email: string) => void,
  onInvite: (invite: InviteT) => void,
  onValidate: (invite: InviteT) => void,
}

function AdminInvites({
  createInvite,
  resendInvite,
  removeInvite,
  fetchOrganization,
  fetchLicenses,
  onRemove,
  onInvite,
  onValidate,
  onResend,
}: PropsT) {
  return (
    <InvitesContent
      fetchLicenses={fetchLicenses}
      createInvite={createInvite}
      resendInvite={resendInvite}
      removeInvite={removeInvite}
      fetchOrganization={fetchOrganization}
      onValidate={onValidate}
      onInvite={onInvite}
      onRemove={onRemove}
      onResend={onResend}
    />
  )
}

export default compose(
  connect(({ organizationId }) => ({
    fetchLicenses: {
      type: types.LICENSES,
      query: { id: organizationId, admin: true },
    },
    createInvite: {
      type: types.INVITE,
      method: 'create',
    },
    removeInvite: {
      type: types.INVITE,
      method: 'remove',
      query: { id: organizationId, admin: true },
    },
    resendInvite: {
      type: types.RESEND_INVITE,
      method: 'create',
    },
    fetchOrganization: {
      type: types.ORGANIZATION,
      query: { id: organizationId, admin: true },
    },
  })),
  fulfillRequestThen({
    createInvite: ({ fetchOrganization, fetchLicenses }) => {
      fetchOrganization()
      fetchLicenses()
    },
    removeInvite: ({ fetchOrganization, fetchLicenses }) => {
      fetchOrganization()
      fetchLicenses()
    },
  }),
  withHandlers({
    onInvite: ({ createInvite, organizationId }: PropsT) => (invite: InviteT) =>
      createInvite({ ...invite, id: organizationId, admin: true }),
    onValidate: ({ invites }) => (invite: InviteT) =>
      !some(invites, (email: string) => invite.emailAddress === email),
    onResend: ({ resendInvite, organizationId }: PropsT) => (email: string) =>
      resendInvite({ email, id: organizationId, admin: true }),
    onRemove: ({ removeInvite }) => (emailAddress: string) =>
      removeInvite(emailAddress),
  })
)(AdminInvites)



// WEBPACK FOOTER //
// ./src/organizations/views/members/AdminInvites.js