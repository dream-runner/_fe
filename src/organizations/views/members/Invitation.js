// @flow
import React from 'react'
import { withHandlers } from 'recompose'

import { Remove, List } from '@signavio/effektif-commons/lib/components'

import { TextTile } from '@signavio/effektif-commons/lib/components/tiles'
import { Hint } from '@signavio/effektif-commons/lib/components/hints'

import ResendInvite from './ResendInvite'

type PropsT = {
  inviting?: boolean,

  invite: string,

  onRemove: () => void,
}

function Invitation({ invite, inviting, onRemove, onResend, ...rest }: PropsT) {
  return (
    <TextTile
      {...rest}
      icon="at"
      toolbar={
        <List direction="horizontal">
          <ResendInvite
            invite={invite}
            disabled={inviting}
            onResend={onResend}
          />

          <Remove disabled={inviting} onRemove={onRemove} />
        </List>
      }
    >
      {inviting ? (
        <Hint loading inline>
          {invite}
        </Hint>
      ) : (
        invite
      )}
    </TextTile>
  )
}

const enhance = withHandlers({
  onRemove: ({ invite, onRemove }) => () => onRemove(invite),
})

export default enhance(Invitation)



// WEBPACK FOOTER //
// ./src/organizations/views/members/Invitation.js