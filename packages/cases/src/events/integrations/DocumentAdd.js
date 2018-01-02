// @flow
import React from 'react'

import i18n from 'signavio-i18n'

import type { EventT } from '@signavio/workflow-events'
import { LogEvent }from '@signavio/workflow-events'

type PropsT = {
  event: EventT,
}

export default function DocumentAddEvent({ event, ...rest }: PropsT) {
  return (
    <LogEvent
      {...rest}
      event={event}
      icon="file"
      title={i18n('Document was created')}
    />
  )
}



// WEBPACK FOOTER //
// ./packages/cases/src/events/integrations/DocumentAdd.js