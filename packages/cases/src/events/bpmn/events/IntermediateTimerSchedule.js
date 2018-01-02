// @flow
import React from 'react'

import i18n from 'signavio-i18n'

import { moment } from '@signavio/effektif-commons/lib/extensions'

import Event from '@signavio/workflow-events'

import type { TimerEventT } from '../../../types'

type PropsT = {
  event: TimerEventT,
}

export default function IntermediateTimerSchedule({ event, ...rest }: PropsT) {
  const { executionTime, time, timerName } = event
  const range = moment(time).twix(executionTime)

  return (
    <Event
      {...rest}
      event={event}
      title={i18n('case execution delayed')}
      icon="clock"
    >
      {timerName
        ? i18n(
            'The case is waiting __range__ for **__name__** to complete on __time__',
            {
              markdown: true,
              range: range.humanizeLength(),
              time: moment(executionTime).format('LLL'),
              name: timerName,
            }
          )
        : i18n('This case will continue after __range__ on __time__', {
            range: range.humanizeLength(),
            time: moment(executionTime).format('LLL'),
          })}
    </Event>
  )
}



// WEBPACK FOOTER //
// ./packages/cases/src/events/bpmn/events/IntermediateTimerSchedule.js