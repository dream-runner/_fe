// @flow
import React from 'react'
import { withHandlers } from 'recompose'

import type { BindingT } from '../../../../../packages/fields'
import { LabeledBinding, VariableName } from '../../../../../packages/fields'

type PropsT = {
  value: BindingT,
  variableId: string,
  readOnly: ?boolean,
  name: ?string,

  onChange: (variableId: string, binding: BindingT) => void,
}

function Input({ value, variableId, type, onChange, readOnly, label }: PropsT) {
  return (
    <LabeledBinding
      binding={value}
      allowStatic
      key={variableId}
      label={label || <VariableName expression={variableId} />}
      type={type}
      onChange={onChange}
      readOnly={readOnly}
    />
  )
}

const enhance = withHandlers({
  onChange: ({ variableId, onChange }: PropsT) => (binding: BindingT) =>
    onChange(variableId, binding),
})

export default enhance(Input)



// WEBPACK FOOTER //
// ./src/activities/views/activities/intermediateEvents/Input.js