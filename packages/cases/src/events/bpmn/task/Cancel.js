// @flow
import React from 'react'

import i18n from 'signavio-i18n'

import Event from '@signavio/workflow-events'
import { userUtils } from '@signavio/effektif-api'

import type { TaskCancelEventT } from '../../../types'

import { TaskLink } from '../../components'

type PropsT = {
  event: TaskCancelEventT,
}

export default function TaskCancelEvent({ event, ...rest }: PropsT) {
  const { actor, caseId, task } = event

  return (
    <Event
      {...rest}
      important
      event={event}
      icon="cancel"
      title={
        actor
          ? i18n('__task__ was canceled by __actor__', {
              task: <TaskLink task={task} caseId={caseId} />,
              actor: userUtils.name(actor),
            })
          : i18n('__task__ was canceled', {
              task: <TaskLink task={task} caseId={caseId} />,
            })
      }
    />
  )
}



// WEBPACK FOOTER //
// ./packages/cases/src/events/bpmn/task/Cancel.js