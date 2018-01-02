// @flow
import React from 'react'

import { Tile } from '@signavio/effektif-commons/lib/components/tiles'
import { Icon } from '@signavio/effektif-commons/lib/components'

import { defaultStyle } from '@signavio/effektif-commons/lib/styles'

import type { TaskT } from '../../types'

import AssignmentDropdown from './AssignmentDropdown'
import AssignmentToggle from './AssignmentToggle'

type TaskAssignmentT = {
  // the content shall not be changed (task completed)
  disabled?: boolean,
  onChange: (task: TaskT) => void,
  // the user has no proper access
  readOnly?: boolean,
  task: TaskT,
}

function TaskAssignment({
  disabled,
  readOnly,
  task,
  style,
  onChange,
}: TaskAssignmentT) {
  const { assignee, assigneeGroup } = task

  return (
    <AssignmentDropdown
      disabled={disabled}
      onChange={onChange}
      readOnly={readOnly}
      task={task}
    >
      {open => (
        <Tile
          transparent
          style={style('toggle')}
          toolbar={
            !readOnly && (
              <Icon
                small
                iconSet="fontAwesome"
                icon={open ? 'angle-up' : 'angle-down'}
              />
            )
          }
        >
          <AssignmentToggle
            assigneeId={assignee}
            assigneeGroupId={assigneeGroup}
          />
        </Tile>
      )}
    </AssignmentDropdown>
  )
}

const styled = defaultStyle(
  {
    toggle: {
      cursor: 'pointer',
    },

    '&readOnly': {
      toggle: {
        cursor: 'default',
      },
    },
  },
  ({ readOnly }) => ({
    '&readOnly': readOnly,
  })
)

export default styled(TaskAssignment)



// WEBPACK FOOTER //
// ./packages/cases/src/task/components/Assignment.js