// @flow
import React from 'react'
import { compose, withState, lifecycle, withHandlers } from 'recompose'

import i18n from 'signavio-i18n'

import {
  List,
  ContextHelp,
  omitProps,
} from '@signavio/effektif-commons/lib/components'

import { ValidatedField } from '../../../../../packages/fields'

import type { AuthenticationT } from '../../../types'

type Props = {
  name: string,
  value: string,

  onNameChange: (name: string) => void,
  onValueChange: (value: string) => void,

  onComplete: () => void,
}

function HeaderValue({
  name,
  value,
  onNameChange,
  onValueChange,
  onComplete,
  ...rest
}: Props) {
  return (
    <List {...rest}>
      <ValidatedField
        label={i18n('Header name')}
        description={
          <ContextHelp>
            {i18n(
              "The header name is allowed to contain the following characters: `a-z`, `A-Z`, `0-9` and any of ```!#$%&'*+-.^_`|~```",
              {
                markdown: true,
              }
            )}
          </ContextHelp>
        }
        type={{ name: 'text' }}
        value={name}
        onChange={onNameChange}
        onComplete={onComplete}
        validationErrors={
          !isValidName(name) && [
            i18n('The header name contains unsupported characters.'),
          ]
        }
      />
      <ValidatedField
        label={i18n('Header value')}
        description={i18n(
          'The header value is allowed to contain any visible ASCII character which is in the range of 32 to 126.'
        )}
        type={{ name: 'text' }}
        value={value}
        onChange={onValueChange}
        onComplete={onComplete}
        validationErrors={
          !isValidValue(value) && [
            i18n(
              'The header value must only contain visible ASCII characters.'
            ),
          ]
        }
      />
    </List>
  )
}

// the following two functions check HTTP request header name and values according to http://httpwg.org/specs/rfc7230.html#header.fields

/**
 * Checks if value only contains valid header name characters.
 * Letters, numbers and
 */
function isValidName(value: string) {
  if (value) {
    return /^(\d|\w|[!#$%&'*+-.^_`|~])*$/.test(value)
  }
  return true
}

/**
 * Checks if value only contains visible ASCII characters in the range of 32 to 126.
 */
function isValidValue(value: string) {
  if (value) {
    return /^[\x20-\x7E]*$/.test(value)
  }
  return true
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
  lifecycle({
    componentWillReceiveProps(nextProps: ApiPropsT) {
      if (this.props.authentication === nextProps.authentication) {
        return
      }

      const { setName, setValue } = this.props
      const { name, value } = nextProps.authentication

      setName(name)
      setValue(value)
    },
  }),
  withHandlers({
    onNameChange: ({ setName }: ApiPropsT) => (name: string) => setName(name),
    onValueChange: ({ setValue }: ApiPropsT) => (value: string) =>
      setValue(value),
    onComplete: ({
      authentication,
      name,
      value,
      onChange,
    }: ApiPropsT) => () => {
      if (!isValidName(name) || !isValidValue(value)) {
        return
      }

      onChange({ ...authentication, name, value })
    },
  }),
  omitProps(['setName', 'setValue', 'authentication', 'onChange'])
)(HeaderValue)



// WEBPACK FOOTER //
// ./src/services/views/connectors/authentication/HeaderValue.js