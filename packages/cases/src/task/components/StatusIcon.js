import React from 'react'
import { compose, withHandlers, withState, lifecycle } from 'recompose'
import {
  Icon,
  Spinner,
  Popover,
  omitProps,
} from '@signavio/effektif-commons/lib/components'

import {
  defaultStyle,
  utils,
  variables,
} from '@signavio/effektif-commons/lib/styles'

import { getHintMessage } from '../utils'

function StatusIcon({ task, hover, readOnly, locked, changing, ...rest }) {
  if (changing) {
    return <Spinner />
  }

  const icon = <Icon {...rest} icon={getIcon(task, locked, hover, readOnly)} />
  return locked || task.completed ? (
    <Popover
      popover={<div>{getHintMessage(task, locked)}</div>}
      placement="right"
    >
      {icon}
    </Popover>
  ) : (
    icon
  )
}

const getIcon = (task, locked, hover, readOnly) => {
  const { canceled, completed, form, hasForm } = task

  if (canceled) {
    return 'cancel'
  }

  if (completed) {
    return 'square-check'
  }

  if (locked) {
    return 'locked'
  }

  if (form || hasForm) {
    return 'lines'
  }

  if (hover && !readOnly) {
    return 'square-check'
  }

  return 'square'
}

export default compose(
  withState('hover', 'toggleHover', false),
  withHandlers({
    onMouseOver: ({ toggleHover }) => () => toggleHover(true),
    onMouseOut: ({ toggleHover }) => () => toggleHover(false),
    onClick: ({ task, locked, readOnly, onClick }) => () => {
      const canClick = !(readOnly || locked || task.form || task.hasForm)
      if (canClick) {
        onClick()
      }
    },
  }),
  lifecycle({
    componentWillReceiveProps(nextProps) {
      const { changing, toggleHover } = this.props
      if (changing && !nextProps.changing) {
        toggleHover(false)
      }
    },
  }),
  defaultStyle(
    ({ color }) => ({
      backgroundColor: color.primary.lighter,
      color: utils.color(color.primary.lighter),

      cursor: 'pointer',

      '&readOnly': {
        cursor: null,
      },

      '&completed': {
        backgroundColor: color.mono.light,
        color: utils.color(color.mono.light),
      },

      '&changing': {
        position: 'relative',

        backgroundColor: null,

        width: variables.lineHeight.block,
        height: variables.lineHeight.block,
      },
    }),
    ({ readOnly, changing, task }) => ({
      '&readOnly': readOnly,
      '&changing': changing,
      '&completed': task.completed,
    })
  ),
  omitProps(['toggleHover'])
)(StatusIcon)



// WEBPACK FOOTER //
// ./packages/cases/src/task/components/StatusIcon.js