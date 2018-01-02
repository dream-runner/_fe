// @flow
import React from 'react'
import i18n from 'signavio-i18n'

import {
  defaultStyle,
  padding,
  font,
} from '@signavio/effektif-commons/lib/styles'
import {
  MarkdownMentions,
  Time,
} from '@signavio/effektif-commons/lib/components'

import { UserTile } from '@signavio/workflow-organizations'
import { userUtils } from '@signavio/effektif-api'

import type { CommentAddEventT } from '../../../types'

type PropsT = {
  reply: CommentAddEventT,
}

function Reply({ reply, style }: PropsT) {
  return (
    <div>
      <UserTile
        small
        transparent
        user={reply.user}
        toolbar={<Time hideIcon {...style('time')} time={reply.time} />}
      >
        {i18n('__user__ replied', {
          user: userUtils.name(reply.user),
        })}
      </UserTile>

      <MarkdownMentions style={style('comment')}>
        {reply.message}
      </MarkdownMentions>
    </div>
  )
}

const styled = defaultStyle(({ color }) => ({
  backgroundColor: null,

  avatar: {
    marginRight: padding.small,
  },

  time: {
    cursor: 'default',

    display: 'inline-block',

    fontSize: font.size.xsmall,
    color: color.mono.lighter,
  },

  comment: {
    marginTop: padding.small,

    mention: {
      backgroundColor: color.primary.light,
    },
  },
}))

export default styled(Reply)



// WEBPACK FOOTER //
// ./packages/cases/src/comments/components/Reply.js