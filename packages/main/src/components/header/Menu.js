import React from 'react'
import i18n from 'signavio-i18n'

import { withUserPreferences, prependOrg } from '@signavio/effektif-api'

import {
  LinkHeaderTab,
  Feature,
  List,
} from '@signavio/effektif-commons/lib/components'

function MainMenu({ userPreferences }) {
  const { tasksTab, casesProcessId } = userPreferences

  return (
    <List direction="horizontal">
      <LinkHeaderTab to={prependOrg(`/tasks/${tasksTab}`)}>
        {i18n('Tasks')}
      </LinkHeaderTab>
      <LinkHeaderTab
        to={prependOrg(`/cases${casesProcessId ? `/${casesProcessId}` : ''}`)}
      >
        {i18n('Cases')}
      </LinkHeaderTab>
      <div className="hidden-xs" style={{ display: 'inline-block' }}>
        <LinkHeaderTab to={prependOrg('/processes')}>
          {i18n('Processes')}
        </LinkHeaderTab>

        <Feature
          feature="Action.CreateReports"
          sneakPeek
          tooltip={i18n('Analytics are coming soon. Stay tuned!')}
          tooltipPlacement="bottom"
          style={{ display: 'inline-block' }}
        >
          <LinkHeaderTab to={prependOrg('/analytics')}>
            {i18n('Analytics')}
          </LinkHeaderTab>
        </Feature>
      </div>
    </List>
  )
}

export default withUserPreferences(MainMenu)



// WEBPACK FOOTER //
// ./packages/main/src/components/header/Menu.js