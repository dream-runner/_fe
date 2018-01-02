// @flow
import React from 'react'
import i18n from 'signavio-i18n'
import { Link } from 'react-router-dom'

import { prependOrg } from '@signavio/effektif-api'

import { List, Divider } from '@signavio/effektif-commons/lib/components'

import type { ReportResultT } from '../../types/index'

import { activateWithType } from './higher-order'

import Result from './Result'

type PropsT = {
  reports: Array<ReportResultT>,
  onActivate: (result: ReportResultT) => void,
}

function Reports({ reports, onActivate }: PropsT) {
  return (
    <div>
      <Divider title={i18n('Reports')} />

      <List>
        {reports.map(report => (
          <Link
            key={report.id}
            to={prependOrg(`/analytics/report/${report.id}`)}
          >
            <Result
              key={report.id}
              result={report}
              iconSet="signavio"
              icon="chart"
              onActivate={onActivate}
            >
              {report.name}
            </Result>
          </Link>
        ))}
      </List>
    </div>
  )
}

export default activateWithType('report')(Reports)



// WEBPACK FOOTER //
// ./packages/main/src/components/search/Reports.js