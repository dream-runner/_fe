import { get } from 'lodash'

const getPending = props => get(props, 'updateTask.pending', true)

export default function taskHasBeenUpdated(props, nextProps): boolean {
  return getPending(props) && !getPending(nextProps)
}



// WEBPACK FOOTER //
// ./packages/cases/src/task/utils/taskHasBeenUpdated.js