// @flow

import React from 'react'

import i18n from 'signavio-i18n'

import { Group } from '@signavio/effektif-commons/lib/components'
import { Tile } from '@signavio/effektif-commons/lib/components/tiles'
import { TextButton } from '@signavio/effektif-commons/lib/components/buttons'
import { hintIfDisabled } from '@signavio/effektif-commons/lib/components/higher-order'
import type { UserT } from '@signavio/effektif-api'
import type { GroupT } from '../../../packages/organizations'
import { Candidates } from '../../../packages/cases/src/task/components'

type PropsT = {
  title: string,
  disabled?: boolean,
  onClick: () => void,
  assigneeGroup?: GroupT,
  candidates: Array<UserT>,
  totalCount: number,
}

const ConditionalTextButton = hintIfDisabled({ position: 'top' })(TextButton)

export default function TakeAssignmentButton({
  title,
  disabled,
  onClick,
  assigneeGroup,
  candidates = [],
  totalCount = 0,
}: PropsT) {
  return (
    <Group className="task-candidates" title={title}>
      <Tile
        toolbar={
          <Candidates
            users={candidates}
            disabled={disabled}
            totalCount={totalCount}
          />
        }
      >
        <ConditionalTextButton
          primary
          block
          className="take-task"
          disabled={disabled}
          hint={
            assigneeGroup
              ? i18n(
                  'Only members of __group__ are allowed to take this task.',
                  { group: assigneeGroup.name }
                )
              : i18n('Only candidates are allowed to take this task.')
          }
          onClick={onClick}
        >
          {i18n('Take this task')}
        </ConditionalTextButton>
      </Tile>
    </Group>
  )
}



// WEBPACK FOOTER //
// ./src/tasks/views/TakeAssignmentButton.js