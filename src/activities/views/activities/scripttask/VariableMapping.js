// @flow
import React from 'react'
import { includes } from 'lodash'
import { withHandlers, compose } from 'recompose'

import i18n from 'signavio-i18n'

import { defaultStyle } from '@signavio/effektif-commons/lib/styles'
import { Icon, Remove } from '@signavio/effektif-commons/lib/components'
import { TextTile } from '@signavio/effektif-commons/lib/components/tiles'
import { Hint } from '@signavio/effektif-commons/lib/components/hints'
import { RemoveButton } from '@signavio/effektif-commons/lib/components/buttons'

import { Field } from '../../../../../packages/fields'

import { removable } from './higher-order'

const RemovableField = removable(Field)
const RemovableTile = removable(TextTile)

// contains types for which no test values can be defined
const READ_ONLY_TYPES = ['emailId', 'caseId']

function VariableMapping({
  name,
  type,
  value,
  scriptName,
  icon,
  readOnly,
  style,
  onComplete,
  onRemove,
}) {
  const cannotEdit = includes(READ_ONLY_TYPES, type.name)

  return (
    <tr>
      <td {...style('cell')} key={1}>
        <TextTile icon={icon}>
          {name}
        </TextTile>
      </td>

      <td {...style('cell')} key={2}>
        <TextTile>
          {scriptName}
        </TextTile>
      </td>

      <td {...style('cell')} key={3}>
        {cannotEdit
          ? <RemovableTile onRemove={onRemove}>
              <Hint inline>
                {i18n('Test values for this type are not supported.')}
              </Hint>
            </RemovableTile>
          : <RemovableField
              readOnly={readOnly}
              type={type}
              value={value}
              onComplete={onComplete}
              onRemove={onRemove}
            />}
      </td>
    </tr>
  )
}

export default compose(
  withHandlers({
    onComplete: ({ onChange, type, id, scriptName }) => value =>
      onChange(scriptName, {
        type,
        id,
        value,
      }),
    onRemove: ({ scriptName, onRemove }) => () => onRemove(scriptName),
  }),
  defaultStyle({
    cell: {
      padding: 0,
    },
  })
)(VariableMapping)



// WEBPACK FOOTER //
// ./src/activities/views/activities/scripttask/VariableMapping.js