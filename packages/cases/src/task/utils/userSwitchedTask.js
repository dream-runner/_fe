import { get } from 'lodash'

const getTaskId = props => get(props, 'match.params.taskId')

export default function userSwitchedTask(props, nextProps): boolean {
  return getTaskId(props) !== getTaskId(nextProps)
}



// WEBPACK FOOTER //
// ./packages/cases/src/task/utils/userSwitchedTask.js