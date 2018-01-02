// @flow
import React from 'react'
import { includes } from 'lodash'

import { Popover, Icon } from '@signavio/effektif-commons/lib/components'
import moment from '@signavio/effektif-commons/lib/extensions/moment'
import { DateUtils } from '@signavio/effektif-commons/lib/utils'
import { defaultStyle } from '@signavio/effektif-commons/lib/styles'

import type { TaskT } from '../../types'

type PropsT = {
  task: TaskT,
}

function InlineDueDate({ task, ...rest }: PropsT) {
  if (task.completed) {
    return null
  }

  if (!task.dueDate) {
    return null
  }

  const dueDate = moment(task.dueDate)
  const dueInfo = getDueDateInfo(dueDate)

  return (
    <Popover
      position="left"
      small
      style={{ node: { whiteSpace: 'nowrap' } }}
      popover={DateUtils.getDueMessage(dueDate)}
    >
      <Icon
        {...rest}
        icon="clock"
        error={includes(['overdue', 'today'], dueInfo)}
      />
    </Popover>
  )
}

const getDueDateInfo = duedate => {
  const now = moment()

  if (now.twix(duedate).isPast()) {
    return 'overdue'
  }

  if (now.twix(duedate).countInner('days') === 0) {
    return 'today'
  }

  if (now.twix(duedate).countInner('weeks') === 0) {
    return 'thisweek'
  }

  return 'later'
}

const styled = defaultStyle(
  theme => ({
    '&inactive': {
      color: theme.color.mono.middle,
    },
  }),
  ({ task }: PropsT) => ({
    '&inactive': includes(['thisweek', 'later'], getDueDateInfo(task.dueDate)),
  })
)

export default styled(InlineDueDate)



// WEBPACK FOOTER //
// ./src/tasks/views/list/InlineDueDate.js