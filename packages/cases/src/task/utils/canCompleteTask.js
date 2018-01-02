// @flow
import type { UserT } from '@signavio/effektif-api'

import type { TaskT } from '../../types'
import { isPrivate, checkPrivate } from './taskUtils'

export default function canCompleteTask(task: TaskT, user: UserT): boolean {
  if (isPrivate(task)) {
    return checkPrivate(task, user)
  }

  return true
}



// WEBPACK FOOTER //
// ./packages/cases/src/task/utils/canCompleteTask.js