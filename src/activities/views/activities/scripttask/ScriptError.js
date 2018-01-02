// @flow
import React from 'react'
import { map, compact } from 'lodash'

import { defaultStyle } from '@signavio/effektif-commons/lib/styles'

import type { TestErrorT } from '../../../types'

import LineIdentifier from './LineIdentifier'

function ScriptError({ message, stackTrace, style }: TestErrorT) {
  if (stackTrace) {
    return (
      <pre {...style}>
        {map(compact((stackTrace || '').split('\n')), (error, index) =>
          <div key={`${error}-${index}`}>
            <LineIdentifier />
            {error}
          </div>
        )}
      </pre>
    )
  }

  return (
    <pre {...style}>
      {message}
    </pre>
  )
}

const styled = defaultStyle(({ color }) => ({
  border: 'none',
  padding: 0,
  backgroundColor: 'transparent',
  color: color.status.danger,
}))

export default styled(ScriptError)



// WEBPACK FOOTER //
// ./src/activities/views/activities/scripttask/ScriptError.js