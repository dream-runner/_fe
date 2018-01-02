// @flow
import React from 'react'
import i18n from 'signavio-i18n'

import type { LogEventT } from '@signavio/workflow-events'
import { LogEvent } from '@signavio/workflow-events'

type PropsT = {
  event: LogEventT,
}

export default function DecisionNotEvaluableEvent({ event, ...rest }: PropsT) {
  return (
    <LogEvent
      {...rest}
      icon="cube"
      title={i18n('__decision__ could not be evaluated', {
        decision: event.name,
      })}
      event={event}
    />
  )
}



// WEBPACK FOOTER //
// ./packages/cases/src/events/integrations/dmn/DecisionNotEvaluable.js