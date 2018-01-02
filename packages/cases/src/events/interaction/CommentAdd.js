// @flow
import React from 'react'

import i18n from 'signavio-i18n'

import Event from '@signavio/workflow-events'
import { userUtils } from '@signavio/effektif-api'

import type { CommentAddEventT } from '../../types'

import { CommentContent } from '../../comments/components'

type PropsT = {
  event: CommentAddEventT,

  isLoading: boolean,
  isLoaded: boolean,

  replies: Array<CommentAddEventT>,

  onToggle: (event: Event) => void,
  onReply: (reply: string) => void,
}

export default function CommentAddEvent({ event, ...rest }: PropsT) {
  const { caseId, id, message, childrenIds = [], actor } = event

  return (
    <Event
      {...rest}
      expanded
      important
      event={event}
      title={i18n('__user__ left a comment', {
        user: userUtils.name(actor),
      })}
    >
      <CommentContent
        caseId={caseId}
        comment={{
          id,
          message,
          childrenIds,
        }}
      />
    </Event>
  )
}



// WEBPACK FOOTER //
// ./packages/cases/src/events/interaction/CommentAdd.js