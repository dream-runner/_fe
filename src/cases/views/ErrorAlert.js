import React from 'react'
import { Alert } from '@signavio/effektif-commons/lib/components/hints'
import { List } from '@signavio/effektif-commons/lib/components'

const ErrorAlert = ({ deleteCases, onDismiss }) => {
  return <Alert onDismiss={onDismiss}>{getErrorMessage(deleteCases)}</Alert>
}

const getErrorMessage = deleteCases => {
  if (deleteCases.rejected) {
    return deleteCases.reason
  }

  if (!deleteCases.value.unremovedCases) {
    return deleteCases.value.message
  }

  return (
    <div>
      {deleteCases.value.message}
      <List>
        {deleteCases.value.unremovedCases.map(
          unremovedCase => unremovedCase.caseName
        )}
      </List>
    </div>
  )
}
export default ErrorAlert



// WEBPACK FOOTER //
// ./src/cases/views/ErrorAlert.js