// @flow
import React from 'react'
import Case from './Case'
import Task from './Task'
import Report from './Report'
import Workflow from './Workflow'
import type { ResultT } from '../../../types'

const previewOptions = {
  task: Task,
  case: Case,
  report: Report,
  workflow: Workflow,
}

type PropsT = {
  result: ResultT,
  type: string,
}

function Preview({ result, type }: PropsT) {
  const Component = previewOptions[type]

  return <Component {...result} />
}

export default Preview



// WEBPACK FOOTER //
// ./packages/main/src/components/search/preview/index.js