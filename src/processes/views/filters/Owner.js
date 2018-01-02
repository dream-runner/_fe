// @flow
import React from 'react'
import i18n from 'signavio-i18n'
import type { UserT } from '@signavio/effektif-api'

import { FilterList, List } from '@signavio/effektif-commons/lib/components'
import { RemoveButton } from '@signavio/effektif-commons/lib/components/buttons'
import { Tile } from '@signavio/effektif-commons/lib/components/tiles'

import { UserSelect, User } from '../../../../packages/organizations'

import type { WorkflowFiltersT } from '../../types'

type PropsT = {
  active: WorkflowFiltersT,
  onChange: (value: WorkflowFiltersT) => void,
}

const Owner = ({ active, onChange }: PropsT) => (
  <FilterList
    title={i18n('Owner')}
    hint={!active.ownerId && i18n('Processes owned by the selected user')}
    expanded={!!active.ownerId}
  >
    <List>
      {active.ownerId ? (
        <Tile
          toolbar={<RemoveButton onClick={() => onChange({ ownerId: null })} />}
        >
          <User value={active.ownerId} />
        </Tile>
      ) : (
        <Tile icon="user">
          <UserSelect
            placeholder={i18n('Processes owned by')}
            onUserSelect={(user: UserT) => onChange({ ownerId: user.id })}
          />
        </Tile>
      )}
    </List>
  </FilterList>
)

export default Owner



// WEBPACK FOOTER //
// ./src/processes/views/filters/Owner.js