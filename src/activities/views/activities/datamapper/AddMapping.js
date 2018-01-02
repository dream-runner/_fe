// @flow
import React from 'react'
import { withState, withHandlers, compose } from 'recompose'

import type { BindingT, MappingT } from '../../../../processes/types'

import EditMapping from './EditMapping'

type PropsT = {
  onAdd: (mapping: MappingT) => void,

  left: BindingT,
  right: BindingT,

  onLeftChange: (binding: BindingT | null) => void,
  onRightChange: (binding: BindingT | null) => void,
}

function AddDataMapping({ left, onLeftChange, onRightChange }: PropsT) {
  return (
    <EditMapping
      left={left}
      onLeftChange={onLeftChange}
      onRightChange={onRightChange}
    />
  )
}

export default compose(
  withState('left', 'setLeft', null),
  withHandlers({
    onLeftChange: ({ setLeft, dataTypeDescriptors, variables }) => binding =>
      setLeft(binding),

    onRightChange: ({ onAdd, left, setLeft }) => binding => {
      onAdd({ left, right: binding })

      setLeft(null)
    },
  })
)(AddDataMapping)



// WEBPACK FOOTER //
// ./src/activities/views/activities/datamapper/AddMapping.js