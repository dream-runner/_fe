// @flow
import type { TaskT } from '../../types'

import { getRights } from './taskUtils'
import isTaskExecutable from './isTaskExecutable'

export default function isTaskReadOnly(task: TaskT): boolean {
  const { edit } = getRights(task, 'edit')

  return !isTaskExecutable(task) || !edit
}



// WEBPACK FOOTER //
// ./packages/cases/src/task/utils/isTaskReadOnly.js