// @flow
export function isTaskExecutable(task): boolean {
  return !task.get('completed') && !task.get('canceled')
}

export function canUserChangeAssignment(task, user): boolean {
  return isTaskExecutable(task) && task.canAssign(user)
}

export function isTaskReadOnly(task): boolean {
  const { edit } = task.getRights()

  return !isTaskExecutable(task) || !edit
}

export function isUserAssignmentIrreversible(task, user): boolean {
  return isTaskExecutable(task) && !task.willUserHaveAccess(user)
}

export function isGroupAssignmentIrreversible(task, user, groupId): boolean {
  return isTaskExecutable(task) && !task.willGroupHaveAccess(user, groupId)
}



// WEBPACK FOOTER //
// ./src/tasks/utils/TaskUtils.js