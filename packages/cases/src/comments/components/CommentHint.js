// @flow
import React from 'react'
import i18n from 'signavio-i18n'
import { defaultStyle } from '@signavio/effektif-commons/lib/styles'

import { Hint } from '@signavio/effektif-commons/lib/components/hints'

type PropsT = {
  commentOnTask: boolean,
}

const CommentHint = ({ commentOnTask, style }: PropsT) => {
  if (commentOnTask) {
    return (
      <div {...style}>
        <Hint inline small>
          {i18n(
            'This comment will be associated with the **task** you **currently** see. Only users who have access to this task will be able to see this comment.',
            { markdown: true }
          )}
        </Hint>
      </div>
    )
  }

  return (
    <div {...style}>
      <Hint inline small>
        {i18n(
          'This comment will be associated with the whole **case**. Everyone who has access to this case will be able to see this comment.',
          { markdown: true }
        )}
      </Hint>
    </div>
  )
}

const styled = defaultStyle(() => ({
  paddingTop: 10,
}))

export default styled(CommentHint)



// WEBPACK FOOTER //
// ./packages/cases/src/comments/components/CommentHint.js