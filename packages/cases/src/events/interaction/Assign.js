// @flow
import React from 'react'

import i18n from 'signavio-i18n'

import Event from '@signavio/workflow-events'
import { userUtils } from '@signavio/effektif-api'

import type { TaskAssignEventT } from '../../types'

import { TaskLink } from '../components'

type PropsT = {
  event: TaskAssignEventT,
}

export default function TaskAssignEvent({ event, ...rest }: PropsT) {
  return <Event {...rest} event={event} title={getTitle(event)} icon="user" />
}

const getTitle = ({
  actor,
  assignee,
  assigneeGroup,
  task,
  caseId,
}: TaskAssignEventT) => {
  if (actor && assignee && actor.id === assignee.id) {
    // a actor took assignment for himself
    return i18n('__user__ took assignment of __task__', {
      user: userUtils.name(actor),
      task: <TaskLink task={task} caseId={caseId} />,
    })
  }

  if (assignee) {
    // assignment to another actor
    return i18n('__user__ assigned __task__ to __actor__', {
      user: userUtils.name(actor),
      task: <TaskLink task={task} caseId={caseId} />,
      actor: userUtils.name(assignee),
    })
  }

  if (assigneeGroup) {
    return i18n('__user__ assigned __task__ to __group__', {
      user: userUtils.name(actor),
      task: <TaskLink task={task} caseId={caseId} />,
      group: assigneeGroup.name,
    })
  }

  // was unassigned
  return i18n('__user__ removed assignment of __task__', {
    user: userUtils.name(actor),
    task: <TaskLink task={task} caseId={caseId} />,
  })
}



// WEBPACK FOOTER //
// ./packages/cases/src/events/interaction/Assign.js