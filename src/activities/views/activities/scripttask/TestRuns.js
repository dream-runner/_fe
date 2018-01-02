// @flow
import { map, last } from 'lodash'
import i18n from 'signavio-i18n'
import { withHandlers, withState, withProps, compose } from 'recompose'

import { moment } from '@signavio/effektif-commons/lib/extensions'
import { Tile } from '@signavio/effektif-commons/lib/components/tiles'
import { Hint } from '@signavio/effektif-commons/lib/components/hints'
import { defaultStyle, utils } from '@signavio/effektif-commons/lib/styles'
import {
  DropdownSelect,
  Option,
} from '@signavio/effektif-commons/lib/components/forms'

import type { TestRunT } from '../../../types'

import TestRun from './TestRun'

type PropsT = {
  testRuns: Array<TestRunT>,
  testRun: TestRunT,
  testRunning: boolean,
  onSelect: (index: number) => void,
}

function TestRuns({ testRuns, testRun, testRunning, style, onSelect }: PropsT) {
  const index = testRuns.indexOf(testRun)

  return (
    <div {...style}>
      <Tile>
        <DropdownSelect
          readOnly={testRunning}
          placeholder={i18n('Select a test run')}
          value={index === -1 ? null : index}
          onChange={onSelect}
        >
          {map(testRuns, ({ date }, index) =>
            <Option
              key={date}
              value={index}
              name={moment(date).format('LLL')}
            />
          )}
        </DropdownSelect>
      </Tile>

      <div {...style('content')}>
        {testRun
          ? <TestRun {...testRun} />
          : <Hint info>
              {i18n(
                'Once you start a test run of your script, the results will be shown here.'
              )}
            </Hint>}
      </div>
    </div>
  )
}

const styled = defaultStyle(({ color, padding }) => ({
  ...utils.border(1, 'solid', color.mono.light),

  header: {
    backgroundColor: color.mono.ultralight,

    ...utils.borderBottom(1, 'solid', color.mono.light),
  },

  content: {
    padding: padding.normal,
  },
}))

export default compose(
  withState('testRun', 'selectRun', null),
  withHandlers({
    onSelect: ({ selectRun }) => (index: number) => selectRun(index),
  }),
  withProps(({ testRuns, testRun }) => ({
    testRun: testRuns[testRun] || last(testRuns),
  })),
  styled
)(TestRuns)



// WEBPACK FOOTER //
// ./src/activities/views/activities/scripttask/TestRuns.js