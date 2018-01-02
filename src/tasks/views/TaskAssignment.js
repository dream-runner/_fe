// @flow
import React from 'react'

import i18n from 'signavio-i18n'

import { TextTile } from '@signavio/effektif-commons/lib/components/tiles'
import { userUtils } from '@signavio/effektif-api'
import type { UserT } from '@signavio/effektif-api'

import { UserTile } from '../../../packages/organizations'
import type { GroupT } from '../../../packages/organizations'

import Assignment from './AssignmentView'

type TaskAssignmentT = {
  model: any,
  // the user has no proper access
  readOnly?: boolean,
  // the content shall not be changed (task completed)
  disabled?: boolean,
  open?: boolean,
}

type ToggleT = {
  assignee?: UserT,
  assigneeGroup?: GroupT,
  disabled?: boolean,
}

export default function TaskAssignment({
  model,
  disabled,
  readOnly,
  open,
}: TaskAssignmentT) {
  const assignee = model.get('assignee') ? model.get('assignee').toJSON() : null
  const assigneeGroup = model.get('assigneeGroup')
    ? model.get('assigneeGroup').toJSON()
    : null

  return (
    <Assignment
      className="task-assignment"
      disabled={disabled}
      readOnly={readOnly}
      open={open}
      model={model}
    >
      <Toggle
        assignee={assignee}
        assigneeGroup={assigneeGroup}
        disabled={disabled}
      />
    </Assignment>
  )
}

function Toggle({ assignee, assigneeGroup, disabled }: ToggleT) {
  if (assignee) {
    return (
      <UserTile user={assignee} disabled={disabled}>
        {userUtils.name(assignee)}
      </UserTile>
    )
  }

  if (assigneeGroup) {
    return (
      <TextTile icon="group" disabled={disabled}>
        {assigneeGroup.name}
      </TextTile>
    )
  }

  return <TextTile>{i18n('Unassigned')}</TextTile>
}



// WEBPACK FOOTER //
// ./src/tasks/views/TaskAssignment.js