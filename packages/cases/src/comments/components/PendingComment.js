// @flow
import React from 'react'

import i18n from 'signavio-i18n'

import { Hint } from '@signavio/effektif-commons/lib/components/hints'
import { defaultStyle } from '@signavio/effektif-commons/lib/styles'

import type { EventT } from '@signavio/workflow-events'

import { Event } from '../../events'

type PropsT = {
  comment: EventT,
}

function PendingComment({ comment, style }: PropsT) {
  return (
    <div {...style}>
      <Event style={style('event')} event={comment} />

      <Hint loading style={style('message')}>
        {i18n('Adding comment...')}
      </Hint>
    </div>
  )
}

const styled = defaultStyle(() => ({
  position: 'relative',

  event: {
    filter: 'blur(10px)',
  },

  message: {
    position: 'absolute',

    top: 0,

    width: '100%',
  },
}))

export default styled(PendingComment)



// WEBPACK FOOTER //
// ./packages/cases/src/comments/components/PendingComment.js