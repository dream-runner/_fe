// @flow
import React from 'react'
import i18n from 'signavio-i18n'
import { compose, withHandlers, lifecycle, withProps } from 'recompose'

import { connect, types, withUser } from '@signavio/effektif-api'

import { defaultStyle } from '@signavio/effektif-commons/lib/styles'
import { omitProps } from '@signavio/effektif-commons/lib/components'
import { Hint } from '@signavio/effektif-commons/lib/components/hints'

import type { CommentT } from '../types'

import Conversation from './Conversation'
import Toggle from './Toggle'

type PropsT = {
  comment: CommentT,

  isLoaded: boolean,
  isLoading: boolean,

  replies: Array<CommentT>,

  onToggle: () => void,
  onReply: (message: string) => void,
}

function Replies({
  comment,
  isLoaded,
  isLoading,
  replies,
  addReply,
  style,
  onToggle,
  onReply,
}: PropsT) {
  const { childrenIds } = comment

  return (
    <div>
      {isLoading &&
        <Hint loading small>
          {i18n('Loading replies...')}
        </Hint>}

      {!isLoading && !isLoaded
        ? <Toggle replies={(childrenIds || []).length} onClick={onToggle} />
        : <div {...style('conversation')}>
            <Conversation
              isBusy={addReply.pending}
              replies={replies}
              onReply={onReply}
            />
          </div>}
    </div>
  )
}

type ApiPropsT = PropsT & {
  caseId: string,
}

export default compose(
  withUser,
  connect(({ caseId, comment }: ApiPropsT) => ({
    fetchReplies: {
      type: types.COMMENT,
      lazy: true,
      query: {
        caseId,
        id: comment.id,
      },
    },
    addReply: {
      type: types.COMMENT,
      method: 'create',
    },
  })),
  withHandlers({
    onToggle: ({ fetchReplies }: ApiPropsT) => (event: Event) => {
      event.preventDefault()
      event.stopPropagation()

      fetchReplies()
    },
    onReply: ({ addReply, caseId, comment, user }: ApiPropsT) => (
      reply: string
    ) =>
      addReply({
        type: 'commentAdd',
        userId: user.id,
        message: reply,
        caseId: caseId,
        parentId: comment.id,
        user,
      }),
  }),
  lifecycle({
    componentWillReceiveProps({ addReply, fetchReplies }: ApiPropsT) {
      if (!addReply.pending && this.props.addReply.pending) {
        fetchReplies()
      }
    },
  }),
  withProps(({ fetchReplies }) => ({
    replies: (fetchReplies.fulfilled && fetchReplies.value.children) || [],
    isLoading: fetchReplies.pending,
    isLoaded: fetchReplies.fulfilled && fetchReplies.value.children,
  })),
  omitProps(['user', 'fetchReplies']),
  defaultStyle({
    conversation: {
      marginTop: 1,
    },
  })
)(Replies)



// WEBPACK FOOTER //
// ./packages/cases/src/comments/components/Replies.js