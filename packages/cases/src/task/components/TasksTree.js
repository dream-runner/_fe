// @flow
import React from 'react'
import { isEmpty, map } from 'lodash'

import {
  Collapsible,
  List,
  Icon,
} from '@signavio/effektif-commons/lib/components'
import { Tile } from '@signavio/effektif-commons/lib/components/tiles'
import { defaultStyle } from '@signavio/effektif-commons/lib/styles'

import type { TaskT } from '../../types'

import { isExpanded } from '../utils'

import TaskTile from './TaskTile'

type PropsT = {
  tasks: Array<TaskT>,
  activeTaskId?: string,

  readOnly?: boolean,

  onStatusChange: () => void,
}

const Tree = ({
  activeTaskId,
  readOnly,
  tasks,
  style,
  onStatusChange,
}: PropsT) => (
  <List>
    {map(
      tasks,
      (task: TaskT) =>
        isEmpty(task.subtasks) ? (
          <Leaf
            key={task.id}
            taskId={task.id}
            active={task.id === activeTaskId}
            readOnly={readOnly}
            onStatusChange={onStatusChange}
          />
        ) : (
          <Collapsible
            key={task.id}
            preventToggle
            expanded={isExpanded(task, activeTaskId)}
            header={
              <Leaf
                key={task.id}
                taskId={task.id}
                active={task.id === activeTaskId}
                readOnly={readOnly}
                onStatusChange={onStatusChange}
              />
            }
          >
            <div {...style('subtasks')}>
              <List>
                {task.subtasks.map((subtaskId: string) => (
                  <Leaf
                    key={subtaskId}
                    taskId={subtaskId}
                    active={subtaskId === activeTaskId}
                    readOnly={readOnly}
                    onStatusChange={onStatusChange}
                  />
                ))}
              </List>
            </div>
          </Collapsible>
        )
    )}
  </List>
)

type LeafPropsT = {
  taskId: string,
  readOnly?: boolean,
  active?: boolean,

  onStatusChange: () => void,
}

const Leaf = ({ taskId, readOnly, active, onStatusChange }: LeafPropsT) => (
  <Tile toolbar={active && <Icon iconSet="fontAwesome" icon="angle-right" />}>
    <TaskTile
      onStatusChange={onStatusChange}
      taskId={taskId}
      readOnly={readOnly}
    />
  </Tile>
)

const styled = defaultStyle(({ padding }) => ({
  subtasks: {
    marginLeft: padding.normal,
    marginTop: 1,
  },
}))

export default styled(Tree)



// WEBPACK FOOTER //
// ./packages/cases/src/task/components/TasksTree.js