// @flow
import React from 'react'
import i18n from 'signavio-i18n'

import { withUser } from '@signavio/effektif-api'

import { getRights } from '@signavio/workflow-access'
import { Hint } from '@signavio/effektif-commons/lib/components/hints'

import { canCompleteTask, canUserChangeAssignment } from '../utils'

function RestrictionsInfo({ task, user }) {
  const rights = getRights(task.access, 'edit')

  if (task.access && !task.assignee && canUserChangeAssignment(task, user)) {
    return (
      <Hint>
        {i18n(
          'In order to complete this task you need to take the assignment first.'
        )}
      </Hint>
    )
  }

  if (!rights.edit) {
    if (canCompleteTask(task, user)) {
      return null
    }

    return (
      <Hint>
        {i18n("You don't have permission to edit or complete this task.")}
      </Hint>
    )
  }

  if (task.completed) {
    return (
      <Hint>
        {i18n(
          "This task was already completed, so it can't be changed anymore."
        )}
      </Hint>
    )
  }

  return null
}

export default withUser(RestrictionsInfo)



// WEBPACK FOOTER //
// ./packages/cases/src/task/components/RestrictionsInfo.js