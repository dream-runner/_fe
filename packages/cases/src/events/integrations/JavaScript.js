// @flow
import React from 'react'
import i18n from 'signavio-i18n'

import { LogEvent } from '@signavio/workflow-events'

import type { ScriptEventT } from '../../types'

type PropsT = {
  event: ScriptEventT,
}

export default function ScriptEvent({ event, ...rest }: PropsT) {
  const { activityName } = event

  return (
    <LogEvent
      {...rest}
      event={event}
      icon="nodejs"
      title={i18n('__name__ was executed', {
        name: activityName || 'JavaScript',
      })}
    />
  )
}



// WEBPACK FOOTER //
// ./packages/cases/src/events/integrations/JavaScript.js