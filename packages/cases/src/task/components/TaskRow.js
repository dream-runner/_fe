// @flow
import React from 'react'
import i18n from 'signavio-i18n'
import { compose } from 'recompose'

import { connect, types, TaskT, PromiseT } from '@signavio/effektif-api'

import { moment } from '@signavio/effektif-commons/lib/extensions'
import { defaultStyle, utils } from '@signavio/effektif-commons/lib/styles'
import { Popover } from '@signavio/effektif-commons/lib/components'
import { PlaceholderTile } from '@signavio/effektif-commons/lib/components/tiles'
import { DateUtils } from '@signavio/effektif-commons/lib/utils'

import { Field, dateTimeType } from '@signavio/effektif-fields'

import TaskTile from './TaskTile'

type PropsT = {
  taskId: string,
  readOnly?: boolean,

  fetchTask: PromiseT<TaskT>,

  onStatusChange: () => void,
}

const dueToday = ({ completed, dueDate }: TaskT) =>
  !completed &&
  moment()
    .twix(dueDate)
    .countInner('days') === 0
const openDue = ({ completed, dueDate }: TaskT) =>
  !completed && dueDate && moment().isBefore(dueDate)
const openOverdue = ({ completed, dueDate }: TaskT) =>
  !completed && dueDate && moment(dueDate).isBefore(moment())
const completedOverdue = ({ dueDate, completeTime }: TaskT) =>
  dueDate && completeTime && moment(dueDate).isBefore(completeTime)

const TaskRow = ({
  style,
  taskId,
  readOnly,
  fetchTask,
  onStatusChange,
}: PropsT) => {
  if (fetchTask.pending) {
    return (
      <tr {...style('task')}>
        <td colspan="4">
          <PlaceholderTile withHeader />
        </td>
      </tr>
    )
  }

  const task = fetchTask.value
  const { createTime, dueDate, completeTime } = task

  return (
    <tr {...style('task')}>
      <td>
        <TaskTile
          onStatusChange={onStatusChange}
          readOnly={readOnly}
          taskId={taskId}
        />
      </td>
      <td {...style('date')}>
        <Field readOnly value={createTime} type={dateTimeType()} />
      </td>

      <td {...style('date')}>
        {openDue(task) || openOverdue(task) ? (
          <Popover
            popover={getDueMessage(task, openDue(task), openOverdue(task))}
          >
            <div {...style('dueDate')}>
              <Field readOnly value={dueDate} type={dateTimeType()} />
            </div>
          </Popover>
        ) : (
          <div {...style('dueDate')}>
            <Field
              readOnly
              value={dueDate}
              type={dateTimeType()}
              emptyContent={'-'}
            />
          </div>
        )}
      </td>
      <td {...style('date')}>
        {completedOverdue(task) ? (
          <Popover
            popover={i18n('Completed __timeSinceDue__ past due date', {
              timeSinceDue: DateUtils.getDurationHumanized(
                dueDate,
                completeTime
              ),
            })}
          >
            <div {...style('completeTime')}>
              <Field readOnly value={completeTime} type={dateTimeType()} />
            </div>
          </Popover>
        ) : (
          <div {...style('completeTime')}>
            <Field
              readOnly
              value={completeTime}
              type={dateTimeType()}
              emptyContent={'-'}
            />
          </div>
        )}
      </td>
    </tr>
  )
}

const getDueMessage = (task, openDue, openOverdue) => {
  const now = moment()
  const { dueDate } = task

  if (openDue) {
    return i18n('Due in __timeUntilDue__', {
      timeUntilDue: DateUtils.getDurationHumanized(now, dueDate),
    })
  }

  if (openOverdue) {
    return i18n('__timeSinceDue__ over due date', {
      timeSinceDue: DateUtils.getDurationHumanized(now, dueDate),
    })
  }
}

export default compose(
  connect(({ taskId }) => ({
    fetchTask: {
      type: types.TASK,
      id: taskId,
    },
  })),
  defaultStyle(
    ({ color }) => ({
      date: {
        ...utils.borderLeft(1, 'solid', 'white'),

        ...utils.media.xs({
          display: 'none',
        }),
      },
      task: {
        ...utils.borderBottom(1, 'solid', 'white'),
      },
      '&dueToday': {
        dueDate: {
          color: color.status.warning,
        },
      },
      '&openOverdue': {
        dueDate: {
          color: color.status.danger,
        },
      },
      '&completedOverdue': {
        completeTime: {
          color: color.status.danger,
        },
      },
    }),
    ({ fetchTask }: PropsT) => {
      if (!fetchTask.value) {
        return
      }

      return {
        '&dueToday': dueToday(fetchTask.value),
        '&openOverdue': openOverdue(fetchTask.value),
        '&completedOverdue': completedOverdue(fetchTask.value),
      }
    }
  )
)(TaskRow)



// WEBPACK FOOTER //
// ./packages/cases/src/task/components/TaskRow.js