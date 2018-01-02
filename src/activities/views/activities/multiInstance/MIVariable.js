// @flow
import React from 'react'
import { compose, withHandlers, withProps } from 'recompose'
import { IconButton } from '@signavio/effektif-commons/lib/components/buttons'
import { Tile } from '@signavio/effektif-commons/lib/components/tiles'

import type { BindingT } from '../../../../../packages/fields'
import { Group, User } from '../../../../../packages/organizations'
import { Binding } from '../../../../../packages/fields'

type InnerPropsT = {
  withDelete: boolean,
}

type PropsT = {
  onDelete?: (variable: BindingT) => void,
  readOnly?: boolean,
  variable: BindingT,
  transparent?: boolean,
} & InnerPropsT

const MIVariable = ({
  onDelete,
  readOnly,
  transparent,
  variable,
  withDelete,
}: PropsT) => (
  <Tile
    transparent={transparent}
    toolbar={
      withDelete && (
        <IconButton icon="times" disabled={readOnly} onClick={onDelete} />
      )
    }
  >
    {variable.expression && (
      <Binding readOnly transparent={transparent} binding={variable} />
    )}

    {variable.type &&
    variable.type.name === 'groupId' && (
      <Group transparent={transparent} value={variable.value} />
    )}

    {variable.type &&
    variable.type.name === 'userId' && (
      <User transparent={transparent} value={variable.value} />
    )}
  </Tile>
)

export default compose(
  withProps(({ onDelete }: PropsT) => ({
    withDelete: !!onDelete,
  })),
  withHandlers({
    onDelete: ({ onDelete, variable }: PropsT) => () => onDelete(variable),
  })
)(MIVariable)



// WEBPACK FOOTER //
// ./src/activities/views/activities/multiInstance/MIVariable.js