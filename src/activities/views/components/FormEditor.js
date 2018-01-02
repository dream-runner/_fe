import React from 'react'
import createReactClass from 'create-react-class'
import { filter } from 'lodash'

import Variable from 'processes/models/Variable'

import { BaseMixin } from '@signavio/effektif-commons/lib/mixins'
import { listUtils } from '@signavio/effektif-commons/lib/utils'

import { expressionUtils } from '../../../../packages/fields'
import { FormEditor } from '../../../../packages/forms'

const getFormFields = model =>
  filter(model.get('fields').toJSON(), field => field.binding)

module.exports = createReactClass({
  displayName: 'FormEditorView',

  mixins: [BaseMixin],

  render() {
    const {
      dataTypeDescriptors,
      model,
      publicForm,
      readOnly,
      variables,
      canReuseField,
    } = this.props
    return (
      <FormEditor
        // EditorFields props
        fieldDefinitions={getFormFields(model)}
        dataTypeDescriptors={dataTypeDescriptors}
        onConfigurationChange={this.handleConfigurationChange}
        onRemove={this.handleRemove}
        onSort={this.handleSort}
        onToggleList={this.handleToggleList}
        readOnly={readOnly}
        // Palette props
        onCreate={this.handleCreate}
        onReuse={this.handleReuse}
        reuseNestedFields
        hasFieldReuse
        variables={variables}
        canToggleList={this.canToggleList}
        canReuseField={canReuseField}
      />
    )
  },

  canToggleList(fieldDefinition) {
    const { variables } = this.props

    const variable = expressionUtils.getVariable(
      variables,
      fieldDefinition.binding.expression
    )

    return new Variable(variable).canToggleList()
  },

  handleConfigurationChange({ fieldDefinition, variable }) {
    const { variables, activity, model } = this.props

    const fieldDefinitions = getFormFields(model)

    activity
      .getProcess()
      .set(
        'variables',
        listUtils.replace(variables, variable, findById(variable))
      )

    model.set(
      'fields',
      listUtils.replace(
        fieldDefinitions,
        fieldDefinition,
        findById(fieldDefinition)
      )
    )

    model.save()
  },

  handleRemove(fieldDefinitions) {
    this.props.model.set('fields', fieldDefinitions)
    this.props.model.save()
  },

  handleSort(orderedFields) {
    this.props.model.set('fields', orderedFields)
    this.props.model.save()
  },

  handleToggleList(variable) {
    const { activity, variables } = this.props

    const workflow = activity.getProcess()

    workflow.set(
      'variables',
      listUtils.replace(variables, variable, findById(variable))
    )
    workflow.save()
  },

  handleReuse(fieldDefinition) {
    this.props.activity
      .get('form')
      .get('fields')
      .add(fieldDefinition)
    this.props.activity.save()
  },

  handleCreate(variable, fieldDefinition, position) {
    const { variables, model, activity } = this.props
    const fieldDefinitions = getFormFields(model)

    const workflow = activity.getProcess()

    workflow.set('variables', [...variables, variable])

    model.set(
      'fields',
      listUtils.insertAtIndex(fieldDefinitions, fieldDefinition, position)
    )

    workflow.save()
  },
})

const findById = item => ({ id }) => id === item.id



// WEBPACK FOOTER //
// ./src/activities/views/components/FormEditor.js