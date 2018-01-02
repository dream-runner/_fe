import React from 'react'
import { map, isEmpty } from 'lodash'
import i18n from 'signavio-i18n'
import { compose, withState } from 'recompose'
import { fulfillRequestThen } from '@signavio/effektif-api'

import { List, Modal } from '@signavio/effektif-commons/lib/components'
import { Hint } from '@signavio/effektif-commons/lib/components/hints'

import Invitation from './Invitation'
import AddInvite from './AddInvite'

type PropsT = {
  invites: Array<string>,

  onRemove: (email: string) => void,
  onResend: (email: string) => void,
  onInvite: (invite: InviteT) => void,
  onValidate: (invite: InviteT) => void,
}

function InvitesContent({
  createInvite,
  resendInvite,
  removeInvite,
  fetchOrganization,
  fetchLicenses,
  onRemove,
  onInvite,
  onValidate,
  onResend,
  inviteMessage,
}: PropsT) {
  if (fetchLicenses.pending) {
    return <Hint loading>{i18n('Loading license information...')}</Hint>
  }

  const licenses = fetchLicenses.value

  return (
    <div>
      {createInvite.rejected && (
        <Hint danger>
          {i18n(
            'We are sorry, but we could not create an invitation for the given address. The server responded with the following message.\n\n__message__',
            {
              message: createInvite.reason,
            }
          )}
        </Hint>
      )}

      {resendInvite.pending && (
        <Modal>
          <Hint loading>{i18n('Resending invitation...')}</Hint>
        </Modal>
      )}

      {resendInvite.rejected && (
        <Hint danger>
          {i18n('Could not resend invitation:\n__message__', {
            message: resendInvite.reason,
          })}
        </Hint>
      )}

      {resendInvite.fulfilled &&
        inviteMessage && (
          <Hint info>{i18n('Invite has been sent out again.')}</Hint>
        )}

      {createInvite.pending && (
        <Hint loading>{i18n('Sending out invitation...')}</Hint>
      )}

      {!createInvite.pending &&
        fetchOrganization.fulfilled &&
        isEmpty(fetchOrganization.value.invitations) && (
          <Hint>{i18n('No pending invitations.')}</Hint>
        )}

      {fetchOrganization.pending && (
        <Hint>{i18n('Loading invitations...')}</Hint>
      )}

      <List>
        {fetchOrganization.fulfilled &&
          map(fetchOrganization.value.invitations, (invite: string) => (
            <Invitation
              key={invite}
              invite={invite}
              onRemove={onRemove}
              onResend={onResend}
            />
          ))}
      </List>

      <AddInvite
        licenses={licenses}
        onValidate={onValidate}
        onInvite={onInvite}
      />
    </div>
  )
}

export default compose(
  withState('inviteMessage', 'showInviteMessage'),
  fulfillRequestThen({
    createInvite: ({ showInviteMessage }) => {
      showInviteMessage(false)
    },
    resendInvite: ({ showInviteMessage }) => {
      showInviteMessage(true)
    },
    removeInvite: ({ showInviteMessage }) => {
      showInviteMessage(false)
    },
  })
)(InvitesContent)



// WEBPACK FOOTER //
// ./src/organizations/views/members/InvitesContent.js