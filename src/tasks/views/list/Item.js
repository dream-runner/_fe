// @flow
import React from 'react'
import { compose, withHandlers, withState } from 'recompose'

import i18n from 'signavio-i18n'

import Router from 'singleton/Router'

import { defaultStyle } from '@signavio/effektif-commons/lib/styles'
import {
  List,
  omitProps,
  Empty,
} from '@signavio/effektif-commons/lib/components'
import { TextTile } from '@signavio/effektif-commons/lib/components/tiles'

import { withUser } from '../../../../packages/api'

import type { UserT } from '@signavio/effektif-api'

import { canUserChangeAssignment, isTaskExecutable } from '../../utils'

import InlineDueDate from './InlineDueDate'
import InlineAssignment from './InlineAssignment'
import StatusIcon from '../../../../packages/cases/lib/task/components/StatusIcon'

type PropsT = {
  model: any,

  user: UserT,

  readOnly?: boolean,
  changing?: boolean,
  showDueDate?: boolean,

  onComplete: () => void,
  onReopen: () => void,
}

function Task(props: PropsT) {
  const {
    showDueDate,
    model,
    readOnly,
    changing,
    onComplete,
    onReopen,
    user,
    ...rest
  } = props

  const caze = model.get('case').toJSON()

  const task = model.toJSON()

  const taskName = task.name ? task.name : <Empty>{i18n('Unnamed task')}</Empty>

  const allowQuickComplete =
    model.isCompletable() && model.canCompleteTask(user) && !task.hasForm

  return (
    <TextTile
      {...rest}
      header={
        <List className="list" direction="horizontal">
          <StatusIcon
            style={props.style('status')}
            changing={changing}
            task={task}
            locked={!model.canCompleteTask(user)}
            readOnly={readOnly || !allowQuickComplete || caze.closed}
            onClick={() => (task.completed ? onReopen() : onComplete())}
          />

          <InlineAssignment
            style={props.style('assignment')}
            readOnly={readOnly || !canUserChangeAssignment(model, user)}
            disabled={!isTaskExecutable(model)}
            task={task}
            model={model}
          />
        </List>
      }
      toolbar={showDueDate && <InlineDueDate task={task} />}
    >
      {readOnly ? (
        taskName
      ) : (
        <a
          {...props.style('name')}
          href={Router.reverse('case', { id: task.caseId, tid: task.id })}
          title={task.name || i18n('Unnamed task')}
        >
          {taskName}
        </a>
      )}
    </TextTile>
  )
}

export default compose(
  withState('changing', 'setChanging', false),
  withHandlers({
    onComplete: ({ model, setChanging, onComplete }) => () => {
      setChanging(true)

      model.complete(() => {
        if (onComplete) {
          onComplete(model)
        }

        setChanging(false)
      })
    },
    onReopen: ({ model, setChanging, onReopen }) => () => {
      setChanging(true)

      model.reopen(() => {
        if (onReopen) {
          onReopen()
        }

        setChanging(false)
      })
    },
  }),
  omitProps(['setChanging']),
  defaultStyle(
    theme => ({
      '&completed': {
        name: {
          color: theme.color.mono.middle,
        },
      },
    }),
    ({ model }: PropsT) => ({
      '&completed': model.get('completed'),
    })
  ),
  withUser
)(Task)



// WEBPACK FOOTER //
// ./src/tasks/views/list/Item.js