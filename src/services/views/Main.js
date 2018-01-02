// @flow
import React from 'react'

import Router from 'singleton/Router'

import i18n from 'signavio-i18n'

import { padding } from '@signavio/effektif-commons/lib/styles'
import {
  Feature,
  DocumentTitle,
} from '@signavio/effektif-commons/lib/components'
import { TabBar, Tab } from '@signavio/effektif-commons/lib/components/tabs'

import { withOrganization } from '@signavio/effektif-api'
import type { OrganizationT } from '@signavio/effektif-api'

import Services from './services'
import Connectors from './connectors'
import SpmIntegration from './spmIntegration'

const SUBVIEWS = {
  services: Services,
  connectors: Connectors,
  spmIntegration: SpmIntegration,
}

type PropsT = {
  tab: string,
  organization: OrganizationT,
}

function Main({ tab = 'services', organization, ...rest }: PropsT) {
  const SubView = SUBVIEWS[tab]

  return (
    <div className="view services">
      <DocumentTitle title={i18n('Services & Connectors')} />

      <div className="view-header">
        <h1>{i18n('Services & Connectors')}</h1>
      </div>

      <div className="view-content">
        <TabBar style={{ marginBottom: padding.large }}>
          <a href={Router.reverse('services')}>
            <Tab active={tab === 'services'}>{i18n('Services')}</Tab>
          </a>
          <Feature
            sneakPeek
            style={{ display: 'inline-block' }}
            tooltip={i18n(
              'Connectors are only available in the Enterprise edition'
            )}
            feature="Component.Connectors"
          >
            <a href={Router.reverse('services', { tab: 'connectors' })}>
              <Tab active={tab === 'connectors'}>{i18n('Connectors')}</Tab>
            </a>
          </Feature>
          <Feature feature="Component.DictionaryConnector">
            <a href={Router.reverse('services', { tab: 'spmIntegration' })}>
              <Tab active={tab === 'spmIntegration'}>
                {i18n('Process Manager Integration')}
              </Tab>
            </a>
          </Feature>
        </TabBar>

        <SubView {...rest} organization={organization} />
      </div>
    </div>
  )
}

export default withOrganization(Main)



// WEBPACK FOOTER //
// ./src/services/views/Main.js