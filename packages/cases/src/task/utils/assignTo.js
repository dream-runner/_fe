import type { UserT } from '@signavio/effektif-api'

import type { TaskT } from '../../types'

export default function assignTo(task: TaskT, user: UserT): TaskT {
  if (user && task.assigneeId === user.id) {
    return task
  }

  const assignSubtasks =
    task.subtasks &&
    task.subtasks.every(
      subtask =>
        subtask.completed ||
        !subtask.assignee ||
        subtask.assignee === task.assignee
    )

  let newTask = {
    ...task,
    assignee: user,
    assigneeId: user ? user.id : null,
    assigneeGroup: null,
    assigneeGroupId: null,
  }

  if (assignSubtasks) {
    newTask = {
      ...newTask,
      subtasks: task.subtasks.map(subtask => {
        if (task.completed) {
          return subtask
        }

        return assignTo(subtask, user)
      }),
    }
  }

  return newTask
}



// WEBPACK FOOTER //
// ./packages/cases/src/task/utils/assignTo.js