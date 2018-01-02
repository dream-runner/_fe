// @flow
import React from 'react'

import i18n from 'signavio-i18n'

import type { LogEventT } from '@signavio/workflow-events'
import { LogEvent } from '@signavio/workflow-events'

type PropsT = {
  event: LogEventT,
}

export default function EmailEvent({ event, ...rest }: PropsT) {
  const { error } = event

  return (
    <LogEvent
      {...rest}
      event={event}
      icon="send"
      title={error ? i18n('email could not be sent') : i18n('email was sent')}
    />
  )
}



// WEBPACK FOOTER //
// ./packages/cases/src/events/integrations/Email.js