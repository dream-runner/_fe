// @flow
import React from 'react'
import { compose, withHandlers } from 'recompose'
import i18n from 'signavio-i18n'
import { some, reject, get } from 'lodash'

import { withUser } from '@signavio/effektif-api'
import type { UserT } from '@signavio/workflow-organizations'

import { TextButton } from '@signavio/effektif-commons/lib/components/buttons'
import { defaultStyle } from '@signavio/effektif-commons/lib/styles'

import type { TaskT } from '../../types'
import { DueDateSelect } from '../../components'

import { hasAssignee, assignTo } from '../utils'

import Candidates from './Candidates'
import Assignment from './Assignment'

type ApiPropsT = {
  canAssign: boolean,
  disabled: boolean,
  onChange: (task: TaskT) => void,
  readOnly: boolean,
  task: TaskT,
}

type PropsT = {
  onDueDateChange: (dueDate: string) => void,
  onTakeTask: () => void,
  user: UserT,
} & ApiPropsT

function Details({
  canAssign,
  disabled,
  style,
  user,
  readOnly,
  task,
  onChange,
  onDueDateChange,
  onTakeTask,
}: PropsT) {
  const iAmCandidate = some(task.candidates.items, { id: user.id })
  const hasCandidates = get(task, 'candidates.count', 0) > 0
  const showAssignmentButton =
    !hasAssignee(task) && canAssign && (iAmCandidate || !hasCandidates)
  const showCandidates = hasCandidates && !hasAssignee(task)

  return (
    <table>
      <thead>
        <tr>
          {showAssignmentButton && (
            <th {...style('title')}>
              {iAmCandidate
                ? i18n('You are a candidate')
                : i18n('You can take this task')}
            </th>
          )}
          {showCandidates && (
            <th {...style('title')}>
              {iAmCandidate
                ? i18n('Additional candidates')
                : i18n('Candidates')}
            </th>
          )}
          <th {...style('title')}>{i18n('Current task assignee')}</th>
          <th {...style('title')}>{i18n('Task due date')}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          {showAssignmentButton && (
            <td {...style('content')}>
              <TextButton
                small
                primary={iAmCandidate}
                disabled={!canAssign}
                onClick={onTakeTask}
              >
                {i18n('Take this task')}
              </TextButton>
            </td>
          )}
          {showCandidates && (
            <td {...style('content')}>
              <Candidates
                circularAvatars
                small
                users={reject(task.candidates.items, { id: user.id })}
                totalCount={task.candidates.totalCount}
              />
            </td>
          )}
          <td {...style('content')}>
            <Assignment
              disabled={disabled}
              onChange={onChange}
              readOnly={!canAssign}
              task={task}
            />
          </td>

          <td {...style('content')}>
            <DueDateSelect
              onChange={onDueDateChange}
              readOnly={readOnly || disabled}
              value={task.dueDate}
            />
          </td>
        </tr>
      </tbody>
    </table>
  )
}

export default compose(
  withUser,
  withHandlers({
    onDueDateChange: ({ onChange, task }: PropsT) => (dueDate: string) => {
      onChange({
        ...task,
        dueDate,
      })
    },
    onTakeTask: ({ onChange, task, user }) => () => {
      onChange(assignTo(task, user))
    },
  }),
  defaultStyle(({ padding, font, color }) => ({
    title: {
      color: color.mono.dark,

      fontSize: font.size.form,
      fontWeight: font.weight.light,

      paddingBottom: padding.small,
      paddingRight: padding.large,
    },

    content: {
      paddingRight: padding.normal,

      verticalAlign: 'top',
    },
  }))
)(Details)



// WEBPACK FOOTER //
// ./packages/cases/src/task/components/Details.js