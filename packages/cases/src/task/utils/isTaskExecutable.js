import type { TaskT } from '../../types'

export default function isTaskExecutable(task: TaskT): boolean {
  return !task.completed && !task.canceled
}



// WEBPACK FOOTER //
// ./packages/cases/src/task/utils/isTaskExecutable.js