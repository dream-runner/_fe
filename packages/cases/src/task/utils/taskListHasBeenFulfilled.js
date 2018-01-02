import { get } from 'lodash'

const getPending = props => get(props, 'fetchTasks.pending', true)

export default function taskListHasBeenFulfilled(props, nextProps): boolean {
  return getPending(props) && !getPending(nextProps)
}



// WEBPACK FOOTER //
// ./packages/cases/src/task/utils/taskListHasBeenFulfilled.js