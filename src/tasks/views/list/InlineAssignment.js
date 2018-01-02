// @flow
import React from 'react'

import { utils, defaultStyle } from '@signavio/effektif-commons/lib/styles'
import { IconButton } from '@signavio/effektif-commons/lib/components/buttons'

import { UserAvatar } from '../../../../packages/organizations'
import Candidates from '../../../../packages/cases/src/task/components/Candidates'

import type { TaskT } from '../../types'

import Assignment from '../AssignmentView'

type PropsT = {
  task: TaskT,
  readOnly?: boolean,
  disabled?: boolean,

  model: any,
}

function InlineAssignment({
  disabled,
  readOnly,
  model,
  task,
  style,
  ...rest
}: PropsT) {
  return (
    <div {...rest} {...style}>
      <Assignment
        model={model}
        readOnly={readOnly}
        disabled={disabled}
        toggleIcon={null}
        {...rest}
      >
        {!task.assigneeId &&
          task.candidates.count === 0 && (
            <IconButton {...style('icon')} icon="user" disabled={disabled} />
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
      </Assignment>
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
// ./src/tasks/views/list/InlineAssignment.js