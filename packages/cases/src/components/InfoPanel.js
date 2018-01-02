// @flow
import React from 'react'
import { isNull } from 'lodash'
import { compose, withHandlers, withState } from 'recompose'

import {
  withUserPreferences,
  withUser,
  connect,
  types,
} from '@signavio/effektif-api'
import { defaultStyle, utils } from '@signavio/effektif-commons/lib/styles'

import { Comments } from '../comments'
import { ActivityStream } from '../events'

import CoreInformation from './CoreInformation'
import Toolbar from './Toolbar'

type PropsT = {
  caseId: string,
  taskId?: string,

  panel?: 'events' | 'comments' | 'coreInfo',
}

function InfoPanel({ caseId, taskId, panel }: PropsT) {
  if (panel === 'events') {
    return <ActivityStream caseId={caseId} taskId={taskId} />
  }

  if (panel === 'comments') {
    return <Comments caseId={caseId} taskId={taskId} />
  }

  if (panel === 'coreInfo') {
    return <CoreInformation caseId={caseId} />
  }

  return null
}

export default InfoPanel



// WEBPACK FOOTER //
// ./packages/cases/src/components/InfoPanel.js