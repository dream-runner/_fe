// @flow
import React from 'react'

import i18n from 'signavio-i18n'

import { LogEvent } from '@signavio/workflow-events'

import type { LogEventT } from '../../../types'

type PropsT = {
  event: LogEventT,
}

export default function ExclusiveGatewayEvent({ event, ...rest }: PropsT) {
  return (
    <LogEvent
      {...rest}
      event={event}
      icon="flow"
      title={i18n('Automatic decision was evaluated')}
    />
  )
}



// WEBPACK FOOTER //
// ./packages/cases/src/events/bpmn/gateways/ExclusiveGateway.js