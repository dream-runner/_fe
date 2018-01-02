// @flow
import React from 'react'
import { isEqual } from 'lodash'
import { withState, withHandlers, lifecycle, compose } from 'recompose'

import i18n from 'signavio-i18n'

import { Divider, omitProps } from '@signavio/effektif-commons/lib/components'
import { Hint } from '@signavio/effektif-commons/lib/components/hints'
import { defaultStyle } from '@signavio/effektif-commons/lib/styles'

import { connect, types, withUser } from '@signavio/effektif-api'

import type { EventT } from '@signavio/workflow-events'

import type { UserT } from '@signavio/effektif-api'

import { PendingComment, CommentAdd } from '../comments/components'

import { withPeriodicAction } from '../components'
import { Filters } from './components'
import type { FilterT } from './components'

import Events from './Events'

type PropsT = {
  filter: FilterT,

  taskId?: string,

  pendingEvent: ?EventT,

  onFilter: (filter: FilterT) => void,
  onComment: (message: string) => void,
  onFileAdd: (file: File) => void,
}

function Stream(props: PropsT) {
  const {
    filter,
    fetchEvents,
    addEvent,
    taskId,
    pendingEvent,
    style,
    onFileAdd,
    onFilter,
    onComment,
    participants,
  } = props

  return (
    <div>
      <CommentAdd
        onFileAdd={onFileAdd}
        onComment={onComment}
        participants={participants}
      />

      <Divider padding="normal" />

      <Filters taskId={taskId} filter={filter} onFilter={onFilter} />

      {addEvent.pending &&
        pendingEvent && (
          <PendingComment
            style={style('pendingEvent')}
            comment={pendingEvent}
          />
        )}

      {fetchEvents.pending && !fetchEvents.value ? (
        <Hint loading>{i18n('Loading events...')}</Hint>
      ) : (
        <Events style={style('events')} events={fetchEvents.value} />
      )}
    </div>
  )
}

type ApiPropsT = PropsT & {
  user: UserT,

  caseId: string,

  onEvent: () => void,
  setFilter: (filter: FilterT) => void,
}

export default compose(
  withUser,
  withState('filter', 'setFilter', ({ taskId }) => taskId && { taskId }),
  connect(({ caseId, filter }: ApiPropsT) => ({
    fetchEvents: {
      type: types.CASE_EVENTS,
      query: {
        caseId,
        filter,
      },
    },
    addEvent: {
      type: types.CASE_EVENT,
      method: 'create',
    },
  })),
  withState('pendingEvent', 'setPendingEvent', null),
  withHandlers({
    onFileAdd: ({ user, caseId, addEvent, setPendingEvent }: ApiPropsT) => (
      file: File
    ) => {
      const fileAddEvent = {
        type: 'fileAdd',
        fileId: file.id,
        userId: user.id,
        caseId,
      }

      addEvent(fileAddEvent)
      setPendingEvent(fileAddEvent)
    },
    onComment: ({
      addEvent,
      user,
      caseId,
      taskId,
      setPendingEvent,
    }: ApiPropsT) => (message: string) => {
      const commentAddEvent = {
        actor: user,
        type: 'commentAdd',
        userId: user.id,
        message,
        caseId,
        taskId,
      }

      addEvent(commentAddEvent)
      setPendingEvent(commentAddEvent)
    },
    onFilter: ({ setFilter }: ApiPropsT) => (filter: FilterT) =>
      setFilter(filter),
  }),
  withPeriodicAction(({ fetchEvents }) => fetchEvents()),
  lifecycle({
    componentDidUpdate({
      filter: prevFilter,
      addEvent: prevEvent,
      onRestartAction,
    }: ApiPropsT) {
      const { filter, fetchEvents, addEvent } = this.props

      const commentAdded = prevEvent.pending && !addEvent.pending

      if (isEqual(filter, prevFilter) && !commentAdded) {
        return
      }

      onRestartAction()

      fetchEvents()
    },
  }),
  defaultStyle(
    ({ padding }) => ({
      events: {
        marginTop: padding.large,
      },

      pendingEvent: {
        marginTop: padding.large,
      },

      '&eventPending': {
        events: {
          marginTop: null,
        },
      },
    }),
    ({ addEvent }) => ({
      eventPending: addEvent.pending,
    })
  ),
  omitProps(['onEvent', 'user', 'caseId'])
)(Stream)



// WEBPACK FOOTER //
// ./packages/cases/src/events/Stream.js