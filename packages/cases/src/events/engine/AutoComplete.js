// @flow
import React from 'react'

import i18n from 'signavio-i18n'

import type { EventT } from '@signavio/workflow-events'
import Event from '@signavio/workflow-events'

type PropsT = {
  event: EventT,
}

export default function TaskAutoComplete({ event, ...rest }: PropsT) {
  const { task } = event

  return (
    <Event
      {...rest}
      event={event}
      icon="check"
      title={i18n('__task__ has been automatically completed.', {
        task: task.name,
      })}
    />
  )
}



// WEBPACK FOOTER //
// ./packages/cases/src/events/engine/AutoComplete.js