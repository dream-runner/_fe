// @flow

import React from 'react'

import type { AuthenticationT } from '../../../types'

import Basic from './Basic'
import QueryParameter from './QueryParameter'
import HeaderValue from './HeaderValue'

const DETAILS = {
  basic: Basic,
  header: HeaderValue,
  parameter: QueryParameter,
}

type Props = {
  authentication: AuthenticationT,

  onChange: (authentication: AuthenticationT) => void,
}

export default function DetailsConfiguration({
  onChange,
  authentication,
  ...rest
}: Props) {
  const Component = DETAILS[authentication.type]

  if (!Component) {
    console.error(
      `No detail configuration found for auth type ${authentication.type}!`
    )

    return null
  }

  return (
    <Component {...rest} onChange={onChange} authentication={authentication} />
  )
}



// WEBPACK FOOTER //
// ./src/services/views/connectors/authentication/Details.js