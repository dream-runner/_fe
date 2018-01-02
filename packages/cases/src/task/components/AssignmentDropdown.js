// @flow
import React from 'react'
import { withState, withHandlers, compose } from 'recompose'

import i18n from 'signavio-i18n'

import { withUser } from '@signavio/effektif-api'

import {
  Confirm,
  DropDown,
  omitProps,
} from '@signavio/effektif-commons/lib/components'
import { defaultStyle } from '@signavio/effektif-commons/lib/styles'
import { RemoveButton } from '@signavio/effektif-commons/lib/components/buttons'
import { Hint } from '@signavio/effektif-commons/lib/components/hints'

import { UserSelect } from '@signavio/workflow-organizations'
import type { UserT, GroupT } from '@signavio/workflow-organizations'
import type { TaskT } from '../../types'

import {
  assignTo,
  isGroupAssignmentIrreversible,
  isTaskReadOnly,
  willUserHaveAccess,
} from '../utils'

type ResultT = {
  entity: {
    id: string,
  },
}

type PropsT = {
  readOnly?: boolean,
  disabled?: boolean,
  showWarning: boolean,
  open: boolean,
  children: React$Element<*>,
  onAcceptWarning: () => void,
  onChange: (newTask: TaskT) => void,
  onDismissWarning: () => void,
  onUserSelect: (user: UserT) => void,
  onGroupSelect: (group: GroupT) => void,
  onUnassignUser: () => void,
  onUnassignGroup: () => void,
  onFilter: (results: Array<ResultT>) => Array<ResultT>,
  onToggle: () => void,
  user: UserT,
  task: TaskT,
}

function TaskAssignment(props: PropsT) {
  const {
    disabled,
    readOnly,
    children,
    showWarning,
    open,
    style,
    onAcceptWarning,
    onDismissWarning,
    onUserSelect,
    onGroupSelect,
    onFilter,
    onUnassignGroup,
    onUnassignUser,
    onToggle,
    user,
    task,
  } = props

  const { assigneeId, assigneeGroupId } = task

  return (
    <div {...style}>
      <DropDown
        hideToggleButton
        disabled={readOnly || disabled}
        toggle={children}
        open={open}
        onToggle={onToggle}
      >
        {open &&
          !readOnly &&
          open &&
          <UserSelect
            hideTrigger
            registeredOnly
            autoFocus
            selfOnTop
            static
            showGroups
            groupId={assigneeGroupId || null}
            onUserSelect={onUserSelect}
            onGroupSelect={onGroupSelect}
            controls={
              (assigneeId || assigneeGroupId) &&
              <RemoveButton
                light
                block
                onClick={assigneeId ? onUnassignUser : onUnassignGroup}
                className="unassign"
              >
                {assigneeId
                  ? i18n('Unassign')
                  : i18n('Remove group assignment')}
              </RemoveButton>
            }
            filter={onFilter}
            candidateIds={task.candidateIds}
            candidateGroupIds={task.candidateGroupIds}
            defaultSelectionIndex={getDefaultSelectionIndex(assigneeId, user)}
            placeholder={i18n('Type user, group name or email')}
          />}
      </DropDown>

      {showWarning &&
        <Confirm
          danger
          title={i18n('You will lose access if you change the assignment')}
          confirmText={i18n('Change assignment')}
          onCancel={onDismissWarning}
          onConfirm={onAcceptWarning}
        >
          <Hint warning>
            {i18n(
              'Are you sure you want to change the assignment of this task? You will not ' +
                'be able to reassign this task afterwards and this action cannot be undone.'
            )}
          </Hint>
        </Confirm>}
    </div>
  )
}

const filterCurrentAssignee = (results: Array<ResultT>, assignee: UserT) =>
  results.map((result: ResultT) => {
    if (result.entity.id !== assignee.id) {
      return result
    }

    return { ...result, disabled: true }
  })

const getDefaultSelectionIndex = (assigneeId?: string, currentUser: UserT) => {
  if (!assigneeId) {
    return 0
  }

  if (assigneeId !== currentUser.id) {
    return 0
  }

  return null
}

export default compose(
  withUser,
  withState('userAssignee', 'setUserAssignee', null),
  withState('groupAssignee', 'setGroupAssignee', null),
  withState('open', 'toggleOpen', false),
  withState('showWarning', 'setShowWarning', false),
  withHandlers({
    onToggle: ({ toggleOpen, open }) => () => toggleOpen(!open),
    onDismissWarning: ({
      setUserAssignee,
      setGroupAssignee,
      setShowWarning,
    }: PropsT) => () => {
      setUserAssignee(null)
      setGroupAssignee(null)
      setShowWarning(false)
    },
  }),
  withHandlers({
    onAcceptWarning: ({
      userAssignee,
      groupAssignee,
      task,
      toggleOpen,
      onChange,
      onDismissWarning,
    }: PropsT) => () => {
      if (userAssignee) {
        onChange(assignTo(task, userAssignee))
      }

      if (groupAssignee) {
        onChange({
          ...task,
          assignee: null,
          assigneeId: null,
          assigneeGroup: groupAssignee,
          assigneeGroupId: groupAssignee.id,
        })
      }

      if (!userAssignee && !groupAssignee) {
        onChange(assignTo(task, null))
      }

      onDismissWarning()
      toggleOpen(false)
    },
    onUnassignUser: ({
      task,
      onChange,
      toggleOpen,
      setShowWarning,
    }: PropsT) => () => {
      toggleOpen(false)

      if (isTaskReadOnly(task) && !willUserHaveAccess(task, task.assignee)) {
        setShowWarning(true)
        return
      }

      onChange(assignTo(task, null))
    },
    onUnassignGroup: ({
      onChange,
      task,
      toggleOpen,
      setShowWarning,
    }: PropsT) => () => {
      toggleOpen(false)

      if (isTaskReadOnly(task)) {
        setShowWarning(true)
        return
      }

      onChange({
        ...task,
        assigneeGroup: null,
        assigneeGroupId: null,
      })
    },
    onUserSelect: ({
      onChange,
      task,
      user,
      setUserAssignee,
      setShowWarning,
      toggleOpen,
    }: PropsT) => (newUser: UserT) => {
      toggleOpen(false)

      if (isTaskReadOnly(task) && newUser.id !== user.id) {
        setUserAssignee(newUser)
        setShowWarning(true)
        return
      }

      onChange(assignTo(task, newUser))
    },
    onGroupSelect: ({
      onChange,
      task,
      user,
      setGroupAssignee,
      setShowWarning,
      toggleOpen,
    }: PropsT) => (group: GroupT) => {
      toggleOpen(false)

      if (isGroupAssignmentIrreversible(task, user, group.id)) {
        setGroupAssignee(group)
        setShowWarning(true)
        return
      }

      onChange({
        ...task,
        assignee: null,
        assigneeId: null,
        assigneeGroup: group,
        assigneeGroupId: group.id,
      })
    },
    onFilter: ({ task }: PropsT) => (results: Array<ResultT>) => {
      const { assignee, assigneeGroup } = task

      if (assignee) {
        return filterCurrentAssignee(results, assignee)
      }

      if (assigneeGroup) {
        return filterCurrentAssignee(results, assigneeGroup)
      }

      return results
    },
  }),
  omitProps([
    'toggleOpen',
    'userAssignee',
    'groupAssignee',
    'setUserAssignee',
    'setGroupAssignee',
  ]),
  defaultStyle()
)(TaskAssignment)



// WEBPACK FOOTER //
// ./packages/cases/src/task/components/AssignmentDropdown.js