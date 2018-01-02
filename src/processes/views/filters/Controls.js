// @flow
import React from 'react'
import { compose, withHandlers } from 'recompose'
import _ from 'underscore'

import { Divider } from '@signavio/effektif-commons/lib/components'

import type { WorkflowFiltersT } from '../../types'
import Label from './Label'
import More from './More'
import Owner from './Owner'
import Trigger from './Trigger'

const filterList = [Label, Owner, Trigger, More]

type PropsT = {
  filters: WorkflowFiltersT,
  onChange: (query: WorkflowFiltersT) => void,
}

const Controls = ({ filters, onChange, ...rest }: PropsT) =>
  <div className="controls">
    {filterList.map((FilterComponent: Object, index: number) =>
      <div key={index}>
        <FilterComponent active={filters} onChange={onChange} {...rest} />
        <Divider />
      </div>
    )}
  </div>

export default compose(
  withHandlers({
    onChange: ({ filters, onFilter }: PropsT) => (query: WorkflowFiltersT) => {
      const newQuery = _.reduce(
        { ...filters, ...query },
        (query, value, key) => {
          if (typeof value === 'undefined' || value === null) {
            return query
          }

          return {
            ...query,
            [key]: value,
          }
        },
        {}
      )

      onFilter(newQuery)
    },
  })
)(Controls)



// WEBPACK FOOTER //
// ./src/processes/views/filters/Controls.js