import type { UserT } from '@signavio/effektif-api'

import type { TaskT } from '../../types'
import {
  getRights,
  hasAssigneeGroup,
  isAssigneeGroup,
  isCandidate,
} from './taskUtils'

export default function willUserHaveAccess(task: TaskT, user: UserT): boolean {
  const rights = getRights(task)

  if (rights.edit) {
    return true
  }

  if (hasAssigneeGroup(task)) {
    return isAssigneeGroup(task, user.groupIds)
  }

  if (rights.view) {
    return false
  }

  return isCandidate(task, user)
}



// WEBPACK FOOTER //
// ./packages/cases/src/task/utils/willUserHaveAccess.js