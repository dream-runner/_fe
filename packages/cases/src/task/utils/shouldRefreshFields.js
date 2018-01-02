import taskHasBeenUpdated from './taskHasBeenUpdated'
import taskListHasBeenFulfilled from './taskListHasBeenFulfilled'
import userSwitchedTask from './userSwitchedTask'

export default function shouldRefreshFields(props, nextProps): boolean {
  return (
    taskHasBeenUpdated(props, nextProps) ||
    taskListHasBeenFulfilled(props, nextProps) ||
    userSwitchedTask(props, nextProps)
  )
}



// WEBPACK FOOTER //
// ./packages/cases/src/task/utils/shouldRefreshFields.js