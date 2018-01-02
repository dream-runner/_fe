// @flow
import React from 'react'
import { compose } from 'recompose'
import { filter } from 'lodash'
import i18n from 'signavio-i18n'

import { ContextHelp } from '@signavio/effektif-commons/lib/components'
import { Hint } from '@signavio/effektif-commons/lib/components/hints'
import { defaultStyle } from '@signavio/effektif-commons/lib/styles'

import {
  expressionUtils,
  getFieldsContext,
  ProvideFieldsContext,
} from '../../../../../packages/fields'
import { ConfigurationBody } from '../components'
import ResultRow from './ResultRow'

import type { VariableT } from '@signavio/effektif-api'
import type { FieldsContextT } from '../../../../../packages/fields'

type PropsT = {
  globalVariables: Array<VariableT>,
  localVariables: Array<VariableT>,
  onChange: (globalVariableId: string, newValue: string) => void,
  readOnly: boolean,
} & FieldsContextT

const Results = ({
  dataTypeDescriptors,
  localVariables,
  globalVariables,
  onChange,
  readOnly,
  style,
  variables,
}: PropsT) => {
  const contextVariables = [...variables, ...localVariables]
  const variablesToRename = filter(
    localVariables,
    localVariable => localVariable.targetCollectionId && !localVariable.reuse
  )

  return (
    <ProvideFieldsContext variables={contextVariables}>
      <ConfigurationBody style={style}>
        <Hint>
          {i18n(
            'A multi-user task distributes work to different people. ' +
              'The information entered by each person will be collected and put into result lists–-one per form field. ' +
              'Name these result lists so that you can more easily find and access them later.'
          )}
        </Hint>
        {variablesToRename.length > 0
          ? <table {...style('table')} className="table">
              <thead>
                <tr>
                  <th>
                    {i18n('Form field')}
                    <ContextHelp>
                      {i18n(
                        'Name of the field displayed to each user working on this task.'
                      )}
                    </ContextHelp>
                  </th>
                  <th>
                    {i18n('Result list name')}
                    <ContextHelp>
                      {i18n(
                        'Name of the field that collects all individual results.'
                      )}
                    </ContextHelp>
                  </th>
                </tr>
              </thead>
              <tbody>
                {variablesToRename.map((localVariable: VariableT) =>
                  <ResultRow
                    key={localVariable.id}
                    localVariable={{
                      ...localVariable,
                      hasDefaultLabel: !localVariable.name,
                      name:
                        localVariable.name ||
                          expressionUtils.resolveName(
                            dataTypeDescriptors,
                            contextVariables,
                            localVariable.id
                          ),
                    }}
                    globalVariable={globalVariables.find(
                      (globalVariable: VariableT) =>
                        globalVariable.id === localVariable.targetCollectionId
                    )}
                    onComplete={onChange}
                    readOnly={readOnly}
                  />
                )}
              </tbody>
            </table>
          : <Hint>
              {i18n('You have not created fields so far')}
            </Hint>}
      </ConfigurationBody>
    </ProvideFieldsContext>
  )
}

export default compose(
  getFieldsContext,
  defaultStyle({
    table: {
      marginBottom: 0,
    },
  })
)(Results)



// WEBPACK FOOTER //
// ./src/activities/views/activities/multiInstance/Results.js