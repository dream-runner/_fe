// @flow
import * as React from 'react'
import { compose } from 'recompose'

import { OrganizationT, withOrganization } from '@signavio/effektif-api'

import { ThemeProvider } from '@signavio/ui'

import { withAuthentication, withLocale } from './higher-order'

type PropsT = {
  organization: OrganizationT,

  children: React.Node,
}

function ContextProvider({ organization, children }: PropsT) {
  let themeName = 'default'

  if (organization && organization.customCSS) {
    themeName = organization.customCSS
  }

  let theme

  try {
    theme = require(`../themes/${themeName}/index`)
  } catch (e) {
    theme = require('../themes/default/index')
  }

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}

export default compose(withAuthentication, withLocale, withOrganization)(
  ContextProvider
)



// WEBPACK FOOTER //
// ./packages/main/src/components/ContextProvider.js