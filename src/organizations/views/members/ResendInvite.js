// @flow
import React from 'react'
import { withHandlers } from 'recompose'
import i18n from 'signavio-i18n'

import { Popover } from '@signavio/effektif-commons/lib/components'
import { IconButton } from '@signavio/effektif-commons/lib/components/buttons'

type PropsT = {
  disabled: ?boolean,
  onResend: () => void,
}

function ResendInvite({ disabled, onResend }: PropsT) {
  return (
    <Popover placement="right" popover={i18n('Resend invitation')}>
      <IconButton icon="reload" disabled={disabled} onClick={onResend} />
    </Popover>
  )
}

type ApiPropsT = PropsT & {
  invite: string,
}

const enhance = withHandlers({
  onResend: ({ invite, onResend }: ApiPropsT) => () => onResend(invite),
})

export default enhance(ResendInvite)



// WEBPACK FOOTER //
// ./src/organizations/views/members/ResendInvite.js