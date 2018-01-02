import React from 'react'
import { compose, withHandlers } from 'recompose'
import i18n from 'signavio-i18n'
import { List } from '@signavio/effektif-commons/lib/components'
import {
  BinaryConditions,
  NAryOperatorSelect,
} from '../../../../../packages/conditions'
import { Option } from '@signavio/effektif-commons/lib/components/forms'

const PER_DEFAULT_VALUE = 'PER_DEFAULT_VALUE'
const DEFAULT_CONDITIONS = [{ type: 'equals' }]

const ConditionEditor = ({
  conditions,
  filterBindables,
  isDefault,
  onConditionChange,
  onTypeChange,
  readOnly,
  type,
}) =>
  <List>
    <NAryOperatorSelect
      onChange={onTypeChange}
      type={isDefault ? PER_DEFAULT_VALUE : type}
      readOnly={readOnly}
    >
      <Option
        name={i18n('per default (if no other transition can be taken)')}
        value={PER_DEFAULT_VALUE}
      />
    </NAryOperatorSelect>

    {!isDefault &&
      <BinaryConditions
        conditions={conditions || DEFAULT_CONDITIONS}
        filterBindables={filterBindables}
        onChange={onConditionChange}
        readOnly={readOnly}
      />}
  </List>

export default compose(
  withHandlers({
    onConditionChange: ({ onChange, type }) => newConditions => {
      onChange({ type, conditions: newConditions })
    },
    onTypeChange: ({
      conditions,
      isDefault,
      onChange,
      onSetDefault,
      onUnsetDefault,
    }) => newType => {
      if (newType === PER_DEFAULT_VALUE) {
        onSetDefault()
      } else {
        if (isDefault) onUnsetDefault()
        onChange({ type: newType, conditions })
      }
    },
  })
)(ConditionEditor)



// WEBPACK FOOTER //
// ./src/activities/views/activities/exclusiveGateway/ConditionEditor.js