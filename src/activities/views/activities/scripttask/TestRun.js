// @flow
import React from 'react'
import i18n from 'signavio-i18n'
import { map, compact } from 'lodash'

import { moment } from '@signavio/effektif-commons/lib/extensions'
import { Icon, Divider } from '@signavio/effektif-commons/lib/components'
import { defaultStyle } from '@signavio/effektif-commons/lib/styles'

import type { TestRunT } from '../../../types'

import TestResults from './TestResults'
import ScriptError from './ScriptError'
import LineIdentifier from './LineIdentifier'

function TestRun({
  error,
  log,
  date,
  mappings,
  variableUpdates,
  testValues,
  style,
}: TestRunT) {
  return (
    <div {...style}>
      <div {...style('conclusion')}>
        {error
          ? i18n('Test execution failed at __time__', {
              time: moment(date).format('HH:mm:ss'),
            })
          : i18n('Test execution finished successfully at __time__', {
              time: moment(date).format('HH:mm:ss'),
            })}
      </div>

      <Divider title={i18n('Variable updates')} />

      <TestResults
        mappings={mappings}
        variableUpdates={variableUpdates}
        testValues={testValues}
      />

      <Divider title={i18n('Logs')} />

      <div {...style('logs')}>
        {map(compact((log || '').split('\n')), (line, index) =>
          <div key={`${line}-${index}`}>
            <LineIdentifier />
            {line}
          </div>
        )}
      </div>

      {error &&
        <div>
          <Divider title={i18n('Error')} />

          <ScriptError {...error} />
        </div>}
    </div>
  )
}

const styled = defaultStyle(
  ({ padding, color, font }) => ({
    conclusion: {
      fontWeight: 'bold',
    },

    logs: {
      minHeight: 100,
      maxHeight: 300,
      overflowY: 'scroll',

      fontSize: font.size.small,
      fontFamily: "'courier new', Consolas",
    },

    '&error': {
      logs: {
        color: color.status.danger,
      },
    },

    '&success': {
      logs: {
        color: color.status.success,
      },
    },
  }),
  ({ error }) => ({
    '&error': !!error,
    '&success': !error,
  })
)

export default styled(TestRun)



// WEBPACK FOOTER //
// ./src/activities/views/activities/scripttask/TestRun.js