// @flow
import React from 'react'
import i18n from 'signavio-i18n'

import { LogEvent } from '@signavio/workflow-events'

import type { IntermediateLinkEventT } from '../../../types'

import { CaseLink } from '../../components'

type PropsT = {
  event: IntermediateLinkEventT,
}

export default function IntermediateLinkEvent({ event }: PropsT) {
  const { error, subCaseName, subCaseId } = event

  return (
    <LogEvent
      event={event}
      markdown
      iconSet="fontAwesome"
      icon="folder-open-o"
      title={
        error ? (
          i18n('Case not started')
        ) : (
          i18n('Case __subCaseName__ started', {
            subCaseName: <CaseLink caseId={subCaseId}>{subCaseName}</CaseLink>,
          })
        )
      }
    />
  )
}



// WEBPACK FOOTER //
// ./packages/cases/src/events/bpmn/events/IntermediateLink.js