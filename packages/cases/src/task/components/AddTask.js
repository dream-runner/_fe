// @flow
import React from 'react'
import { compose, withState, withHandlers, withProps } from 'recompose'
import {
  InputWithButton,
  Disable,
} from '@signavio/effektif-commons/lib/components'
import { Tile } from '@signavio/effektif-commons/lib/components/tiles'
import type { TaskT } from '../../types'
import InlineAssignment from './InlineAssignment'

type PropsT = {
  disabledHint: string,
  placeholder: string,
  buttonLabel: string,
  task: TaskT,
  disabled: boolean,
  onChangeAssignment: () => void,
  onSubmit: (name: string) => void,
}

const AddTask = ({
  disabledHint,
  placeholder,
  buttonLabel,
  task,
  disabled,
  onChangeAssignment,
  onSubmit,
}: PropsT) => {
  return (
    <Disable disabled={disabled} hint={disabledHint}>
      <Tile
        header={<InlineAssignment onChange={onChangeAssignment} task={task} />}
      >
        <InputWithButton
          clearOnSubmit
          border="none"
          onSubmit={onSubmit}
          placeholder={placeholder}
          buttonLabel={buttonLabel}
        />
      </Tile>
    </Disable>
  )
}

export default compose(
  withState('currentAssignee', 'setCurrentAssignee', null),
  withHandlers({
    onSubmit: ({ currentAssignee, setCurrentAssignee, onAdd }) => name => {
      onAdd({
        name,
        ...currentAssignee,
      })

      setCurrentAssignee(null)
    },
    onChangeAssignment: ({ setCurrentAssignee }) => assignee =>
      setCurrentAssignee(assignee),
  }),
  withProps(({ currentAssignee, task }) => ({
    task: {
      ...task,
      candidates: { count: 0 },
      ...currentAssignee,
    },
  }))
)(AddTask)



// WEBPACK FOOTER //
// ./packages/cases/src/task/components/AddTask.js