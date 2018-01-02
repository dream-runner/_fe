// @flow
import React from 'react'
import { Switch, Route } from 'react-router'

import LegacyView from './LegacyView'

export default function LegacyProcess({ match }) {
  return (
    <div>
      <Switch>
        <Route exact path={match.url} component={LegacyView} />
        <Route
          path={`${match.url}/activity/:activityId`}
          component={LegacyView}
        />

        <Route path={`${match.url}/trigger`} component={LegacyView} />
        <Route path={`${match.url}/actions`} component={LegacyView} />
        <Route path={`${match.url}/details`} component={LegacyView} />
        <Route path={`${match.url}/versions`} component={LegacyView} />

        <Route path={`${match.url}/start`} component={LegacyView} />
      </Switch>
    </div>
  )
}



// WEBPACK FOOTER //
// ./packages/main/src/containers/legacy/Process.js