import PropTypes from 'prop-types'
import React from 'react'
import i18n from 'i18n'

import { ComponentUtils } from 'commons-utils'
import checkDueDate from '../../../../packages/cases/lib/task/utils/checkDueDate'

import MultiSelect from './MultiSelect'
import FilterList from '../FilterList'

export const categories = () => [
  {
    id: 'overdue',
    name: i18n('Overdue'),
    check: task => checkDueDate('overdue', task.get('dueDate')),
  },
  {
    id: 'today',
    name: i18n('Today'),
    check: task => checkDueDate('today', task.get('dueDate')),
  },
  {
    id: 'thisweek',
    name: i18n('Later this week'),
    check: task => checkDueDate('thisweek', task.get('dueDate')),
  },
  {
    id: 'later',
    name: i18n('Later'),
    check: task => checkDueDate('later', task.get('dueDate')),
  },
]

const dueDateFilters = () => [
  ...categories(),

  {
    id: 'notdue',
    name: i18n('Not due'),
  },
]

export default function DueDate(props) {
  let { onChange, active, className, ...rest } = props
  let filters = active.dueDate || []

  return (
    <FilterList
      className={className}
      title={i18n('Due date')}
      hint={
        filters.length > 0
          ? i18n('__count__ filter active', '__count__ filters active', {
              count: filters.length,
            })
          : null
      }
      expanded={filters.length > 0}
    >
      <MultiSelect
        {...rest}
        className={ComponentUtils.className(props, 'filters')}
        active={filters}
        filters={dueDateFilters()}
        onChange={filters =>
          onChange({
            dueDate: dueDateFilters()
              .filter(({ id }) => filters.indexOf(id) >= 0)
              .map(({ id }) => id),
          })}
      />
    </FilterList>
  )
}

DueDate.propTypes = {
  active: PropTypes.object.isRequired,

  onChange: PropTypes.func.isRequired,
}

DueDate.defaultProps = {
  active: {},
}



// WEBPACK FOOTER //
// ./src/tasks/views/filters/DueDate.js