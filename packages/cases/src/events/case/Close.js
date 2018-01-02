// @flow
import React from 'react'

import i18n from 'signavio-i18n'

import Event from '@signavio/workflow-events'

import type { EventT } from '../../types'

type PropsT = {
  event: EventT,
}

export default function CaseCloseEvent({ event, ...rest }: PropsT) {
  return (
    <Event
      {...rest}
      important
      event={event}
      title={i18n('This case has been completed.')}
      icon="close-case"
    />
  )
}



// WEBPACK FOOTER //
// ./packages/cases/src/events/case/Close.js