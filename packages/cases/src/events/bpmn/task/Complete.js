// @flow
import React from 'react'

import i18n from 'signavio-i18n'

import Event from '@signavio/workflow-events'

import { Form } from '@signavio/workflow-forms'

import { userUtils } from '@signavio/effektif-api'

import type { TaskCompleteEventT } from '../../../types'

import { TaskLink } from '../../components'

type PropsT = {
  event: TaskCompleteEventT,
}

function TaskCompleteEvent({ event, ...rest }: PropsT) {
  const { actor, task, caseId, form } = event

  return (
    <Event
      {...rest}
      important
      event={event}
      icon="check"
      title={
        actor
          ? i18n('__user__ completed __task__', {
              user: userUtils.name(actor),
              task: <TaskLink task={task} caseId={caseId} />,
            })
          : i18n('__task__ was completed', {
              task: <TaskLink task={task} caseId={caseId} />,
            })
      }
    >
      {form && <Form readOnly hideDoneButton {...form} />}
    </Event>
  )
}

export default TaskCompleteEvent



// WEBPACK FOOTER //
// ./packages/cases/src/events/bpmn/task/Complete.js