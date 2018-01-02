// @flow
import React from 'react'
import i18n from 'signavio-i18n'
import { Link } from 'react-router-dom'

import { prependOrg } from '@signavio/effektif-api'

import { List, Divider } from '@signavio/effektif-commons/lib/components'

import type { CaseResultT } from '../../types'

import { activateWithType } from './higher-order'

import Result from './Result'

type PropsT = {
  cases: Array<CaseResultT>,
  onActivate: (result: CaseResultT) => void,
}

function Cases({ cases, onActivate }: PropsT) {
  return (
    <div>
      <Divider title={i18n('Cases')} />

      <List>
        {cases.map(caze => (
          <Link key={caze.id} to={prependOrg(`/case/${caze.id}`)}>
            <Result
              result={caze}
              iconSet="fontAwesome"
              icon={caze.closed ? 'folder-o' : 'folder-open-o'}
              onActivate={onActivate}
            >
              {caze.name}
            </Result>
          </Link>
        ))}
      </List>
    </div>
  )
}

export default activateWithType('case')(Cases)



// WEBPACK FOOTER //
// ./packages/main/src/components/search/Cases.js