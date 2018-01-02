// @flow
import React from 'react'
import { withState, withHandlers, compose } from 'recompose'
import { Row, Col } from '@signavio/effektif-commons/lib/components/grid'
import type { ResultsT, ResultT } from '../../types'

import Preview from './preview/index'
import Tasks from './Tasks'
import Cases from './Cases'
import Reports from './Reports'
import Workflows from './Workflows'

type ItemT = {
  result: ResultT,
  type: 'task' | 'case' | 'report' | 'workflow',
}

type PropsT = {
  results: ResultsT,

  activeItem: ItemT,

  onActivate: (result: ResultT) => void,
}

function SearchResults({ results, activeItem, onActivate }: PropsT) {
  const { result, type } = activeItem
  const { cases, tasks, reports, workflows } = results

  return (
    <Row>
      <Col sm={4}>
        {cases.length !== 0 && <Cases cases={cases} onActivate={onActivate} />}
        {tasks.length !== 0 && <Tasks tasks={tasks} onActivate={onActivate} />}
        {reports.length !== 0 && (
          <Reports reports={reports} onActivate={onActivate} />
        )}
        {workflows.length !== 0 && (
          <Workflows workflows={workflows} onActivate={onActivate} />
        )}
      </Col>
      <Col sm={8}>{result && <Preview result={result} type={type} />}</Col>
    </Row>
  )
}

export default compose(
  withState('activeItem', 'setActiveItem', {}),
  withHandlers({
    onActivate: ({ setActiveItem }) => (result: ResultT, type: string) =>
      setActiveItem({ result, type }),
  })
)(SearchResults)



// WEBPACK FOOTER //
// ./packages/main/src/components/search/SearchResults.js