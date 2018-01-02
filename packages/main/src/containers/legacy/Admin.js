// @flow
import React from 'react'
import { Switch, Route } from 'react-router'

import LegacyView from './LegacyView'

export default function LegacyAdmin({ match }) {
  return (
    <div>
      <Switch>
        <Route exact path={match.url} component={LegacyView} />
        <Route path={`${match.url}/organization/:id?`} component={LegacyView} />
        <Route path={`${match.url}/auth/:tab?/:id?`} component={LegacyView} />
        <Route path={`${match.url}/users/:id?`} component={LegacyView} />
        <Route
          path={`${match.url}/registrations/:id?`}
          component={LegacyView}
        />
        <Route path={`${match.url}/releases/:id?`} component={LegacyView} />
        <Route path={`${match.url}/feedback/:id?`} component={LegacyView} />
        <Route path={`${match.url}/purchase/:id?`} component={LegacyView} />
        <Route path={`${match.url}/logs`} component={LegacyView} />
        <Route path={`${match.url}/system`} component={LegacyView} />
      </Switch>
    </div>
  )
}



// WEBPACK FOOTER //
// ./packages/main/src/containers/legacy/Admin.js