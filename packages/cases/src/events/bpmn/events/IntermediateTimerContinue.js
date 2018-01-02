// @flow
import React from 'react'

import i18n from 'signavio-i18n'

import { moment } from '@signavio/effektif-commons/lib/extensions'

import Event from '@signavio/workflow-events'

import type { TimerEventT } from '../../../types'

type PropsT = {
  event: TimerEventT,
}

export default function IntermediateTimerContinue({ event, ...rest }: PropsT) {
  const { triggerTime, executionTime } = event

  const range = moment(triggerTime).twix(executionTime)

  return (
    <Event
      {...rest}
      event={event}
      title={i18n('continued case execution after __range__', {
        range: range.humanizeLength(),
      })}
      icon="clock"
    />
  )
}



// WEBPACK FOOTER //
// ./packages/cases/src/events/bpmn/events/IntermediateTimerContinue.js