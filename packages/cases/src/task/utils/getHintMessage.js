import i18n from 'signavio-i18n'

export default function getHintMessage(task, locked) {
  if (locked) {
    return i18n(
      'In order to complete this task, you need to take the assignment first.'
    )
  }

  if (task.completed && !task.hasForm) {
    return
  }

  if (task.completed && task.hasForm) {
    return i18n(
      "This task was already completed, so it can't be changed anymore."
    )
  }
  return
}



// WEBPACK FOOTER //
// ./packages/cases/src/task/utils/getHintMessage.js