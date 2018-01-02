/* @flow */

import React from 'react'
import { find } from 'lodash'
import { compose, pure } from 'recompose'

import Field from '../../../../packages/fields'

import { defaultStyle, utils } from '@signavio/effektif-commons/lib/styles'
import { Tile, TextTile } from '@signavio/effektif-commons/lib/components/tiles'

import type { CaseT } from '../../../../packages/cases'

type Props = {
  caze: CaseT,
  columnId: string,
}

function Cell({ caze, columnId, style }: Props) {
  const { type, value } =
    find(caze.values, field => field.columnId === columnId) || {}

  if (value === null || value === undefined) {
    return (
      <td className="empty" {...style}>
        <div {...style('cell')}>
          <TextTile transparent>-</TextTile>
        </div>
      </td>
    )
  }

  return (
    <td {...style}>
      <div {...style('cell')}>
        <Field readOnly forceSingleLine type={type} value={value} />
      </div>
    </td>
  )
}

export default compose(
  pure,
  defaultStyle(({ font, lineHeight, padding }) => {
    const cellHeight = utils.calculateHeight(
      font.size.normal,
      lineHeight,
      padding.small
    )

    return {
      cell: {
        height: cellHeight,
        overflow: 'hidden',
      },
    }
  })
)(Cell)



// WEBPACK FOOTER //
// ./src/cases/views/table/Cell.js