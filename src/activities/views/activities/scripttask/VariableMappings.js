// @flow
import { map, includes, filter, find, keys, values } from 'lodash'
import i18n from 'signavio-i18n'
import React from 'react'
import { withHandlers, compose } from 'recompose'

import { Divider } from '@signavio/effektif-commons/lib/components'
import { Hint } from '@signavio/effektif-commons/lib/components/hints'

import {
  getFieldsContext,
  dataTypeUtils,
  expressionUtils,
  Binding,
} from '../../../../../packages/fields'

import { generateScriptName } from './utils'

import Mapping from './VariableMapping'
import VariableAdd from './VariableAdd'

// contains types which cannot be used in scripts
var UNSUPPORTED_TYPES = ['custom']

function VariableMappings({
  variables,
  dataTypeDescriptors,
  mappings,
  testValues,
  readOnly,
  onMappingChange,
  onVariableAdd,
  onMappingAdd,
  onMappingRemove,
  onFilter,
}) {
  const descriptors = filter(
    dataTypeDescriptors,
    descriptor =>
      descriptor.isInPalette && !includes(UNSUPPORTED_TYPES, descriptor.key)
  )

  return (
    <div>
      <Divider title={i18n('Add new variable')} />

      <VariableAdd descriptors={descriptors} onAdd={onVariableAdd} />

      <Divider title={i18n('Add existing variable')} />

      <Binding filterBindables={onFilter} onChange={onMappingAdd} />

      <Divider title={i18n('Variables')} />

      {keys(mappings).length === 0 &&
        <Hint info>
          {i18n('Variables that you activate for this task will show up here.')}
        </Hint>}

      {keys(mappings).length > 0 &&
        <table className="table table-condensed">
          <thead>
            <tr>
              <th style={{ width: '25%' }}>
                {i18n('Variable')}
              </th>
              <th style={{ width: '25%' }}>
                {i18n('JavaScript variable')}
              </th>
              <th style={{ width: '50%' }}>
                {i18n('Test value')}
              </th>
            </tr>
          </thead>
          <tbody>
            {map(mappings, (variableId, scriptName) => {
              const variable = find(variables, { id: variableId })
              const testValue = testValues[scriptName]

              return (
                <Mapping
                  {...variable}
                  key={variableId}
                  icon={dataTypeUtils.getIcon(
                    dataTypeDescriptors,
                    variable.type
                  )}
                  readOnly={readOnly}
                  scriptName={scriptName}
                  value={testValue && testValue.value}
                  onChange={onMappingChange}
                  onRemove={onMappingRemove}
                />
              )
            })}
          </tbody>
        </table>}
    </div>
  )
}

export default compose(
  getFieldsContext,
  withHandlers({
    onMappingChange: ({ onChange, testValues }) => (scriptName, value) => {
      onChange({
        ...testValues,

        [scriptName]: value,
      })
    },
    onVariableAdd: ({ mappings, onMappingAdd }) => variable => {
      const scriptName = generateScriptName(keys(mappings), variable.name)

      onMappingAdd({ [scriptName]: variable.id }, variable)
    },
    onFilter: ({ mappings }) => ({ expression }) =>
      !expressionUtils.isNested(expression) &&
      !includes(values(mappings), expression),
    onMappingAdd: ({ variables, mappings, onMappingAdd }) => ({
      expression,
    }) => {
      const variable = find(variables, { id: expression })
      const scriptName = generateScriptName(keys(mappings), variable.name)

      onMappingAdd({ [scriptName]: expression })
    },
  })
)(VariableMappings)



// WEBPACK FOOTER //
// ./src/activities/views/activities/scripttask/VariableMappings.js