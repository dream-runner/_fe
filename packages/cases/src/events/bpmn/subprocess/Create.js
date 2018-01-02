// @flow
import React from 'react'

import i18n from 'signavio-i18n'

import { LogEvent } from '@signavio/workflow-events'

import type { SubProcessEventT } from '../../../types'

import { CaseLink } from '../../components'

type PropsT = {
  event: SubProcessEventT,
}

export default function SubProcessCreateEvent({ event, ...rest }: PropsT) {
  const { error, subCaseName, subCaseId } = event

  return (
    <LogEvent
      {...rest}
      iconSet="fontAwesome"
      markdown
      icon="folder-open-o"
      event={event}
      title={
        error
          ? i18n('Sub case not started')
          : i18n('Sub case __case__ started', {
              case: <CaseLink caseId={subCaseId}>{subCaseName}</CaseLink>,
            })
      }
    />
  )
}



// WEBPACK FOOTER //
// ./packages/cases/src/events/bpmn/subprocess/Create.js