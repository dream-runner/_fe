import PropTypes from 'prop-types'
// @flow
import React, { Component } from 'react'
import i18n from 'signavio-i18n'
import { compose, defaultProps, withProps, withHandlers } from 'recompose'

import { Select, omitProps } from '@signavio/effektif-commons/lib/components'

const getSortOptions = () => [
  {
    id: 'name',
    value: i18n('Name'),
  },
  {
    id: 'lastUpdated',
    value: i18n('Last change date'),
  },
  {
    id: 'createTime',
    value: i18n('Creation date'),
  },
  {
    id: 'dueDate',
    value: i18n('Due date'),
  },
  {
    id: 'priority',
    value: i18n('Priority'),
  },
]

const makeDirections = (asc, desc) => [
  {
    id: 'asc',
    value: asc,
  },
  {
    id: 'desc',
    value: desc,
  },
]

const getDirections = () => ({
  default: makeDirections(i18n('Ascending'), i18n('Descending')),
  priority: makeDirections(
    i18n('Most important first'),
    i18n('Least important first')
  ),
  duedate: makeDirections(
    i18n('Most urgent first'),
    i18n('Least urgent first')
  ),
  lastUpdated: makeDirections(i18n('Oldest first'), i18n('Newest first')),
  createTime: makeDirections(i18n('Oldest first'), i18n('Newest first')),
})

type ApiPropsT = {
  sorting: string,
  onChange: string => void,
}

type UpdatePropsT = {
  direction: string,
  field: string,
  onChange: string => void,
}

type InnerPropsT = {
  direction: string,
  field: string,
  onDirectionChange: string => void,
  onFieldChange: string => void,
}

function Sorting({
  direction,
  field,
  onDirectionChange,
  onFieldChange,
}: InnerPropsT) {
  return (
    <div className="list-sorting">
      <div className="row">
        <div className="col-xs-7">
          <h5 className="container-header">{i18n('Sort by')}</h5>

          <Select
            value={field}
            onChange={onFieldChange}
            options={getSortOptions()}
          />
        </div>

        <div className="col-xs-5">
          <h5 className="container-header">{i18n('Direction')}</h5>

          <Select
            value={direction}
            onChange={onDirectionChange}
            options={getDirections()[field] || getDirections().default}
          />
        </div>
      </div>
    </div>
  )
}

export function fieldChangeHandler({
  direction,
  field,
  onChange,
}: UpdatePropsT) {
  return newField => {
    if (field === newField) {
      return
    }

    let newSorting = newField
    if (direction === 'desc') {
      newSorting = `-${newField}`
    }

    onChange(newSorting)
  }
}

export function directionChangeHandler({
  direction,
  field,
  onChange,
}: UpdatePropsT) {
  return newDirection => {
    if (direction === newDirection) {
      return
    }

    let newSorting = field

    if (newDirection === 'desc') {
      newSorting = `-${field}`
    }

    onChange(newSorting)
  }
}

const enhance = compose(
  defaultProps({ sorting: '-lastUpdated' }),
  withProps(({ sorting }) => {
    let direction = 'asc'
    let field = sorting
    if (sorting.indexOf('-') === 0) {
      direction = 'desc'
      field = field.replace('-', '')
    }
    return { direction, field }
  }),
  withHandlers({
    onFieldChange: fieldChangeHandler,
    onDirectionChange: directionChangeHandler,
  }),
  omitProps(['sorting', 'onChange'])
)

export default enhance(Sorting)



// WEBPACK FOOTER //
// ./src/cases/views/ListSorting.js