// @flow
import React from 'react'
import { mapProps, withHandlers, compose } from 'recompose'

import { LabeledBinding } from '@signavio/effektif-fields'

import type { BindingT } from '../../types'
import type { InputDescriptorT } from '../types'

type PropsT<T> = {
  input: InputDescriptorT,
  label: ?string,

  readOnly: boolean,
  onCreateVariable: (variable: Object) => void,

  value: ?BindingT<T>,

  onChange: (key: string, name: string, value: ?BindingT<T>) => void,
}

function Input<T>({
  input,
  value,
  readOnly,
  onCreateVariable,
  onChange,
  label,
}: PropsT<T>) {
  const { type } = input

  return (
    <LabeledBinding
      binding={value}
      label={label}
      allowStatic
      allowCreate
      canClear
      readOnly={readOnly}
      type={type}
      onCreateVariable={onCreateVariable}
      onChange={onChange}
    />
  )
}

export default compose(
  mapProps(({ input, ...rest }) => ({
    ...rest,
    input,
    label: input.name,
  })),
  withHandlers({
    onCreateVariable: ({ input, onCreateVariable }) => variable =>
      onCreateVariable(input.key, variable),
    onChange: ({ input, onChange }) => binding => {
      const { key, name } = input

      onChange(key, name, binding)
    },
  })
)(Input)



// WEBPACK FOOTER //
// ./packages/workflows-app/src/actions/components/Input.js