import type { UserT } from '@signavio/effektif-api'

import type { TaskT } from '../../types'
import {
  hasFormButtons,
  getRights,
  hasAssigneeGroup,
  hasCandidates,
  isAssignee,
  isPrivate,
} from './taskUtils'
import canCompleteTask from './canCompleteTask'

export default function showDoneButton(task: TaskT, user: UserT): boolean {
  const { form } = task

  if (form) {
    if (hasFormButtons(form)) {
      return false
    }
  }

  if (task.completed) {
    if (isPrivate(task)) {
      const rights = getRights(task)

      if (!isAssignee(task, user) && !rights.edit) {
        return false
      }
    }
  } else {
    if (!canCompleteTask(task, user)) {
      return false
    }
  }

  if (hasCandidates(task) || hasAssigneeGroup(task)) {
    if (isPrivate(task)) {
      return isAssignee(task, user)
    }
  }

  return true
}



// WEBPACK FOOTER //
// ./packages/cases/src/task/utils/showDoneButton.js