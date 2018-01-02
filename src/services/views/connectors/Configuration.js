// @flow
import React from 'react'
import { withState, withHandlers, compose } from 'recompose'

import i18n from 'signavio-i18n'

import { List, omitProps } from '@signavio/effektif-commons/lib/components'

import { LabeledField } from '../../../../packages/fields'

import type { ConnectorT } from '../../types'

import Authentication from './authentication'

type PropsT = {
  connector: ConnectorT,

  description: string,
  name: string,

  onAuthenticationChange: (authentication: AuthenticationT) => void,
  onNameChange: (name: string) => void,
  onDescriptionChange: (description: string) => void,
  onComplete: () => void,
}

function Configuration(props: PropsT) {
  const {
    connector,
    description,
    name,
    onAuthenticationChange,
    onNameChange,
    onDescriptionChange,
    onComplete,
  } = props

  return (
    <List>
      <Authentication
        authentication={connector.authentication}
        onChange={onAuthenticationChange}
      />

      <LabeledField
        readOnly
        label={i18n('URL endpoint')}
        value={connector.url}
        type={{ name: 'link' }}
      />

      <LabeledField
        label={i18n('Name')}
        type={{ name: 'text' }}
        value={name}
        onChange={onNameChange}
        onComplete={onComplete}
      />

      <LabeledField
        label={i18n('Description')}
        type={{ name: 'text', multiLine: true }}
        value={description}
        onChange={onDescriptionChange}
        onComplete={onComplete}
      />
    </List>
  )
}

type ApiPropsT = PropsT & {
  onChange: (connector: ConnectorT) => void,

  setName: (name: string) => void,
  setDescription: (description: string) => void,
}

export default compose(
  withState('name', 'setName', ({ connector }: ApiPropsT) => connector.name),
  withState(
    'description',
    'setDescription',
    ({ connector }: ApiPropsT) => connector.description
  ),
  withHandlers({
    onNameChange: ({ setName }: ApiPropsT) => (name: string) => setName(name),
    onDescriptionChange: ({ setDescription }: ApiPropsT) => (
      description: string
    ) => setDescription(description),
    onAuthenticationChange: ({ connector, onChange }: ApiPropsT) => (
      authentication: AuthenticationT
    ) => onChange({ ...connector, authentication }),
    onComplete: ({ connector, name, description, onChange }: ApiPropsT) => () =>
      onChange({ ...connector, name, description }),
  }),
  omitProps(['setDescription', 'setName', 'onChange'])
)(Configuration)



// WEBPACK FOOTER //
// ./src/services/views/connectors/Configuration.js