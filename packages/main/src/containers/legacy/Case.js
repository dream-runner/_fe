// @flow
import React from 'react'
import { Switch, Route } from 'react-router'

import LegacyView from './LegacyView'

export default function LegacyCase({ match }) {
  return (
    <div>
      <Switch>
        <Route exact path={match.url} component={LegacyView} />
        <Route path={`${match.url}/:caseId`} component={LegacyView} />
        <Route path={`${match.url}/:caseId/print`} component={LegacyView} />
        <Route
          path={`${match.url}/:caseId/task/:taskId`}
          component={LegacyView}
        />
      </Switch>
    </div>
  )
}



// WEBPACK FOOTER //
// ./packages/main/src/containers/legacy/Case.js