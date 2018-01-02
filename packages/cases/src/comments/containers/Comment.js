// @flow
import React from 'react'
import i18n from 'signavio-i18n'

import { UserTile } from '@signavio/workflow-organizations'
import { userUtils } from '@signavio/effektif-api'

import { Time } from '@signavio/effektif-commons/lib/components'

import { defaultStyle, utils } from '@signavio/effektif-commons/lib/styles'

import { TaskLink } from '../../events/components'

import type { CommentT } from '../types'

import { CommentContent } from '../components'

type PropsT = {
  caseId: string,
  comment: CommentT,
}

function Comment({ caseId, comment, style }: PropsT) {
  const { user, time, task, type } = comment

  return (
    <div>
      <UserTile
        user={user}
        small
        transparent
        toolbar={<Time hideIcon time={time} />}
      >
        {type === 'commentAdd'
          ? i18n('__user__ left a comment', {
              user: userUtils.name(user),
            })
          : i18n('__user__ uploaded a file', {
              user: userUtils.name(user),
            })}
      </UserTile>

      <div {...style('content')}>
        {task && (
          <div {...style('taskLink')}>
            {type === 'commentAdd'
              ? i18n('This comment was left on __task__', {
                  task: <TaskLink task={task} caseId={caseId} />,
                })
              : i18n('This file was uploaded on __task__', {
                  task: <TaskLink task={task} caseId={caseId} />,
                })}
          </div>
        )}

        <CommentContent caseId={caseId} comment={comment} />
      </div>
    </div>
  )
}

const styled = defaultStyle(({ color, padding, font }) => ({
  taskLink: {
    fontSize: font.size.small,
    marginBottom: padding.small,
  },

  content: {
    marginTop: padding.small,
    padding: padding.small,

    ...utils.border(1, 'solid', color.mono.light),
    ...utils.boxShadow('2px', '2px', 0, color.mono.ultralight),
  },
}))

export default styled(Comment)



// WEBPACK FOOTER //
// ./packages/cases/src/comments/containers/Comment.js