/* @flow */

import React from 'react'

import type { Column } from '../../types'

type Props = {
  columns: Array<Column>,
}

export default function Header({ columns = [] }: Props) {
  return (
    <thead>
      <tr>
        {columns.map(({ name, id }) =>
          <th key={id} title={name}>

            {name}
          </th>
        )}
      </tr>
    </thead>
  )
}



// WEBPACK FOOTER //
// ./src/cases/views/table/Header.js