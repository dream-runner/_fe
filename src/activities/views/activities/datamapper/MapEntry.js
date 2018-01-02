// @flow
import React from 'react'
import { withHandlers, compose } from 'recompose'

import { Remove } from 'commons-components'
import { Tile } from 'commons-components/tiles'

import type { BindingT } from '../../../../processes/types'

import ShowMapping from './ShowMapping'

type PropsT = {
  left: BindingT,
  right: BindingT,

  onRemove: () => void,

  readOnly: boolean,
}

function MapEntry({ left, right, readOnly, onRemove, ...rest }: PropsT) {
  return (
    <Tile
      {...rest}
      transparent
      toolbar={<Remove disabled={readOnly} onRemove={onRemove} />}
    >
      <ShowMapping left={left} right={right} />
    </Tile>
  )
}

const enhance = withHandlers({
  onRemove: ({ left, right, onRemove }) => () => onRemove({ left, right }),
})

export default enhance(MapEntry)



// WEBPACK FOOTER //
// ./src/activities/views/activities/datamapper/MapEntry.js