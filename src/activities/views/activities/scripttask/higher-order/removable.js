// @flow
import React from 'react'

import { Tile } from '@signavio/effektif-commons/lib/components/tiles'
import { IconButton } from '@signavio/effektif-commons/lib/components/buttons'

type PropsT = {
  onRemove: () => void,
}

export default function removableHoC(WrappedComponent: ReactClass<*>) {
  return function Removable({ onRemove, ...rest }: PropsT) {
    return (
      <Tile toolbar={<IconButton icon="trash" onClick={onRemove} />}>
        <WrappedComponent {...rest} />
      </Tile>
    )
  }
}



// WEBPACK FOOTER //
// ./src/activities/views/activities/scripttask/higher-order/removable.js