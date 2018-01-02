// @flow
import React from 'react'

import { Divider, List } from '@signavio/effektif-commons/lib/components'
import { defaultStyle } from '@signavio/effektif-commons/lib/styles'

import type { CommentAddEventT } from '../../types'

import Reply from './Reply'
import AddReply from './AddReply'

type PropsT = {
  isBusy: boolean,

  replies: Array<CommentAddEventT>,

  onReply: (reply: string) => void,
}

function Conversation({ isBusy, replies = [], style, onReply }: PropsT) {
  return (
    <div>
      <div {...style('replies')}>
        <List>
          {replies.map((reply: CommentAddEventT, index: number) =>
            <div key={reply.id}>
              {index > 0 && <Divider />}
              <Reply reply={reply} />
            </div>
          )}
        </List>
      </div>

      {replies.length > 0 && <Divider />}

      <AddReply onReply={onReply} isBusy={isBusy} />
    </div>
  )
}

const styled = defaultStyle(({ padding }) => ({
  replies: {
    paddingLeft: padding.normal,
  },
}))

export default styled(Conversation)



// WEBPACK FOOTER //
// ./packages/cases/src/comments/components/Conversation.js