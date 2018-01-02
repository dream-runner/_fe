// @flow
import React from 'react'
import { find, get, has, matchesProperty } from 'lodash'
import { compose, withHandlers, withProps } from 'recompose'
import i18n from 'signavio-i18n'

import { List } from '@signavio/effektif-commons/lib/components'
import { Hint } from '@signavio/effektif-commons/lib/components/hints'
import { withLabel } from '@signavio/effektif-commons/lib/components/forms'
import { defaultStyle } from '@signavio/effektif-commons/lib/styles'

import type { BindingT } from '../../../../../packages/fields'
import {
  LabeledField,
  getFieldsContext,
  choiceType,
} from '../../../../../packages/fields'
import { VariableUtils } from '../../../../processes/utils'

import type { MIVariableT } from './MIVariable'
import { ConfigurationBody } from '../components'
import MIVariableSelect from './MIVariableSelect'

const LabeledMIVariableSelect = withLabel(MIVariableSelect)

type MultiInstanceT = {
  values: Array<BindingT>,
  variableId?: string,
}

type VariableT = {
  id: string,
  name: string,
  type: {
    name: string,
  },
}

type TaskT = {
  multiInstance?: MultiInstanceT,
  variables: Array<VariableT>,
}

type PropsT = {
  task: TaskT,
  onChange: (newTask: TaskT) => void,
  readOnly: boolean,
}

const options = () => [
  {
    id: 'parallel',
    name: i18n('Parallel'),
  },
  {
    id: 'sequential',
    name: i18n('Sequential'),
  },
]

const MultiInstance = ({
  task,
  onExecutionChange,
  onValuesChange,
  readOnly,
  style,
}: ApiPropsT) =>
  <ConfigurationBody style={style}>
    <Hint>
      {i18n(
        'A multi user task creates a task for each user in the list you select below. ' +
          'It is completed once all users have completed their respective tasks.'
      )}
    </Hint>

    <List>
      <LabeledMIVariableSelect
        label={i18n('Create this task for each user in')}
        onChange={onValuesChange}
        readOnly={readOnly}
        value={getValues(task)}
      />

      <LabeledField
        readOnly={readOnly}
        type={choiceType(options())}
        onChange={onExecutionChange}
        value={getTaskExecutionType(task)}
        label={i18n('Execution type')}
        description={i18n(
          'Choose **parallel** execution if users shall work on their tasks at the same time.\n\n' +
            "In **sequential** execution only one user works on a task at a time. When the user completes the task, the next user's task will be created."
        )}
      />
    </List>
  </ConfigurationBody>

const getValues = (task: TaskT) => {
  if (!task.multiInstance) {
    return []
  }

  if (has(task, 'multiInstance.values')) {
    return task.multiInstance.values
  }

  return []
}

const getTaskExecutionType = (task: TaskT) => {
  if (!task.multiInstance) {
    return 'parallel'
  }

  return task.multiInstance.sequential ? 'sequential' : 'parallel'
}

type ApiPropsT = PropsT & {
  variableId: string,

  onExecutionChange: (executionType: string) => void,
  onValuesChange: (values: Array<MIVariableT>) => void,
}

export default compose(
  getFieldsContext,
  withProps(({ task }: ApiPropsT) => ({
    variableId: get(
      task,
      'multiInstance.variableId',
      VariableUtils.provideId()
    ),
  })),
  withHandlers({
    onExecutionChange: ({ onChange, task }: PropsT) => (
      executionType: string
    ) => {
      onChange({
        ...task,
        multiInstance: {
          ...task.multiInstance,
          sequential: executionType === 'sequential',
        },
      })
    },
    onValuesChange: ({ onChange, task, variableId }: PropsT) => (
      values: Array<MIVariableT>
    ) => {
      let assignmentVariable = find(
        task.variables,
        matchesProperty('id', variableId)
      )
      let variables = task.variables

      if (!assignmentVariable) {
        assignmentVariable = {
          id: variableId,
          name: i18n('Assignee'),
          type: {
            name: 'userId',
          },
        }

        variables = [...(variables || []), assignmentVariable]
      }

      onChange({
        ...task,
        assigneeId: {
          expression: assignmentVariable.id,
        },
        multiInstance: {
          ...task.multiInstance,
          variableId,
          values,
        },
        variables,
      })
    },
  }),
  defaultStyle({
    minHeight: 200,
  })
)(MultiInstance)



// WEBPACK FOOTER //
// ./src/activities/views/activities/multiInstance/General.js