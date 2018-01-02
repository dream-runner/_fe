/* @flow */

import React from 'react'
import { map } from 'lodash'

import Cell from './Cell'

import type { CaseT } from '../../../../packages/cases'

type Props = {
  open: Array<CaseT>,
  closed: Array<CaseT>,
  columnIds: Array<string>,
}

export default function Body({
  open = [],
  closed = [],
  columnIds = [],
}: Props) {
  return (
    <tbody>
      {map(open, (caze: CaseT) => (
        <tr key={caze.id} className="case open">
          {columnIds.map((id: string) => (
            <Cell key={id} columnId={id} caze={caze} />
          ))}
        </tr>
      ))}
      {map(closed, (caze: CaseT) => (
        <tr key={caze.id} className="case closed">
          {columnIds.map((id: string) => (
            <Cell key={id} columnId={id} caze={caze} />
          ))}
        </tr>
      ))}
    </tbody>
  )
}



// WEBPACK FOOTER //
// ./src/cases/views/table/Body.js