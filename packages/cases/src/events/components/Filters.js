// @flow
import React from 'react'
import { isEqual } from 'lodash'
import { withHandlers, lifecycle, compose } from 'recompose'

import i18n from 'signavio-i18n'

import { defaultStyle } from '@signavio/effektif-commons/lib/styles'
import { omitProps } from '@signavio/effektif-commons/lib/components'

import Filter from './Filter'
import type { FilterT } from './Filter'

const getFilters = () => [
  {
    data: { type: 'comment' },
    name: i18n('comments'),
  },
  {
    data: { type: 'document' },
    name: i18n('documents'),
  },
  {
    data: { type: 'form' },
    name: i18n('forms'),
  },
]

type FilterDescriptionT = {
  data: FilterT,
  name: string,
}

type PropsT = {
  taskId?: string,
  filter?: FilterT,
  filters: Array<FilterT>,

  onClick: (filter: ?FilterT) => void,
}

function Filters(props: PropsT) {
  const { taskId, filter, filters, onClick, style, ...rest } = props
  return (
    <div {...rest} {...style}>
      <div>
        {i18n('Show only')}
      </div>

      {taskId &&
        <Filter
          key="taskId"
          active={isEqual({ taskId }, filter)}
          data={{ taskId }}
          onClick={onClick}
        >
          {i18n('this task')}
        </Filter>}

      {(filters || getFilters()).map(({ data, name }: FilterDescriptionT) =>
        <Filter
          key={name}
          active={isEqual(filter, data)}
          data={data}
          onClick={onClick}
        >
          {name}
        </Filter>
      )}
    </div>
  )
}

type ApiPropsT = PropsT & {
  onFilter: (filter: FilterT) => void,
}

export default compose(
  withHandlers({
    onClick: ({ filter, onFilter }: ApiPropsT) => (data: FilterT) => {
      if (isEqual(filter, data)) {
        onFilter(null)
      } else {
        onFilter(data)
      }
    },
  }),
  lifecycle({
    componentWillReceiveProps({ taskId, onFilter }) {
      if (this.props.taskId && !taskId) {
        onFilter(null)
      }

      if (taskId && taskId !== this.props.taskId) {
        onFilter({ taskId })
      }
    },
  }),
  defaultStyle(({ font, padding }) => ({
    fontSize: font.size.small,

    paddingTop: padding.xsmall,
    paddingBottom: padding.xsmall,

    textAlign: 'center',
  })),
  omitProps(['onFilter'])
)(Filters)



// WEBPACK FOOTER //
// ./packages/cases/src/events/components/Filters.js