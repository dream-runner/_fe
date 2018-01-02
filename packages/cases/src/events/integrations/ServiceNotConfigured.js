// @flow
import React from 'react'

import i18n from 'signavio-i18n'

import { LogEvent } from '@signavio/workflow-events'

import type { ServiceEventT } from '../../types'

type PropsT = {
  event: ServiceEventT,
}

export default function ServiceNotConfiguredEvent({ event, ...rest }: PropsT) {
  const { serviceName } = event

  return (
    <LogEvent
      {...rest}
      event={event}
      icon="warning"
      title={i18n('__serviceName__ service is not configured.', {
        serviceName,
      })}
    />
  )
}



// WEBPACK FOOTER //
// ./packages/cases/src/events/integrations/ServiceNotConfigured.js