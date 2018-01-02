// @flow
import React from 'react'
import i18n from 'signavio-i18n'
import { map } from 'lodash'
import { withHandlers } from 'recompose'

import { List } from '@signavio/effektif-commons/lib/components'
import { ActionTile } from '@signavio/effektif-commons/lib/components/tiles'

import type { PriorityT } from '../../types'

import { priorities } from './priorities'
import Item from './Item'

type PropsT = {
  value: ?string,

  onChange: (id: string) => void,
  onClear: () => void,
}

function Options({ value, onChange, onClear }: PropsT) {
  return (
    <List>
      {value && (
        <ActionTile icon="times" onClick={onClear}>
          {i18n('Remove priority')}
        </ActionTile>
      )}

      {map(priorities(), (priority: PriorityT) => (
        <Item
          key={priority.id}
          {...priority}
          selected={value === priority.id}
          onClick={onChange}
        />
      ))}
    </List>
  )
}

const enhance = withHandlers({
  onClear: ({ onChange }) => () => onChange(null),
})

export default enhance(Options)



// WEBPACK FOOTER //
// ./packages/cases/src/components/priority/Options.js