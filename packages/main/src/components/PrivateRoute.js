// @flow
import React from 'react'
import { Route, Redirect } from 'react-router'

import Login from 'singleton/Login'

type RoutePropsT = {
  location: Location,
}

type PropsT = {
  component: React$Class<*>,
  global?: boolean,
}

export default function PrivateRoute({
  component: Component,
  global,
  onOrganizationSwitch,
  ...rest
}: PropsT) {
  return (
    <Route
      {...rest}
      render={(props: RoutePropsT) => {
        const { location, match } = props

        if (!Login.token()) {
          return (
            <Redirect to={{ pathname: '/login', state: { from: location } }} />
          )
        }

        const currentOrg = Login.organization() && Login.organization().key

        if (match.params.organization !== currentOrg && !global) {
          const userOrgs = Login.organizations().map(({ key }) => key)

          if (userOrgs.indexOf(match.params.organization) >= 0) {
            onOrganizationSwitch(match.params.organization)

            return null
          }

          return (
            <Redirect
              to={{
                pathname: `/${currentOrg}${location.pathname}`,
                state: { from: location },
              }}
            />
          )
        }

        return <Component {...props} />
      }}
    />
  )
}



// WEBPACK FOOTER //
// ./packages/main/src/components/PrivateRoute.js