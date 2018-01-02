import React from 'react'
import _ from 'lodash'
import i18n from 'i18n'

import BooleanSelect from './BooleanSelect'
import FilterList from '../FilterList'

const more = () => [
  {
    id: 'completed',
    name: i18n('Completed'),
  },
]

export default function More(props) {
  let { onChange, active, filters, ...rest } = props

  return (
    <FilterList
      title={i18n('More Filters')}
      hint={active.completed ? i18n('Completed tasks') : null}
      expanded={!!active.completed}
    >

      {more().map(({ id, name }) =>
        <BooleanSelect
          key={id}
          name={name}
          value={active[id]}
          onChange={value => onChange({ [id]: value })}
        />
      )}
    </FilterList>
  )
}



// WEBPACK FOOTER //
// ./src/tasks/views/filters/More.js