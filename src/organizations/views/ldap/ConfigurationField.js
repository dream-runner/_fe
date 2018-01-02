// @flow
import React from 'react'
import { withState, withHandlers, withPropsOnChange, compose } from 'recompose'

import { omitProps } from '@signavio/effektif-commons/lib/components'

import { LabeledField } from '../../../../packages/fields'

type PropsT = {
  isPassword?: boolean,
}

function ConfigurationField(props: PropsT) {
  const { isPassword, ...rest } = props

  return (
    <LabeledField
      {...rest}
      type={{ name: 'text' }}
      inputType={isPassword ? 'password' : 'text'}
    />
  )
}

type ApiPropsT = PropsT & {
  value: string,

  setValue: (value: string) => void,
  onChange: (value: string) => void,
}

export default compose(
  withPropsOnChange(
    (oldProps: PropsT, newProps: PropsT) =>
      oldProps.oldValue !== newProps.value,
    ({ value }: PropsT) => ({ oldValue: value })
  ),
  withState('value', 'setValue', ({ value }: propsT) => value),
  withHandlers({
    onChange: ({ setValue }: ApiPropsT) => (value: string) => setValue(value),
    onComplete: ({ onChange, oldValue }: PropsT) => (newValue: string) => {
      if (oldValue === newValue) {
        return
      }

      onChange(newValue)
    },
  }),
  omitProps(['setValue', 'oldValue'])
)(ConfigurationField)



// WEBPACK FOOTER //
// ./src/organizations/views/ldap/ConfigurationField.js