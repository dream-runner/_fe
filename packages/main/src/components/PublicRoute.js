// @flow
import React from 'react'
import { Route, Redirect } from 'react-router'

import Login from 'singleton/Login'

type PropsT = {
  component: React$Class<*>,
}

export default function PublicRoute({ component: Component, ...rest }: PropsT) {
  return (
    <Route
      {...rest}
      render={props => {
        if (Login.token()) {
          const currentOrg = Login.organization() && Login.organization().key

          return <Redirect to={`/${currentOrg}/tasks`} />
        }

        return <Component {...props} />
      }}
    />
  )
}



// WEBPACK FOOTER //
// ./packages/main/src/components/PublicRoute.js