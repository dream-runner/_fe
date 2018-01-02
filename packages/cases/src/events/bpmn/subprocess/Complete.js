// @flow
import React from 'react'

import i18n from 'signavio-i18n'

import Event from '@signavio/workflow-events'

import type { SubProcessEventT } from '../../../types'

import { CaseLink } from '../../components'

type PropsT = {
  event: SubProcessEventT,
}

export default function SubprocessCompleteEvent({ event, ...rest }: PropsT) {
  const { subCaseName, subCaseId } = event

  return (
    <Event
      {...rest}
      iconSet="fontAwesome"
      icon="folder-o"
      event={event}
      title={i18n('Sub case __case__ completed', {
        case: <CaseLink caseId={subCaseId}>{subCaseName}</CaseLink>,
      })}
    />
  )
}



// WEBPACK FOOTER //
// ./packages/cases/src/events/bpmn/subprocess/Complete.js