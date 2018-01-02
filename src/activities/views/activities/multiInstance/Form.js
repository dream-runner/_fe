// @flow
import React from 'react'
import { compose, withHandlers } from 'recompose'
import { isEmpty, get } from 'lodash'

import { Feature } from '@signavio/effektif-commons/lib/components'
import type { VariableT } from '@signavio/effektif-api'

import {
  dataTypeUtils,
  getFieldsContext,
  ProvideFieldsContext,
} from '../../../../../packages/fields'

import FormEditor from '../../../../../packages/workflows-app/src/actions/multiInstance/FormEditor'
import Description from '../../Description'

type InnerPropsT = {
  onBlur: () => void,
  onChange: (activityProp: any) => void,
  onCreateVariable: (type: VariableT) => VariableT,
  onDescriptionChange: (value: string) => void,
  onUpdateGlobalVariable: (id: string, value: any) => void,
}

type PropsT = {
  activity: any,
  readOnly: boolean,
  variableCollection: Array<any>,
} & InnerPropsT

function Form({
  activity,
  dataTypeDescriptors,
  readOnly,
  variables,
  onBlur,
  onChange,
  onCreateVariable,
  onDescriptionChange,
  onUpdateGlobalVariable,
}: PropsT) {
  const contextVariables = [...variables, ...(activity.get('variables') || [])]
  const fieldDefintions = get(activity.get('form'), 'fields', [])

  return (
    <ProvideFieldsContext variables={variables}>
      <div className="user-task-form">
        <div className="row">
          <div className="col-sm-8">
            <Description
              readOnly={readOnly}
              value={activity.get('description')}
              onChange={onDescriptionChange}
              onBlur={onBlur}
            />
          </div>
        </div>

        <Feature sneakPeek feature="Component.Forms">
          <FormEditor
            hasFieldReuse
            dataTypeDescriptors={dataTypeDescriptors}
            variables={contextVariables}
            fieldDefinitions={fieldDefintions}
            localVariables={activity.get('variables') || []}
            assignmentVariableId={get(
              activity.get('multiInstance'),
              'variableId'
            )}
            onChange={onChange}
            onCreateVariable={onCreateVariable}
            onUpdateGlobalVariable={onUpdateGlobalVariable}
            readOnly={readOnly}
          />
        </Feature>
      </div>
    </ProvideFieldsContext>
  )
}

export default compose(
  getFieldsContext,
  withHandlers({
    onBlur: ({ activity, readOnly }: PropsT) => () =>
      !readOnly && activity.save(),
    onChange: ({ activity }: PropsT) => ({ fieldDefinitions, variables }) => {
      activity.set({
        form: {
          fields: fieldDefinitions,
        },
        variables,
      })
      activity.save()
    },
    onCreateVariable: ({ variableCollection }: PropsT) => (
      variable: VariableT
    ) => {
      variableCollection.add(variable)
    },
    onDescriptionChange: ({ activity }: PropsT) => (value: string) =>
      activity.set('description', value),
    onUpdateGlobalVariable: ({ variableCollection }: PropsT) => (
      variable: VariableT
    ) => {
      const globalVariable = variableCollection.find(
        ({ id }) => variable.id === id
      )

      if (!globalVariable) {
        return
      }

      globalVariable.set(variable)
      globalVariable.save()
    },
  })
)(Form)



// WEBPACK FOOTER //
// ./src/activities/views/activities/multiInstance/Form.js