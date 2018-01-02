// @flow
import React from 'react'
import i18n from 'signavio-i18n'

import { List } from '@signavio/effektif-commons/lib/components'
import { RemoveButton } from '@signavio/effektif-commons/lib/components/buttons'
import { Tile } from '@signavio/effektif-commons/lib/components/tiles'

import { UserSelect, User } from '../../../../packages/organizations'

import type { UserT } from '@signavio/effektif-api'

import BooleanSelect from './BooleanSelect'
import FilterList from '../FilterList'

type PropsT = {
  active: {
    assigneeId?: string,
  },
  onChange: (value: { assigneeId: string }) => void,
}

export default function AssignmentFilter({ active, onChange }: PropsT) {
  return (
    <FilterList
      title={i18n('Assignment')}
      hint={!active.assigneeId && i18n('Tasks assigned to the selected user')}
      expanded={!!(active.assignee || active.isCandidate)}
    >
      <List>
        {active.assigneeId ? (
          <Tile
            toolbar={
              <RemoveButton onClick={() => onChange({ assigneeId: null })} />
            }
          >
            <User value={active.assigneeId} />
          </Tile>
        ) : (
          <Tile icon="user">
            <UserSelect
              placeholder={i18n('Tasks assigned to')}
              onUserSelect={(user: UserT) => onChange({ assigneeId: user.id })}
            />
          </Tile>
        )}

        <BooleanSelect
          name={i18n('Is candidate')}
          value={active.isCandidate}
          onChange={(isCandidate: boolean) => onChange({ isCandidate })}
        />
      </List>
    </FilterList>
  )
}



// WEBPACK FOOTER //
// ./src/tasks/views/filters/Assignment.js