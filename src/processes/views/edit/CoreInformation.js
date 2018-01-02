import React from 'react'
import { compose, withHandlers } from 'recompose'
import { omitProps } from '@signavio/effektif-commons/lib/components'
import { listUtils } from '@signavio/effektif-commons/lib/utils'
import { defaultStyle } from '@signavio/effektif-commons/lib/styles'
import { expressionUtils, getFieldsContext } from '../../../../packages/fields'
import { FormEditor, formUtils } from '../../../../packages/forms'
import type { FieldTypeT } from '../../../../packages/fields'
import type { FieldDefinitionT, FormT } from '../../../../packages/forms'

import { VariableUtils } from '../../utils'

import { Variable } from '../../models'

import type { VariableT } from '@signavio/effektif-api'

export default compose(
  getFieldsContext,
  withHandlers({
    canToggleList: ({ variables }) => (fieldDefinition: FieldDefinitionT) => {
      const variable = expressionUtils.getVariable(
        variables,
        fieldDefinition.binding.expression
      )

      return new Variable(variable).canToggleList()
    },
    onConfigurationChange: ({ fieldDefinitions, variables, onChange }) => ({
      fieldDefinition,
      variable,
    }) =>
      onChange({
        fieldDefinitions: listUtils.replace(
          fieldDefinitions,
          fieldDefinition,
          listUtils.createFindById(fieldDefinition)
        ),
        variables: listUtils.replace(
          variables,
          variable,
          listUtils.createFindById(variable)
        ),
      }),
    onCreate: ({ fieldDefinitions, onChange, variables }) => (
      variable: VariableT,
      fieldDefinition: FieldDefinitionT,
      position: number
    ) =>
      onChange({
        fieldDefinitions: formUtils.addField(
          fieldDefinitions,
          fieldDefinition,
          position
        ),
        variables: [...variables, variable],
      }),
    onRemove: ({ variables, onChange }) => (
      fieldDefinitions: Array<FieldDefinitionT>,
      removedFieldDefinition: FieldDefinitionT
    ) =>
      onChange({
        fieldDefinitions,
        variables,
        removedFieldDefinition,
      }),
    onReuse: ({ fieldDefinitions, variables, onChange }: PropsT) => (
      fieldDefinition: FieldDefinitionT
    ) =>
      onChange({
        fieldDefinitions: formUtils.addField(fieldDefinitions, fieldDefinition),
        variables,
      }),
    onSort: ({ variables, onChange }) => (
      orderedFields: Array<FieldDefinitionT>
    ) =>
      onChange({
        fieldDefinitions: orderedFields,
        variables,
      }),
    onToggleList: ({ fieldDefinitions, variables, onChange }: PropsT) => (
      variable: VariableT
    ) =>
      onChange({
        fieldDefinitions,
        variables: listUtils.replace(
          variables,
          variable,
          listUtils.createFindById(variable)
        ),
      }),
  }),
  omitProps(['onChange']),
  defaultStyle(({ color, padding }) => ({
    backgroundColor: color.mono.ultralight,
    paddingBottom: padding.small,
    paddingLeft: padding.small,
    paddingRight: padding.small,
    paddingTop: padding.small,
  }))
)(FormEditor)



// WEBPACK FOOTER //
// ./src/processes/views/edit/CoreInformation.js