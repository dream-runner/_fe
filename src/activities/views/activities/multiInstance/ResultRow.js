// @flow
import React from 'react'
import { compose, withHandlers } from 'recompose'
import { Hint } from '@signavio/effektif-commons/lib/components/hints'

import { Field, Binding } from '../../../../../packages/fields'
import type { VariableT } from '@signavio/effektif-api'

type PropsT = {
  globalVariable: Array<VariableT>,
  localVariable: Array<VariableT>,
  onComplete: (globalVariableId: string, newValue: string) => void,
  readOnly: boolean,
}

const ResultRow = ({
  localVariable,
  globalVariable,
  onComplete,
  readOnly,
  style,
}: PropsT) => (
  <tr {...style}>
    <td>
      <Binding readOnly binding={{ expression: localVariable.id }} />
    </td>
    <td>
      <Field
        noClear
        onComplete={onComplete}
        readOnly={readOnly}
        type={{ name: 'text' }}
        value={globalVariable.name || ''}
      />
    </td>
  </tr>
)

export default compose(
  withHandlers({
    onComplete: ({ globalVariable, onComplete }: PropsT) => (
      newValue: string
    ) => {
      if (globalVariable.name === newValue) {
        return
      }

      onComplete(globalVariable.id, newValue)
    },
  })
)(ResultRow)



// WEBPACK FOOTER //
// ./src/activities/views/activities/multiInstance/ResultRow.js