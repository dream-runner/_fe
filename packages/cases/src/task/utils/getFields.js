import { get } from 'lodash'

import type { FieldTypeT } from '@signavio/effektif-fields'

import findTask from './findTask'
import taskHasBeenUpdated from './taskHasBeenUpdated'
import taskListHasBeenFulfilled from './taskListHasBeenFulfilled'
import userSwitchedTask from './userSwitchedTask'

export default function getFields(props, nextProps): Array<FieldTypeT> {
  let task = {}

  if (taskHasBeenUpdated(props, nextProps)) {
    task = get(nextProps, 'updateTask.value', {})
  }

  if (taskListHasBeenFulfilled(props, nextProps)) {
    task = findTask(nextProps.fetchTasks.value || [], props.match.params.taskId)
  }

  if (userSwitchedTask(props, nextProps)) {
    task = get(nextProps, 'task', {})
  }

  return get(task, 'form.fields', [])
}



// WEBPACK FOOTER //
// ./packages/cases/src/task/utils/getFields.js