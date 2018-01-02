// @flow
import React from 'react'
import i18n from 'signavio-i18n'

import { List } from 'commons-components'
import { Hint } from 'commons-components/hints'

import type { MappingT } from '../../../../processes/types'

import MapEntry from './MapEntry'

type PropsT = {
  mappings: Array<MappingT>,

  readOnly: boolean,

  onRemove: (mapping: MappingT) => void,
}

export default function Mappings({ mappings, readOnly, onRemove }: PropsT) {
  if (!mappings || mappings.length === 0) {
    return (
      <Hint>
        {i18n("You haven't defined any mappings.")}
      </Hint>
    )
  }

  return (
    <List>
      {mappings.map(({ left, right }: MappingT, index: number) =>
        <MapEntry
          readOnly={readOnly}
          key={`${left.expression}-${right.expression}-${index}`}
          left={left}
          right={right}
          onRemove={onRemove}
        />
      )}
    </List>
  )
}



// WEBPACK FOOTER //
// ./src/activities/views/activities/datamapper/Mappings.js