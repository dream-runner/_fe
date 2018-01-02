// @flow
import React from 'react'

import i18n from 'signavio-i18n'

import Event from '@signavio/workflow-events'

import type { TaskEventT } from '../../../types'

import { TaskLink } from '../../components'

type PropsT = {
  event: TaskEventT,
}

export default function TaskReopenEvent({ event, ...rest }: PropsT) {
  const { task, caseId } = event

  return (
    <Event
      {...rest}
      event={event}
      title={i18n('reopened __task__', {
        task: <TaskLink task={task} caseId={caseId} />,
      })}
    />
  )
}



// WEBPACK FOOTER //
// ./packages/cases/src/events/bpmn/task/Reopen.js