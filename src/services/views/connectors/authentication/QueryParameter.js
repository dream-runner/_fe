// @flow
import React from 'react'
import { withState, withHandlers, compose } from 'recompose'

import i18n from 'signavio-i18n'

import { List, omitProps } from '@signavio/effektif-commons/lib/components'

import { LabeledField } from '../../../../../packages/fields'

import type { AuthenticationT } from '../../../types'

type PropsT = {
  name: string,
  value: string,

  onNameChange: (name: string) => void,
  onValueChange: (value: string) => void,

  onComplete: () => void,
}

function QueryParameter({
  name,
  value,
  onNameChange,
  onValueChange,
  onComplete,
  ...rest
}: PropsT) {
  return (
    <List {...rest}>
      <LabeledField
        label={i18n('Parameter name')}
        type={{ name: 'text' }}
        value={name}
        onComplete={onComplete}
        onChange={onNameChange}
      />
      <LabeledField
        label={i18n('Parameter value')}
        type={{ name: 'text' }}
        value={value}
        onComplete={onComplete}
        onChange={onValueChange}
      />
    </List>
  )
}

type ApiPropsT = PropsT & {
  authentication: AuthenticationT,
  onChange: (authentication: AuthenticationT) => void,

  setName: (name: string) => void,
  setValue: (value: string) => void,
}

export default compose(
  withState(
    'name',
    'setName',
    ({ authentication }: ApiPropsT) => authentication.name
  ),
  withState(
    'value',
    'setValue',
    ({ authentication }: ApiPropsT) => authentication.value
  ),
  withHandlers({
    onNameChange: ({ setName }: ApiPropsT) => (name: string) => setName(name),
    onValueChange: ({ setValue }: ApiPropsT) => (value: string) =>
      setValue(value),
    onComplete: ({ authentication, name, value, onChange }: ApiPropsT) => () =>
      onChange({ ...authentication, name, value }),
  }),
  omitProps(['authentication', 'setName', 'setValue', 'onChange'])
)(QueryParameter)



// WEBPACK FOOTER //
// ./src/services/views/connectors/authentication/QueryParameter.js