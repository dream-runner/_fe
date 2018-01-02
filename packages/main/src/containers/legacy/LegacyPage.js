// @flow
import React from 'react'
import { Route, Switch } from 'react-router'

import LegacyView from './LegacyView'

function LegacyPage({ match }) {
  return (
    <div>
      <Switch>
        <Route exact path={match.url} component={LegacyView} />
        <Route path={`${match.url}/*`} component={LegacyView} />
      </Switch>
    </div>
  )
}

export default LegacyPage



// WEBPACK FOOTER //
// ./packages/main/src/containers/legacy/LegacyPage.js