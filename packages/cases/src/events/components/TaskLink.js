// @flow
import React from 'react'
import { Link } from 'react-router-dom'

import { prependOrg } from '@signavio/effektif-api'

import type { TaskT } from '../../types'

import { taskName } from '../utils'

type PropsT = {
  task: TaskT,

  caseId: string,
}

export default function TaskLink({ task, caseId }: PropsT) {
  return (
    <Link to={prependOrg(`/case/${caseId}/task/${task.id}`)}>
      {taskName(task)}
    </Link>
  )
}



// WEBPACK FOOTER //
// ./packages/cases/src/events/components/TaskLink.js