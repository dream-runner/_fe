// @flow
import React from 'react'
import { Switch, Route, Redirect } from 'react-router'

import Analytics from '@signavio/effektif-reporting'
import Cases from '@signavio/workflow-cases'

import { SearchContainer } from '../components'

import { LegacyPage, LegacyCase, LegacyProcess, LegacyAdmin } from './legacy'

export default function AuthenticatedPage({ match }) {
  return (
    <div>
      <Switch>
        <Route path={`${match.url}/buy/:license?`} component={LegacyPage} />
        <Route path={`${match.url}/admin`} component={LegacyAdmin} />
        <Route path={`${match.url}/processes`} component={LegacyPage} />
        <Route path={`${match.url}/process`} component={LegacyPage} />
        <Route
          path={`${match.url}/process/:processId`}
          component={LegacyProcess}
        />
        <Route path={`${match.url}/tour`} component={LegacyPage} />
        <Route path={`${match.url}/tasks`} component={LegacyPage} />
        <Route path={`${match.url}/cases/:pid?`} component={LegacyPage} />
        <Route path={`${match.url}/case`} component={LegacyCase} />

        <Route path={`${match.url}/examples`} component={LegacyPage} />
        <Route path={`${match.url}/organization`} component={LegacyPage} />
        <Route path={`${match.url}/services`} component={LegacyPage} />

        <Route
          path={`${match.url}/search/:query?`}
          component={SearchContainer}
        />
        <Route path={`${match.url}/ncase`} component={Cases} />
        <Route path={`${match.url}/analytics`} component={Analytics} />

        <Redirect to={`${match.url}/tasks`} />
      </Switch>
    </div>
  )
}



// WEBPACK FOOTER //
// ./packages/main/src/containers/AuthenticatedPage.js