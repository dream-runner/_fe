// @flow
import React from 'react'
import i18n from 'signavio-i18n'

import { StringUtils } from '@signavio/effektif-commons/lib/utils'
import { InputWithButton } from '@signavio/effektif-commons/lib/components'
import { Hint } from '@signavio/effektif-commons/lib/components/hints'

type PropsT = {
  onAdd: (url: string) => void,
}

export default function AddConnector({ onAdd }: PropsT) {
  return (
    <div>
      <Hint info>
        {i18n(
          'Please enter the URL that points to the endpoint under which the new connector will be reachable.'
        )}
      </Hint>

      <InputWithButton
        clearOnSubmit
        validate={StringUtils.validateUrl}
        placeholder={i18n('Enter the URL endpoint for your connector')}
        buttonLabel={i18n('Create')}
        onSubmit={onAdd}
      />
    </div>
  )
}



// WEBPACK FOOTER //
// ./src/services/views/connectors/AddConnector.js