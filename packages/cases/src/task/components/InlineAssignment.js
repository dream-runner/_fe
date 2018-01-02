// @flow
import React from 'react'

import { utils, defaultStyle } from '@signavio/effektif-commons/lib/styles'
import { IconButton } from '@signavio/effektif-commons/lib/components/buttons'

import { UserAvatar } from '@signavio/workflow-organizations'

import type { TaskT } from '../../types'

import AssignmentDropdown from './AssignmentDropdown'
import Candidates from './Candidates'

type PropsT = {
  disabled?: boolean,
  onChange: (newTask: TaskT) => void,
  readOnly?: boolean,
  task: TaskT,
}

function InlineAssignment({
  disabled,
  readOnly,
  task,
  style,
  ...rest
}: PropsT) {
  return (
    <div {...rest} {...style}>
      <AssignmentDropdown
        task={task}
        readOnly={readOnly}
        disabled={disabled}
        toggleIcon={null}
        {...rest}
      >
        {!task.assigneeId &&
          task.candidates.count === 0 && (
            <IconButton
              {...style('icon')}
              icon="user"
              disabled={readOnly || disabled}
            />
          )}

        {!task.assigneeId &&
          task.candidates.count >= 1 && (
            <Candidates
              condensed
              users={task.candidates.items}
              totalCount={task.candidates.count}
              disabled={disabled}
            />
          )}

        {task.assigneeId && (
          <UserAvatar value={task.assigneeId} disabled={disabled} />
        )}
      </AssignmentDropdown>
    </div>
  )
}

const styled = defaultStyle(
  {
    cursor: 'pointer',

    menu: {
      width: 250,
    },

    icon: {
      opacity: 0.5,

      ...utils.transition('opacity'),

      ':hover': {
        opacity: 1,
      },
    },

    '&readOnly': {
      cursor: null,
    },
  },
  ({ readOnly }: PropsT) => ({
    '&readOnly': readOnly,
  })
)

export default styled(InlineAssignment)



// WEBPACK FOOTER //
// ./packages/cases/src/task/components/InlineAssignment.js