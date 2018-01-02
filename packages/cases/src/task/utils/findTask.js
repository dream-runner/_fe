import { find, forEach } from 'lodash'

import type { TaskT } from '../../types'

export default function findTask(tasks: Array<TaskT>, id: string): TaskT {
  const found = find(tasks, { id })
  if (found) {
    return found
  }

  let result
  forEach(tasks, task => {
    if (!result && task.subtasks) {
      result = findTask(task.subtasks, id)
    }
  })

  return result
}



// WEBPACK FOOTER //
// ./packages/cases/src/task/utils/findTask.js