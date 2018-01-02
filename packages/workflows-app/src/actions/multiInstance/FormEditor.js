// @flow
import React from 'react'
import { compose, defaultProps, setDisplayName, withHandlers } from 'recompose'
import { isFunction, without, find, findIndex, includes, isEmpty } from 'lodash'
import i18n from 'signavio-i18n'

import { omitProps } from '@signavio/effektif-commons/lib/components'
import { listUtils, VariableUtils } from '@signavio/effektif-commons/lib/utils'
import type { VariableT } from '@signavio/effektif-api'
import type {
  FieldsContextT,
  FieldDefinitionT,
  FieldTypeT,
  ExpressionBindingT,
} from '@signavio/effektif-fields'
import type { FormT } from '@signavio/workflow-forms'

import {
  convertToElementType,
  convertToListType,
  dataTypeUtils,
  expressionUtils,
} from '@signavio/effektif-fields'
import { FormEditor, formUtils } from '@signavio/workflow-forms'

type InnerPropsT = {
  onConfigurationChange: (
    fieldDefinitionId: string,
    configKey: string,
    value: any
  ) => void,
  onCreate: (type: VariableT) => void,
  onRemove: (form: FormT, variables: Array<VariableT>) => void,
  onReuse: (fieldDefinition: FieldDefinitionT) => void,
  onSort: (orderedFields: Array<FieldTypeT>) => void,
  onToggleList: (variables: Array<VariableT>) => void,
}

type PropsT = {
  localVariables: Array<VariableT>,
  onChange: (activityProp: any) => void,
  onCreateVariable: (type: VariableT) => VariableT,
  onUpdateGlobalVariable: (
    id: string,
    variableProp: string,
    value: any
  ) => void,
  readOnly: boolean,
  reuseNestedFields: boolean,
  hasFieldReuse: boolean,
} & FieldsContextT &
  InnerPropsT

const isLinkedToOutputCollection = (
  bindable: ExpressionBindingT,
  localVariables: Array<VariableT>
) =>
  find(
    localVariables,
    (variable: VariableT) => variable.targetCollectionId === bindable.expression
  )

const allowedGlobalConfigs = [
  'name',
  'description',
  'defaultValue',
  'customRules',
]
const allowedAssignmentConfigs = ['name', 'description']

const transformConfiguration = (allowedConfigurations, configuration) => {
  if (includes(allowedConfigurations, configuration.key)) {
    return configuration
  }

  return {
    ...configuration,
    readOnly: true,
  }
}

export default compose(
  setDisplayName('MultiInstanceFormEditor'),
  defaultProps({ reuseNestedFields: true }),
  withHandlers({
    transformConfiguration: ({ localVariables, assignmentVariableId }) => (
      fieldDefinition: FieldDefinitionT,
      configuration
    ) => {
      const localVariable = expressionUtils.getVariable(
        localVariables,
        fieldDefinition.binding.expression
      )

      if (localVariable) {
        if (localVariable.id === assignmentVariableId) {
          return transformConfiguration(allowedAssignmentConfigs, configuration)
        }

        return configuration
      }

      return transformConfiguration(allowedGlobalConfigs, configuration)
    },
    canReuseBindable: ({ localVariables }) => bindable =>
      !isLinkedToOutputCollection(bindable, localVariables),
    canToggleList: ({
      fieldDefinitions,
      localVariables,
      assignmentVariableId,
    }) => (fieldDefinition: FieldDefinitionT) => {
      const localVariable = expressionUtils.getVariable(
        localVariables,
        fieldDefinition.binding.expression
      )

      if (!localVariable) {
        return false
      }

      if (localVariable.id === assignmentVariableId) {
        return false
      }

      return true
    },
    onConfigurationChange: ({
      dataTypeDescriptors,
      fieldDefinitions,
      localVariables,
      variables,
      onChange,
      onUpdateGlobalVariable,
    }: PropsT) => (
      { fieldDefinition, variable },
      configKey: string,
      newValue: any
    ) => {
      const isGlobalVariable = !expressionUtils.getVariable(
        localVariables,
        variable.id
      )

      if (!isGlobalVariable) {
        onChange({
          fieldDefinitions: listUtils.replace(
            fieldDefinitions,
            fieldDefinition,
            listUtils.createFindById(fieldDefinition)
          ),
          variables: listUtils.replace(
            localVariables,
            variable,
            listUtils.createFindById(variable)
          ),
        })

        if (configKey === 'name') {
          const elementTypeDescriptor = dataTypeUtils.getDescriptor(
            dataTypeDescriptors,
            variable.type
          )

          const newName = i18n('List of __variableName__', {
            variableName: newValue || elementTypeDescriptor.name,
          })

          const globalVariable = expressionUtils.getVariable(
            variables,
            variable.targetCollectionId
          )

          if (!isEmpty(globalVariable.name)) {
            return
          }

          onUpdateGlobalVariable({
            ...globalVariable,
            name: newName,
          })
        }

        return
      }

      onChange({
        fieldDefinitions: listUtils.replace(
          fieldDefinitions,
          fieldDefinition,
          listUtils.createFindById(fieldDefinition)
        ),
        variables: localVariables,
      })

      onUpdateGlobalVariable(variable)
    },
    onCreate: ({
      fieldDefinitions,
      localVariables,
      onChange,
      onCreateVariable,
    }: PropsT) => (
      variable: VariableT,
      fieldDefinition: FieldDefinitionT,
      position?: number
    ) => {
      const globalVariable = {
        id: VariableUtils.provideId(),
        name: '',
        type: {
          name: 'list',
          elementType: variable.type,
        },
      }

      onCreateVariable(globalVariable)

      const localVariable = {
        ...variable,
        targetCollectionId: globalVariable.id,
      }

      onChange({
        fieldDefinitions: formUtils.addField(
          fieldDefinitions,
          fieldDefinition,
          position
        ),
        variables: [...localVariables, localVariable],
      })
    },
    onRemove: ({ localVariables, onChange }: PropsT) => (
      fieldDefinitions,
      removedField
    ) => {
      const variable = expressionUtils.getVariable(
        localVariables,
        removedField.binding.expression
      )

      onChange({
        fieldDefinitions,
        variables: without(localVariables, variable),
      })
    },
    onReuse: ({ fieldDefinitions, localVariables, onChange }: PropsT) => (
      fieldDefinition: FieldDefinitionT
    ) => {
      onChange({
        fieldDefinitions: formUtils.addField(fieldDefinitions, {
          ...fieldDefinition,
          readOnly: true,
        }),
        variables: localVariables,
      })
    },
    onSort: ({ localVariables, onChange }: PropsT) => (
      orderedFields: Array<FieldDefinitionT>
    ) =>
      onChange({
        fieldDefinitions: orderedFields,
        variables: localVariables,
      }),
    onToggleList: ({ localVariables, fieldDefinitions, onChange }: PropsT) => (
      variable: VariableT
    ) =>
      onChange({
        fieldDefinitions,
        variables: listUtils.replace(
          localVariables,
          variable,
          listUtils.createFindById(variable)
        ),
      }),
  }),
  omitProps(['onChange', 'onCreateVariable', 'onUpdateGlobalVariable'])
)(props => <FormEditor {...props} />)



// WEBPACK FOOTER //
// ./packages/workflows-app/src/actions/multiInstance/FormEditor.js