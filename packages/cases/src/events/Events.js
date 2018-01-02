// @flow
import { mapProps } from 'recompose'

import { createEventList } from '@signavio/workflow-events'

import bpmnEvents from './bpmn'
import caseEvents from './case'
import engineEvents from './engine'
import integrationEvents from './integrations'
import interactionEvents from './interaction'

const eventTypes = {
  ...bpmnEvents,
  ...caseEvents,
  ...engineEvents,
  ...integrationEvents,
  ...interactionEvents,
}

export default mapProps(({ events, ...rest }) => ({
  ...rest,

  events: events.map(({ user, ...event }) => ({
    ...event,

    actor: user,
  })),
}))(createEventList(eventTypes))



// WEBPACK FOOTER //
// ./packages/cases/src/events/Events.js