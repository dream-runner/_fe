/* @flow */

import React from 'react'
import i18n from 'signavio-i18n'
import Color from 'color'

import {
  defaultStyle,
  utils,
  variables,
} from '@signavio/effektif-commons/lib/styles'
import { Clearfix } from '@signavio/effektif-commons/lib/components'
import { Hint } from '@signavio/effektif-commons/lib/components/hints'

import type { StatsT, TaskCountT } from '../../types'

import Bar from './Bar'
import TaskList from './TaskList'

type Props = {
  stats: StatsT,
  tasksOpen: Array<TaskCountT>,
  tasksCompleted: Array<TaskCountT>,
  toggleHover: (hoverState: boolean) => void,
}

/**
 * This view visualized the current progress of a case in terms of completed and open actions
 */
function ProgressIndicator({
  stats,
  tasksOpen = [],
  tasksCompleted = [],
  toggleHover,
  ...rest
}: Props) {
  const open = tasksOpen.length
  const completed = tasksCompleted.length
  const scale = Math.max(stats.open, stats.completed)

  return (
    <div {...rest} {...rest.style}>
      <div {...rest.style('indicator')}>
        <Bar
          fromRight
          style={rest.style('completed')}
          title={
            completed > 0
              ? i18n('__count__ completed task', '__count__ completed tasks', {
                  count: completed,
                })
              : undefined
          }
          popover={
            completed === 0 ? (
              <Hint inline>{i18n('No completed tasks')}</Hint>
            ) : (
              <TaskList tasks={tasksCompleted} />
            )
          }
          value={completed}
          scale={scale}
        >
          {completed}
        </Bar>
      </div>

      <div {...rest.style('separator')} />

      <div {...rest.style('indicator')}>
        <Bar
          style={rest.style('open')}
          title={
            open > 0
              ? i18n('__count__ open task', '__count__ open tasks', {
                  count: open,
                })
              : undefined
          }
          popover={
            open === 0 ? (
              <Hint inline>{i18n('No open tasks')}</Hint>
            ) : (
              <TaskList tasks={tasksOpen} />
            )
          }
          value={open}
          scale={scale}
        >
          {open}
        </Bar>
      </div>

      <Clearfix />
    </div>
  )
}

const styled = defaultStyle(theme => ({
  indicator: {
    width: 50,

    float: 'left',

    paddingTop: variables.lineHeight.block / 2 - 3, //3 is half the height of a bar
  },

  separator: {
    float: 'left',

    height: variables.lineHeight.block,
    width: 1,

    backgroundColor: theme.color.mono.lighter,
  },

  completed: {
    bar: {
      ...utils.borderRight(0),
    },

    info: {
      display: 'none',
    },
  },

  open: {
    bar: {
      backgroundColor: Color(theme.color.primary.base)
        .fade(0.3)
        .string(),

      ...utils.border('1px', 'solid', theme.color.primary.base),
      ...utils.borderLeft(0),
    },

    info: {
      display: 'none',
    },
  },
}))

export default styled(ProgressIndicator)



// WEBPACK FOOTER //
// ./packages/cases/src/components/progress/ProgressIndicator.js