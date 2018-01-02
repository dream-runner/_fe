// @flow
import React from 'react'

import i18n from 'signavio-i18n'

import type { EventT } from '@signavio/workflow-events'
import Event from '@signavio/workflow-events'

type PropsT = {
  event: EventT,
}

export default function ExecutionAbortedEvent({ event, ...rest }: PropsT) {
  return (
    <Event
      {...rest}
      event={event}
      icon="cancel"
      title={i18n('The automatic execution was aborted.')}
    >
      {i18n(
        'The number of automatically executed activities exceeded the maximum limit.'
      )}
    </Event>
  )
}



// WEBPACK FOOTER //
// ./packages/cases/src/events/engine/ExecutionAborted.js