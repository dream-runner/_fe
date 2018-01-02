// @flow
import React from 'react'
import { isString, keys } from 'lodash'
import i18n from 'signavio-i18n'

import { Hint } from '@signavio/effektif-commons/lib/components/hints'

import type {
  VariableMappingT,
  VariableUpdatesT,
  TestValuesT,
} from '../../../types'

type PropsT = {
  mappings: Array<VariableMappingT>,
  variableUpdates: VariableUpdatesT,
  testValues: TestValuesT,
}

export default function TestResults({
  mappings,
  variableUpdates,
  testValues,
}: PropsT) {
  if (!mappings || mappings.length === 0) {
    return (
      <Hint inline>
        {i18n('No variables have been updated.')}
      </Hint>
    )
  }

  return (
    <table className="table table-border">
      <thead>
        <tr>
          <th>
            {i18n('Variable')}
          </th>
          <th>
            {i18n('Test value')}
          </th>
          <th>
            {i18n('Updated value')}
          </th>
        </tr>
      </thead>
      <tbody>
        {keys(mappings).map((scriptName: string) => {
          const testValue = testValues[scriptName]
          const updatedValue = variableUpdates[scriptName]

          return (
            <tr>
              <td>
                {scriptName}
              </td>
              <td>
                {getValue(testValue)}
              </td>
              <td>
                {getValue(updatedValue)}
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

const getValue = value => {
  if (!value) {
    return <Hint inline>---</Hint>
  }

  if (isString(value)) {
    return `"${value}"`
  }

  return JSON.stringify(value.value)
}



// WEBPACK FOOTER //
// ./src/activities/views/activities/scripttask/TestResults.js