// @flow
import React from 'react'

import i18n from 'signavio-i18n'

import type { EventT } from '@signavio/workflow-events'
import Event from '@signavio/workflow-events'

type PropsT = {
  event: EventT,
}

export default function DecisionEvaluatedEvent({ event, ...rest }: PropsT) {
  return (
    <Event
      {...rest}
      icon="cube"
      title={i18n('__decision__ was evaluated', {
        decision: event.name,
      })}
      event={event}
    />
  )
}



// WEBPACK FOOTER //
// ./packages/cases/src/events/integrations/dmn/DecisionEvaluated.js