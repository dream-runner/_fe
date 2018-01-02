// @flow
import React from 'react'
import { some } from 'lodash'
import { withHandlers, compose } from 'recompose'

import { connect, types, fulfillRequestThen } from '@signavio/effektif-api'

import type { InviteT } from '../../types'

import InvitesContent from './InvitesContent'

type PropsT = {
  invites: Array<string>,

  onRemove: (email: string) => void,
  onResend: (email: string) => void,
  onInvite: (invite: InviteT) => void,
  onValidate: (invite: InviteT) => void,
}

function Invites({
  createInvite,
  resendInvite,
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
      fetchOrganization={fetchOrganization}
      onValidate={onValidate}
      onInvite={onInvite}
      onRemove={onRemove}
      onResend={onResend}
    />
  )
}

export default compose(
  connect(() => ({
    fetchLicenses: {
      type: types.LICENSES,
    },
    createInvite: {
      type: types.INVITE,
      method: 'create',
    },
    removeInvite: {
      type: types.INVITE,
      method: 'remove',
    },
    resendInvite: {
      type: types.RESEND_INVITE,
      method: 'create',
    },
    fetchOrganization: {
      type: types.ORGANIZATION,
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
    onInvite: ({ createInvite }) => (invite: InviteT) => createInvite(invite),
    onValidate: ({ invites }) => (invite: InviteT) =>
      !some(invites, (email: string) => invite.emailAddress === email),
    onResend: ({ resendInvite }) => (email: string) => resendInvite({ email }),
    onRemove: ({ removeInvite }) => (emailAddress: string) =>
      removeInvite(emailAddress),
  })
)(Invites)



// WEBPACK FOOTER //
// ./src/organizations/views/members/Invites.js