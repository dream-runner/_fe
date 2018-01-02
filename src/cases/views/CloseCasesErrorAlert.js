import React from 'react'
import { map } from 'lodash'

import { Alert } from '@signavio/effektif-commons/lib/components/hints'
import { List } from '@signavio/effektif-commons/lib/components'

const ErrorAlert = ({ closeCases, onDismiss }) => {
  return <Alert onDismiss={onDismiss}>{getErrorMessage(closeCases)}</Alert>
}

const getErrorMessage = ({ rejected, reason, value }) => {
  if (rejected) {
    return reason
  }

  return (
    <div>
      {value.message}
      <List>
        {map(value.uncanceledCases, ({ caseName }) => `- ${caseName}`)}
      </List>
    </div>
  )
}

export default ErrorAlert



// WEBPACK FOOTER //
// ./src/cases/views/CloseCasesErrorAlert.js