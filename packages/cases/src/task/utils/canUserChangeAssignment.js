import type { UserT } from '@signavio/effektif-api'

import type { TaskT } from '../../types'

import canAssign from './canAssign'
import isTaskExecutable from './isTaskExecutable'

export default function canUserChangeAssignment(
  task: TaskT,
  user: UserT
): boolean {
  return isTaskExecutable(task) && canAssign(task, user)
}



// WEBPACK FOOTER //
// ./packages/cases/src/task/utils/canUserChangeAssignment.js