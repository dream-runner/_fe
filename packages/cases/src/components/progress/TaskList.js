/* @flow */

import React from 'react'
import i18n from 'signavio-i18n'

import { defaultStyle } from '@signavio/effektif-commons/lib/styles'
import { Hint } from '@signavio/effektif-commons/lib/components/hints'

import type { TaskCountT } from '../../types'

type Props = {
  tasks: Array<TaskCountT>,
}

function TaskList({ tasks, ...rest }: Props) {
  return (
    <ul {...rest} {...rest.style}>
      {tasks.map((task, index) => (
        <li key={`${task.name}-${index}`} {...rest.style('item')}>
          {task.name || <Hint inline>{i18n('Unnamed task')}</Hint>}
          {task.count > 1 && ` (${task.count})`}
        </li>
      ))}
    </ul>
  )
}

export default defaultStyle(theme => ({
  marginLeft: theme.padding.xsmall,
  marginRight: theme.padding.xsmall,
  marginTop: theme.padding.xsmall,
  marginBottom: theme.padding.xsmall,

  paddingLeft: theme.padding.normal,
}))(TaskList)



// WEBPACK FOOTER //
// ./packages/cases/src/components/progress/TaskList.js