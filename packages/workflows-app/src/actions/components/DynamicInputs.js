// @flow
import React from 'react'
import { isUndefined, isNull } from 'lodash'
import i18n from 'signavio-i18n'
import { withHandlers, compose } from 'recompose'
import { getFieldsContext } from '@signavio/effektif-fields'

import { List } from '@signavio/effektif-commons/lib/components'
import { Hint } from '@signavio/effektif-commons/lib/components/hints'
import { variableUtils } from '../../variables'
import type { BindingT } from '../../types'

import type { InputDescriptorT, MappingT } from '../types'

import Input from './Input'

type Props = {
  value: MappingT,

  readOnly: boolean,

  inputDescriptors: Array<InputDescriptorT>,

  onChange: (value: MappingT) => void,
}

function DynamicInputs(props: Props) {
  const {
    inputDescriptors,
    value,
    readOnly,
    onChange,
    onCreateVariable,
  } = props
  if (!inputDescriptors || inputDescriptors.length === 0) {
    return <Hint info>{i18n('This action does not require any inputs.')}</Hint>
  }

  return (
    <List>
      <Hint>
        {i18n(
          'This action needs to be configured with some data. ' +
            'You can either enter static values or link the inputs ' +
            'with data that already exists in this workflow.'
        )}
      </Hint>

      {inputDescriptors.map((inputDescriptor: InputDescriptorT) => (
        <Input
          key={inputDescriptor.key}
          input={inputDescriptor}
          type={inputDescriptor.type}
          value={value[inputDescriptor.key]}
          readOnly={readOnly}
          onCreateVariable={onCreateVariable}
          onChange={onChange}
        />
      ))}
    </List>
  )
}

const enhance = compose(
  withHandlers({
    onCreateVariable: ({ value, onChange }) => (
      key: string,
      { type, name }
    ) => {
      const newVariable = {
        id: variableUtils.provideId(),
        type,
        name,
      }

      onChange(
        {
          ...value,
          [key]: { expression: newVariable.id },
        },
        [newVariable]
      )
    },
    onChange: ({ value, onChange }) => (
      key: string,
      name: string,
      binding: BindingT
    ) =>
      onChange(
        {
          ...value,

          [key]: binding,
        },
        []
      ),
  }),
  getFieldsContext
)

export default enhance(DynamicInputs)



// WEBPACK FOOTER //
// ./packages/workflows-app/src/actions/components/DynamicInputs.js