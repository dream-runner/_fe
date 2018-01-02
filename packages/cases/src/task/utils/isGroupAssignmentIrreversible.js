import { some } from 'lodash'
import type { UserT } from '@signavio/effektif-api'

import type { TaskT } from '../../types'
import { getRights } from './taskUtils'
import isTaskExecutable from './isTaskExecutable'

const willGroupHaveAccess = (
  task: TaskT,
  user: UserT,
  targetGroupId: string
): boolean => {
  const rights = getRights(task)

  if (rights.edit) {
    return true
  }

  return some(user.groupIds || [], groupId => groupId === targetGroupId)
}

export default function isGroupAssignmentIrreversible(
  task: TaskT,
  user: UserT,
  groupId: string
): boolean {
  return isTaskExecutable(task) && !willGroupHaveAccess(task, user, groupId)
}



// WEBPACK FOOTER //
// ./packages/cases/src/task/utils/isGroupAssignmentIrreversible.js