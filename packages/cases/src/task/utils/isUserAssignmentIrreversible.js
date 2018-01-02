import type { UserT } from '@signavio/effektif-api'

import type { TaskT } from '../../types'
import isTaskExecutable from './isTaskExecutable'
import willUserHaveAccess from './willUserHaveAccess'

export default function isUserAssignmentIrreversible(
  task: TaskT,
  user: UserT
): boolean {
  return isTaskExecutable(task) && !willUserHaveAccess(task, user)
}



// WEBPACK FOOTER //
// ./packages/cases/src/task/utils/isUserAssignmentIrreversible.js