import type { UserT } from '@signavio/effektif-api'

import type { TaskT } from '../../types'
import {
  isPrivate,
  getRights,
  hasAssigneeGroup,
  isAssigneeGroup,
  isCandidate,
  isAssignee,
} from './taskUtils.js'

export default function canAssign(task: TaskT, user: UserT): boolean {
  if (task.canceled) {
    return false
  }

  if (!isPrivate(task)) {
    return true
  }

  const rights = getRights(task)

  if (rights.edit) {
    return true
  }

  if (!task.assignee) {
    if (hasAssigneeGroup(task)) {
      return isAssigneeGroup(task, user.groupIds)
    }
    return isCandidate(task, user)
  }

  return isAssignee(task, user)
}



// WEBPACK FOOTER //
// ./packages/cases/src/task/utils/canAssign.js