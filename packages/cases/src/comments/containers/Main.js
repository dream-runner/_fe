// @flow
import React from 'react'
import i18n from 'signavio-i18n'
import { compose, withHandlers, withState, lifecycle } from 'recompose'

import { connect, types, withUser } from '@signavio/effektif-api'

import { Divider } from '@signavio/effektif-commons/lib/components'
import { defaultStyle } from '@signavio/effektif-commons/lib/styles'

import type { CommentTargetT } from '../types'
import { CommentAdd, PendingComment, CommentTarget } from '../components'

import Comments from './Comments'

type PropsT = {
  caseId: string,
  taskId?: string,

  commentTarget: CommentTargetT,

  onComment: (message: string) => void,
  onFileAdd: (file: File) => void,
  onTargetChange: (commentTarget: CommentTargetT) => void,
}

function Main({
  addComment,
  pendingComment,
  commentTarget,
  caseId,
  taskId,
  style,
  onComment,
  onFileAdd,
  onTargetChange,
}: PropsT) {
  return (
    <div>
      <div {...style('commentAdd')}>
        <CommentAdd onComment={onComment} onFileAdd={onFileAdd} />
      </div>

      <div {...style('commentTarget')}>
        <Divider />

        <CommentTarget
          value={commentTarget}
          canCommentOnTask={!!taskId}
          onChange={onTargetChange}
        />
      </div>

      <Divider />

      {addComment.pending &&
        pendingComment && <PendingComment comment={pendingComment} />}

      <div {...style('comments')}>
        <Comments
          caseId={caseId}
          taskId={commentTarget === 'task' ? taskId : undefined}
        />
      </div>
    </div>
  )
}

type ApiPropsT = PropsT & {
  setCommentTarget: (commentTarget: CommentTargetT) => void,
}

export default compose(
  withUser,
  connect(() => ({
    addComment: {
      type: types.COMMENT,
      method: 'create',
    },
  })),
  withState('pendingComment', 'setPendingComment', null),
  withState(
    'commentTarget',
    'setCommentTarget',
    ({ taskId }) => (taskId ? 'task' : 'case')
  ),
  withHandlers({
    onFileAdd: ({
      addComment,
      caseId,
      taskId,
      user,
      commentTarget,
      setPendingComment,
    }: ApiPropsT) => (file: File) => {
      const fileAddComment = {
        type: 'fileAdd',
        fileId: file.id,
        userId: user.id,
        user,
        taskId: commentTarget === 'task' ? taskId : null,
        caseId,
      }

      addComment(fileAddComment)
      setPendingComment({
        ...fileAddComment,
        actor: user,
      })
    },
    onComment: ({
      addComment,
      user,
      caseId,
      taskId,
      commentTarget,
      setPendingComment,
    }: ApiPropsT) => (message: string) => {
      const comment = {
        type: 'commentAdd',
        userId: user.id,
        message,
        caseId,
        taskId: commentTarget === 'task' ? taskId : null,
        user,
      }

      addComment(comment)
      setPendingComment({
        ...comment,
        actor: user,
      })
    },
    onTargetChange: ({ setCommentTarget }) => (target: CommentTargetT) =>
      setCommentTarget(target),
  }),
  lifecycle({
    componentWillReceiveProps(nextProps) {
      const { onTargetChange, commentTarget, taskId } = this.props

      if (!taskId && nextProps.taskId) {
        onTargetChange('task')

        return
      }

      if (taskId && !nextProps.taskId && commentTarget === 'task') {
        onTargetChange('case')
      }
    },
  }),
  defaultStyle(({ padding }) => ({
    comments: {
      marginTop: padding.large,
    },

    commentTarget: {
      marginTop: padding.large,
    },
  }))
)(Main)



// WEBPACK FOOTER //
// ./packages/cases/src/comments/containers/Main.js