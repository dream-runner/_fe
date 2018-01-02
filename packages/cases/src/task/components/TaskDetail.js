import React from 'react'
import { compose, withHandlers } from 'recompose'
import i18n from 'signavio-i18n'

import { withUser } from '@signavio/effektif-api'

import { defaultStyle } from '@signavio/effektif-commons/lib/styles'
import type { UserT } from '@signavio/effektif-api'
import type { FieldTypeT } from '@signavio/effektif-fields'
import {
  InplaceEdit,
  Markdown,
} from '@signavio/effektif-commons/lib/components'
import { Form } from '@signavio/workflow-forms'

import type { CaseT, TaskT } from '../../types'

import { isTaskReadOnly, showDoneButton } from '../utils'

type ApiPropsT = {
  caze: CaseT,
  defaultFields: Array<FieldTypeT>,
  fields: Array<FieldTypeT>,
  onChange: (task: TaskT) => void,
  onComplete: () => void,
  pending: boolean,
  readOnly: boolean,
  task: TaskT,
}

type PropsT = {
  onDescriptionComplete: () => void,
  onFieldsChange: (fields: Array<FieldTypeT>) => void,
  setDescription: (description: string) => void,
  user: UserT,
} & ApiPropsT

function TaskDetail({
  defaultFields,
  fields,
  onComplete,
  onDescriptionComplete,
  onFieldsChange,
  pending,
  readOnly,
  style,
  task,
  user,
}: PropsT) {
  return (
    <div>
      <div {...style('description')}>
        <h5 {...style('descriptionTitle')}>{i18n('Description')}</h5>

        {!isTaskReadOnly(task) ? (
          <InplaceEdit
            multiLine
            placeholder={i18n('Add a task description')}
            value={task.description}
            onBlur={onDescriptionComplete}
          >
            {(description: string) => <Markdown>{description}</Markdown>}
          </InplaceEdit>
        ) : (
          <Markdown>{task.description}</Markdown>
        )}
      </div>
      <Form
        defaultFields={defaultFields}
        fields={fields}
        hideDoneButton={!showDoneButton(task, user)}
        onSubmit={onComplete}
        onChange={onFieldsChange}
        pending={pending}
        readOnly={readOnly || task.completed}
        taskId={task.id}
      />
    </div>
  )
}

export default compose(
  withUser,
  withHandlers({
    onDescriptionComplete: ({ onChange, task }: PropsT) => ({
      target,
    }: SyntheticInputEvent) => {
      onChange({
        ...task,
        description: target.value,
      })
    },
    onFieldsChange: ({ onChange, task }: PropsT) => (
      fields: Array<FieldTypeT>
    ) => {
      onChange({
        ...task,
        form: {
          ...task.form,
          fields,
        },
      })
    },
  }),
  defaultStyle(({ padding, font, color }) => ({
    description: {
      marginBottom: padding.large,
    },

    descriptionTitle: {
      fontFamily: font.family.normal,
      color: color.mono.dark,

      marginBottom: padding.normal,
    },
  }))
)(TaskDetail)



// WEBPACK FOOTER //
// ./packages/cases/src/task/components/TaskDetail.js