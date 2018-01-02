// @flow
import React from 'react'

import i18n from 'signavio-i18n'

import { List, Divider } from '@signavio/effektif-commons/lib/components'
import { TextTile } from '@signavio/effektif-commons/lib/components/tiles'

import { UserTile } from '@signavio/workflow-organizations'
import { userUtils } from '@signavio/effektif-api'
import type { UserT } from '@signavio/effektif-api'
import type { GroupT } from '@signavio/workflow-organizations'

import Event from '@signavio/workflow-events'

import type { TaskEscalateEventT } from '../../../types'

import { TaskLink } from '../../components'

type PropsT = {
  event: TaskEscalateEventT,
}

export default function TaskEscalateEvent({ event, ...rest }: PropsT) {
  const { assignee, task, caseId, candidates, candidateGroups } = event

  return (
    <Event
      {...rest}
      event={event}
      icon="notification"
      title={
        assignee
          ? i18n('__task__ was escalated to __user__', {
              task: <TaskLink task={task} caseId={caseId} />,
              user: userUtils.name(assignee),
            })
          : i18n('__task__ was escalated', {
              task: <TaskLink task={task} caseId={caseId} />,
            })
      }
    >
      {candidateGroups && (
        <List>
          <Divider title={i18n('Groups')} />
          {candidateGroups.map((group: GroupT) => (
            <TextTile key={group.id} icon="group">
              {group.name}
            </TextTile>
          ))}
        </List>
      )}

      {candidates && (
        <List>
          <Divider title={i18n('Users')} />
          {candidates.map((candidate: UserT) => (
            <UserTile key={candidate.id} user={candidate}>
              {userUtils.name(candidate)}
            </UserTile>
          ))}
        </List>
      )}
    </Event>
  )
}



// WEBPACK FOOTER //
// ./packages/cases/src/events/bpmn/task/Escalate.js