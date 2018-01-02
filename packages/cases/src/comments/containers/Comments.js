// @flow
import React from 'react'
import i18n from 'signavio-i18n'
import { map, sortBy, filter } from 'lodash'
import { compose } from 'recompose'

import { connect, types } from '@signavio/effektif-api'

import { Hint } from '@signavio/effektif-commons/lib/components/hints'
import { List } from '@signavio/effektif-commons/lib/components'
import { defaultStyle } from '@signavio/effektif-commons/lib/styles'

import { withPeriodicAction } from '../../components'
import type { CommentT } from '../types'

import Comment from './Comment'

function Comments({ fetchComments, caseId, taskId, style }) {
  if (fetchComments.pending && !fetchComments.value) {
    return <Hint loading>{i18n('Loading comments...')}</Hint>
  }

  if (fetchComments.rejected) {
    return (
      <Hint danger>
        {i18n('Could not load comments for the following reason: __reason__', {
          reason: fetchComments.reason,
        })}
      </Hint>
    )
  }

  const comments = filter(fetchComments.value, (comment: CommentT) => {
    if (comment.parentId) {
      return false
    }

    if (taskId) {
      return taskId === comment.taskId
    }

    return true
  })

  if (comments.length === 0) {
    return <Hint>{i18n('So far no comments have been made.')}</Hint>
  }

  return (
    <List style={style('comments')}>
      {map(
        sortBy(
          comments,
          (comments, ({ time }) => -1 * new Date(time).getTime())
        ),
        (comment: CommentT) => (
          <Comment key={comment.id} caseId={caseId} comment={comment} />
        )
      )}
    </List>
  )
}

export default compose(
  connect(({ caseId, taskId }) => ({
    fetchComments: {
      type: types.COMMENTS,
      query: {
        caseId,
        taskId,
      },
    },
  })),
  withPeriodicAction(({ fetchComments }) => fetchComments()),
  defaultStyle(({ padding }) => ({
    comments: {
      entry: {
        marginTop: padding.large,
      },
    },
  }))
)(Comments)



// WEBPACK FOOTER //
// ./packages/cases/src/comments/containers/Comments.js