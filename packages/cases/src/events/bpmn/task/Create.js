// @flow
import React from 'react'
import i18n from 'signavio-i18n'

import Event from '@signavio/workflow-events'
import { userUtils } from '@signavio/effektif-api'

import type { TaskCreateEventT } from '../../../types'

import { TaskLink } from '../../components'

type Props = {
  event: TaskCreateEventT,
}

export default function TaskCreateEvent({ event, ...rest }: Props) {
  const { actor, task, caseId } = event

  return (
    <Event
      {...rest}
      event={event}
      icon="plus"
      title={
        actor
          ? i18n('__user__ created __task__', {
              user: userUtils.name(actor),
              task: <TaskLink task={task} caseId={caseId} />,
            })
          : i18n('__task__ was created', {
              task: <TaskLink task={task} caseId={caseId} />,
            })
      }
    />
  )
}



// WEBPACK FOOTER //
// ./packages/cases/src/events/bpmn/task/Create.js