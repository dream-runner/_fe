// @flow
import React from 'react'
import { withState, withHandlers, compose } from 'recompose'

import i18n from 'signavio-i18n'

import {
  Confirm,
  DropDown,
  omitProps,
} from '@signavio/effektif-commons/lib/components'
import { defaultStyle } from '@signavio/effektif-commons/lib/styles'
import { RemoveButton } from '@signavio/effektif-commons/lib/components/buttons'
import { Hint } from '@signavio/effektif-commons/lib/components/hints'

import { withUser } from '../../../packages/api'
import { UserSelect } from '../../../packages/organizations'
import type { GroupT } from '../../../packages/organizations'
import type { UserT } from '@signavio/effektif-api'
import Login from '../../singleton/Login'
import User from '../../users/models/User'

import { isGroupAssignmentIrreversible, isTaskReadOnly } from '../utils'

type ResultT = {
  entity: {
    id: string,
  },
}

type PropsT = {
  model: any, // the task
  readOnly?: boolean,
  disabled?: boolean,
  showWarning: boolean,
  open: boolean,
  children: React$Element<*>,
  onAcceptWarning: () => void,
  onDismissWarning: () => void,
  onUserSelect: (user: UserT) => void,
  onGroupSelect: (group: GroupT) => void,
  onUnassignUser: () => void,
  onUnassignGroup: () => void,
  onFilter: (results: Array<ResultT>) => Array<ResultT>,
  onToggle: () => void,
}

function TaskAssignment(props: PropsT) {
  const {
    disabled,
    readOnly,
    children,
    showWarning,
    open,
    model,
    style,
    toggleIcon,
    onAcceptWarning,
    onDismissWarning,
    onUserSelect,
    onGroupSelect,
    onFilter,
    onUnassignGroup,
    onUnassignUser,
    onToggle,
  } = props

  const assignee = model.get('assignee')
  const assigneeGroup = model.get('assigneeGroup')

  return (
    <div {...style}>
      <DropDown
        disabled={readOnly || disabled}
        toggleIcon={toggleIcon}
        toggle={children}
        open={open}
        onToggle={onToggle}
      >
        {!disabled &&
          !readOnly &&
          open && (
            <UserSelect
              hideTrigger
              registeredOnly
              autoFocus
              selfOnTop
              static
              showGroups
              groupId={assigneeGroup ? assigneeGroup.id : null}
              onUserSelect={onUserSelect}
              onGroupSelect={onGroupSelect}
              controls={
                (assignee || assigneeGroup) && (
                  <RemoveButton
                    light
                    block
                    onClick={assignee ? onUnassignUser : onUnassignGroup}
                    className="unassign"
                  >
                    {assignee
                      ? i18n('Unassign')
                      : i18n('Remove group assignment')}
                  </RemoveButton>
                )
              }
              filter={onFilter}
              candidateIds={model.get('candidateIds')}
              candidateGroupIds={model.get('candidateGroupIds')}
              defaultSelectionIndex={getDefaultSelectionIndex(
                assignee,
                Login.user()
              )}
              placeholder={i18n('Type user, group name or email')}
            />
          )}
      </DropDown>

      {showWarning && (
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
        </Confirm>
      )}
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

const getDefaultSelectionIndex = (assignee?: UserT, currentUser: UserT) => {
  if (!assignee) {
    return 0
  }

  if (assignee.id !== currentUser.id) {
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
      model,
      toggleOpen,
      onDismissWarning,
    }: PropsT) => () => {
      if (userAssignee) {
        model.assignTo(new User(userAssignee))
      }

      if (groupAssignee) {
        model.set('assignee', null)
        model.set('assigneegroup', groupAssignee)
      }

      if (!userAssignee && !groupAssignee) {
        model.unassign()
      }

      onDismissWarning()
      toggleOpen(false)
      model.save()
    },
    onUnassignUser: ({ model, toggleOpen, setShowWarning }: PropsT) => () => {
      toggleOpen(false)

      if (
        isTaskReadOnly(model) &&
        !model.willUserHaveAccess(model.get('assignee').toJSON())
      ) {
        setShowWarning(true)
        return
      }

      model.unassign()
      model.save()
    },
    onUnassignGroup: ({ model, toggleOpen, setShowWarning }: PropsT) => () => {
      toggleOpen(false)

      if (isTaskReadOnly(model)) {
        setShowWarning(true)
        return
      }

      model.unassignGroup()
      model.save()
    },
    onUserSelect: ({
      model,
      user,
      setUserAssignee,
      setShowWarning,
      toggleOpen,
    }: PropsT) => (newUser: UserT) => {
      toggleOpen(false)

      if (isTaskReadOnly(model) && newUser.id !== user.id) {
        setUserAssignee(newUser)
        setShowWarning(true)
        return
      }

      model.assignTo(new User(newUser))
      model.save()
    },
    onGroupSelect: ({
      model,
      user,
      setGroupAssignee,
      setShowWarning,
      toggleOpen,
    }: PropsT) => (group: GroupT) => {
      toggleOpen(false)

      if (isGroupAssignmentIrreversible(model, user, group.id)) {
        setGroupAssignee(group)
        setShowWarning(true)
        return
      }

      model.set('assignee', null)
      model.set('assigneeGroup', group)
      model.save()
    },
    onFilter: ({ model }: PropsT) => (results: Array<ResultT>) => {
      const assignee = model.get('assignee')
      const assigneeGroup = model.get('assigneeGroup')

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
// ./src/tasks/views/AssignmentView.js