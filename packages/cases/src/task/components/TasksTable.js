// @flow
import React from 'react'
import i18n from 'signavio-i18n'
import { map, isEmpty } from 'lodash'

import { defaultStyle, utils } from '@signavio/effektif-commons/lib/styles'
import { TextTile } from '@signavio/effektif-commons/lib/components/tiles'
import { Hint } from '@signavio/effektif-commons/lib/components/hints'

import TaskRow from './TaskRow'

type PropsT = {
  readOnly: boolean,
  taskIds: ?Array<string>,

  onStatusChange: () => void,
}

function TasksTable({ readOnly, style, taskIds, onStatusChange }: PropsT) {
  return (
    <table {...style}>
      <thead>
        <tr>
          <th {...style('firstColumn')}>
            <TextTile transparent>{i18n('Task')}</TextTile>
          </th>
          <th {...style('columns')}>
            <TextTile transparent>{i18n('Created')}</TextTile>
          </th>
          <th {...style('columns')}>
            <TextTile transparent>{i18n('Due date')}</TextTile>
          </th>
          <th {...style('columns')}>
            <TextTile transparent>{i18n('Completed')}</TextTile>
          </th>
        </tr>
      </thead>
      <tbody>
        {isEmpty(taskIds) && (
          <tr>
            <td colSpan="4" {...style('empty')}>
              <Hint>{i18n('No tasks have been created yet.')}</Hint>
            </td>
          </tr>
        )}

        {map(taskIds, (taskId: string) => (
          <TaskRow
            key={taskId}
            taskId={taskId}
            readOnly={readOnly}
            onStatusChange={onStatusChange}
          />
        ))}
      </tbody>
    </table>
  )
}
const styled = defaultStyle(({ color }) => ({
  width: '100%',

  empty: {
    ...utils.borderLeft(1, 'solid', color.mono.light),
    ...utils.borderRight(1, 'solid', color.mono.light),
  },

  firstColumn: {
    width: '55%',
    ...utils.borderLeft(1, 'solid', color.mono.light),
    ...utils.borderTop(1, 'solid', color.mono.light),
    ...utils.borderRight(1, 'solid', color.mono.light),
    ...utils.borderBottom(2, 'solid', color.mono.light),

    ...utils.media.xs({
      width: '100%',
    }),
  },
  columns: {
    width: '15%',
    ...utils.borderLeft(1, 'solid', color.mono.light),
    ...utils.borderTop(1, 'solid', color.mono.light),
    ...utils.borderRight(1, 'solid', color.mono.light),
    ...utils.borderBottom(2, 'solid', color.mono.light),

    ...utils.media.xs({
      display: 'none',
    }),
  },
}))

export default styled(TasksTable)



// WEBPACK FOOTER //
// ./packages/cases/src/task/components/TasksTable.js