// @flow
import React from 'react'

import { reject } from 'lodash'
import { compose, withHandlers, withState } from 'recompose'
import i18n from 'signavio-i18n'

import { connect, types } from '@signavio/effektif-api'
import { Hint } from '@signavio/effektif-commons/lib/components/hints'
import { defaultStyle } from '@signavio/effektif-commons/lib/styles'

import { withPeriodicAction } from '../components'
import { Filters } from './components'
import type { FilterT } from './components'
import Events from './Events'

const getFilters = () => [
  {
    data: { type: 'document' },
    name: i18n('documents'),
  },
  {
    data: { type: 'form' },
    name: i18n('forms'),
  },
]

type ApiPropsT = {
  caseId: string,
  taskId?: string,
}

type PropsT = {
  filter: FilterT,
  onFilter: (filter: FilterT) => void,
  setFilter: (filter: FilterT) => void,
} & ApiPropsT

const ActivityStream = ({
  filter,
  fetchEvents,
  taskId,
  style,
  onFilter,
}: PropsT) => (
  <div>
    <Filters
      filter={filter}
      filters={getFilters()}
      onFilter={onFilter}
      taskId={taskId}
    />

    {fetchEvents.pending && !fetchEvents.value ? (
      <Hint loading>{i18n('Loading history...')}</Hint>
    ) : (
      <Events
        style={style('events')}
        events={reject(fetchEvents.value, { type: 'commentAdd' })}
      />
    )}
  </div>
)

export default compose(
  withState('filter', 'setFilter', ({ taskId }) => taskId && { taskId }),
  connect(({ caseId, filter }: PropsT) => ({
    fetchEvents: {
      type: types.CASE_EVENTS,
      query: {
        caseId,
        filter,
      },
    },
  })),
  withHandlers({
    onFilter: ({ setFilter }: PropsT) => (filter: FilterT) => setFilter(filter),
  }),
  withPeriodicAction(({ fetchEvents }) => fetchEvents),
  defaultStyle(({ padding }) => ({
    events: {
      marginTop: padding.large,
    },
  }))
)(ActivityStream)



// WEBPACK FOOTER //
// ./packages/cases/src/events/ActivityStream.js