// @flow
import React from 'react'
import { compose, withState, withHandlers } from 'recompose'

import i18n from 'signavio-i18n'

import { List, omitProps } from '@signavio/effektif-commons/lib/components'

import { LabeledField } from '../../../../../packages/fields'

import type { AuthenticationT } from '../../../types'

type PropsT = {
  username: string,
  password: string,

  onUserNameChange: (username: string) => void,
  onPasswordChange: (password: string) => void,

  onComplete: () => void,
}

function Basic(props: PropsT) {
  const {
    username,
    password,
    onUserNameChange,
    onPasswordChange,
    onComplete,
    ...rest
  } = props

  return (
    <List {...rest}>
      <LabeledField
        label={i18n('Username')}
        type={{ name: 'text' }}
        value={username}
        onChange={onUserNameChange}
        onComplete={onComplete}
      />
      <LabeledField
        label={i18n('Password')}
        type={{ name: 'text' }}
        inputType="password"
        value={password}
        onChange={onPasswordChange}
        onComplete={onComplete}
      />
    </List>
  )
}

type ApiPropsT = PropsT & {
  authentication: AuthenticationT,

  onChange: (authentication: AuthenticationT) => void,

  setUserName: (value: string) => void,
  setPassword: (value: string) => void,
}

export default compose(
  withState(
    'username',
    'setUserName',
    ({ authentication }: ApiPropsT) => authentication.username
  ),
  withState(
    'password',
    'setPassword',
    ({ authentication }: ApiPropsT) => authentication.password
  ),
  withHandlers({
    onUserNameChange: ({ setUserName }: ApiPropsT) => (value: string) =>
      setUserName(value),
    onPasswordChange: ({ setPassword }: ApiPropsT) => (value: string) =>
      setPassword(value),
    onComplete: ({
      username,
      password,
      authentication,
      onChange,
    }: ApiPropsT) => () => onChange({ ...authentication, username, password }),
  }),
  omitProps(['authentication', 'onChange', 'setUserName', 'setPassword'])
)(Basic)



// WEBPACK FOOTER //
// ./src/services/views/connectors/authentication/Basic.js