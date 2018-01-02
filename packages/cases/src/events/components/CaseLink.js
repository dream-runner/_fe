// @flow
import React from 'react'
import { Link } from 'react-router-dom'

import { prependOrg } from '@signavio/effektif-api'

type PropsT = {
  caseId: string,
  children: React$Element<any>,
}

export default function CaseLink({ caseId, children }: PropsT) {
  return <Link to={prependOrg(`/case/${caseId}`)}>{children}</Link>
}



// WEBPACK FOOTER //
// ./packages/cases/src/events/components/CaseLink.js