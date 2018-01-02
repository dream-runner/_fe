// @flow
import React from 'react'

import type { EventT } from '@signavio/workflow-events'

import bpmnEvents from './bpmn'
import caseEvents from './case'
import engineEvents from './engine'
import integrationEvents from './integrations'
import interactionEvents from './interaction'

const events = {
  ...bpmnEvents,
  ...caseEvents,
  ...engineEvents,
  ...integrationEvents,
  ...interactionEvents,
}

type PropsT = {
  event: EventT,
}

export default function Event({ event, ...rest }: PropsT) {
  const { type } = event

  const EventComponent = events[type]

  if (!EventComponent) {
    console.error(`Could not render event for type ${type}.`)

    return null
  }

  return <EventComponent {...rest} event={event} />
}



// WEBPACK FOOTER //
// ./packages/cases/src/events/Event.js