// @flow
import { get, some } from 'lodash'

import type { UserT } from '@signavio/effektif-api'

import type { TaskT } from '../../types'
import { getRights as getAccessRights } from '@signavio/workflow-access'

export const checkPrivate = (task: TaskT, user: UserT): boolean =>
  task.assigneeId === user.id

export const getRights = (task: TaskT) =>
  getAccessRights(task.access, 'edit', 'view')

export const hasAssignee = (task: TaskT): boolean => !!task.assignee
export const hasAssigneeGroup = (task: TaskT): boolean => !!task.assigneeGroup

export const hasCandidates = (task: TaskT): boolean =>
  !!(task.candidates && task.candidates.count > 0)

export const hasFormButtons = form =>
  !!(form && form.buttons && form.buttons.length > 0)

export const isAssignee = (task: TaskT, user: UserT): boolean =>
  task.assigneeId === user.id

export const isCandidate = (task: TaskT, user: UserT): boolean =>
  !!some(
    get(task, 'candidates.items', []),
    candidate => candidate.id === user.id
  )

export const isPrivate = (task: TaskT): boolean => !!task.access

export const isAssigneeGroup = (
  task: TaskT,
  groupIds: Array<string> = []
): boolean => {
  const { assigneeGroup } = task
  return (
    !!assigneeGroup && some(groupIds, groupId => groupId === assigneeGroup.id)
  )
}



// WEBPACK FOOTER //
// ./packages/cases/src/task/utils/taskUtils.js