// @flow
import React from 'react'
import i18n from 'signavio-i18n'
import { map } from 'lodash'
import { List } from '@signavio/effektif-commons/lib/components'
import { defaultStyle } from '@signavio/effektif-commons/lib/styles'
import AddTask from './AddTask'
import TaskTile from './TaskTile'

import type { TaskT } from '../../types'

type PropsT = {
  task: TaskT,
  onChange: (changes: Object) => void,
  onAdd: () => void,
}

const SubTasks = ({ task, style, onAdd }: PropsT) => (
  <div {...style}>
    <h4 {...style('title')}>{i18n('Subtasks')}</h4>

    <List>
      {map(task.subtasks, (subtaskId: string) => (
        <TaskTile key={subtaskId} taskId={subtaskId} />
      ))}
    </List>

    <AddTask
      onAdd={onAdd}
      disabled={!!task.completed}
      disabledHint={i18n(
        'This task is completed, so you cannot add any subtasks to it.'
      )}
      placeholder={i18n('Add a new subtask')}
      buttonLabel={i18n('Add subtask')}
    />
  </div>
)

const styled = defaultStyle(({ padding }) => ({
  title: {
    marginBottom: padding.normal,
  },
}))

export default styled(SubTasks)



// WEBPACK FOOTER //
// ./packages/cases/src/task/components/Subtasks.js