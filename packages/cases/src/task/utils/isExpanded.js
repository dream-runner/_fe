// @flow
import { some } from 'lodash'
import type { TaskT } from '../../types'

const matchesSubtask = (task: TaskT, activeTaskId?: string): boolean => {
  if (task.id === activeTaskId) {
    return true
  }

  return some(
    task.subtasks,
    (subtaskId: string) => subtaskId === activeTaskId
  )
}

export default function isExpanded(
  task: TaskT,
  activeTaskId?: string
): boolean {
  if (!activeTaskId) {
    return false
  }

  if (task.id === activeTaskId) {
    return true
  }

  return matchesSubtask(task, activeTaskId)
}



// WEBPACK FOOTER //
// ./packages/cases/src/task/utils/isExpanded.js