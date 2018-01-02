/* @flow */

import React from 'react'
import i18n from 'i18n'

import { ContextHelp } from 'commons-components'
import { ActionTile } from 'commons-components/tiles'

type Props = {
  onCancel: () => void,
}

export default function CloseCase({ onCancel, ...rest }: Props) {
  return (
    <ActionTile icon="close-case" onClick={() => onCancel()} {...rest}>

      {i18n('Close this case')}

      <ContextHelp placement="top">
        {i18n(
          'When you close this case **all** open tasks will be aborted and **no** further ones will be created.',
          {
            markdown: true,
          }
        )}
      </ContextHelp>
    </ActionTile>
  )
}



// WEBPACK FOOTER //
// ./src/cases/views/case/CancelCaseView.js