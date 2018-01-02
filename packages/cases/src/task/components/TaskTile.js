// @flow
import React from 'react'
import { compose, withHandlers } from 'recompose'
import { Link } from 'react-router-dom'
import i18n from 'signavio-i18n'
import { filter } from 'lodash'

import {
  connect,
  types,
  withUser,
  fulfillRequestThen,
  PromiseT,
} from '@signavio/effektif-api'
import { Empty, List } from '@signavio/effektif-commons/lib/components'
import {
  TextTile,
  PlaceholderTile,
} from '@signavio/effektif-commons/lib/components/tiles'
import { defaultStyle } from '@signavio/effektif-commons/lib/styles'
import type { UserT } from '@signavio/effektif-api'

import type { TaskT } from '../../types'
import caseUrl from '../../caseUrl'

import {
  canUserChangeAssignment,
  isTaskExecutable,
  canCompleteTask,
} from '../utils'

import InlineAssignment from './InlineAssignment'
import StatusIcon from './StatusIcon'

type ApiPropsT = {
  onChange: (newTask: TaskT) => void,
  readOnly?: boolean,
  taskId: string,
}

type PropsT = {
  user: UserT,
  subtasks: Array<TaskT>,

  completeTask: PromiseT<TaskT>,
  reopenTask: PromiseT<TaskT>,
  fetchTask: PromiseT<TaskT>,

  onStatusChange: () => void,
} & ApiPropsT

const TaskTile = ({
  onChange,
  readOnly,
  style,
  taskId,
  user,
  completeTask,
  reopenTask,
  fetchTask,
  onStatusChange,
}: PropsT) => {
  if (fetchTask.pending) {
    return <PlaceholderTile withHeader />
  }

  const task = fetchTask.value

  return (
    <TextTile
      header={
        <List direction="horizontal">
          <StatusIcon
            task={task}
            locked={!canCompleteTask(task, user)}
            changing={completeTask.pending || reopenTask.pending}
            readOnly={readOnly}
            onClick={onStatusChange}
          />

          <InlineAssignment
            onChange={onChange}
            readOnly={!canUserChangeAssignment(task, user)}
            disabled={!isTaskExecutable(task)}
            task={task}
          />
        </List>
      }
      subtitle={getSubtitle(task.subtasks)}
    >
      <Link to={caseUrl({ caseId: task.caseId, taskId })}>
        {task.name || <Empty>{i18n('Unnamed task')}</Empty>}
      </Link>
    </TextTile>
  )
}

const getSubtitle = (subtasks: Array<TaskT>) => {
  if (!subtasks || subtasks.length === 0) {
    return
  }

  const completed = filter(subtasks, 'completed').length

  if (completed === 0) {
    return i18n('__count__ open subtask', '__count__ open subtasks', {
      count: subtasks.length,
    })
  }

  return i18n('__completed__ / __all__ subtasks completed', {
    completed,
    all: subtasks.length,
  })
}

export default compose(
  withUser,
  connect(({ taskId }) => ({
    fetchTask: {
      type: types.TASK,
      id: taskId,
      denormalize: true,
    },
    updateTask: {
      type: types.TASK,
      method: 'update',
      id: taskId,
    },
    completeTask: {
      type: types.TASK_COMPLETE,
      method: 'create',
    },
    reopenTask: {
      type: types.TASK_REOPEN,
      method: 'create',
    },
  })),
  fulfillRequestThen({
    completeTask: ({ onStatusChange }) => {
      if (onStatusChange) {
        onStatusChange()
      }
    },
    reopenTask: ({ onStatusChange }) => {
      if (onStatusChange) {
        onStatusChange()
      }
    },
  }),
  withHandlers({
    onChange: ({ updateTask }) => changes => updateTask(changes),
    onStatusChange: ({ fetchTask, completeTask, reopenTask, taskId }) => () => {
      if (completeTask.pending || reopenTask.pending) {
        return
      }

      if (fetchTask.value.completed) {
        reopenTask({ id: taskId })
      } else {
        completeTask({ id: taskId })
      }
    },
  }),
  defaultStyle(
    ({ color }) => ({
      '&completed': {
        name: {
          color: color.mono.middle,
        },
      },
    }),
    ({ fetchTask }) => ({
      '&completed': fetchTask.value && fetchTask.value.completed,
    })
  )
)(TaskTile)



// WEBPACK FOOTER //
// ./packages/cases/src/task/components/TaskTile.js