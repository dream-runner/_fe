import React from 'react'
import { compose, withHandlers } from 'recompose'

import i18n from 'signavio-i18n'
import {
  FilterList,
  RadioSelect,
} from '@signavio/effektif-commons/lib/components'

import type { WorkflowFiltersT } from '../../types'

const more = [
  {
    id: 'published',
    name: i18n('Published'),
  },
  {
    id: 'unpublished',
    name: i18n('Unpublished'),
  },
]

type PropsT = {
  active: WorkflowFiltersT,
  onSelect: (value: WorkflowFiltersT) => void,
}

const parseActive = active => {
  if (active.published === undefined) {
    return null
  }

  return active.published ? 'published' : 'unpublished'
}

const More = ({ active, onSelect }: PropsT) =>
  <FilterList
    title={i18n('More Filters')}
    hint={active.published ? i18n('Published processes') : null}
    expanded={!!active.published}
  >
    <RadioSelect
      filters={more}
      active={parseActive(active)}
      onChange={onSelect}
    />
  </FilterList>

export default compose(
  withHandlers({
    onSelect: ({ onChange }: PropsT) => (id: string) => {
      if (id === 'published') {
        onChange({ published: true })
        return
      }

      if (id === 'unpublished') {
        onChange({ published: false })
        return
      }

      onChange({ published: null })
    },
  })
)(More)



// WEBPACK FOOTER //
// ./src/processes/views/filters/More.js