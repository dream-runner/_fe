// @flow
import React from 'react'
import { omit } from 'lodash'
import i18n from 'signavio-i18n'

import { defaultStyle } from '@signavio/effektif-commons/lib/styles'

import { Markdown } from '@signavio/effektif-commons/lib/components'

import type { EventT } from '@signavio/workflow-events'

import Event from '@signavio/workflow-events'

type SkipEventT = EventT & {
  message: string,
  activityName: ?string,
}

type PropsT = {
  event: SkipEventT,
}

function SkipActivityInstance({ event, style }: PropsT) {
  const { message, activityName } = event

  return (
    <Event
      event={omit(event, 'actor')}
      title={i18n('skipped action __name__', {
        name: activityName || i18n('Unnamed action'),
      })}
      icon="skip-forward"
    >
      {message &&
        <Markdown style={style('content')}>
          {message}
        </Markdown>}
    </Event>
  )
}

const styled = defaultStyle(({ padding, color }) => ({
  content: {
    padding: padding.normal,
    backgroundColor: color.mono.ultralight,
  },
}))

export default styled(SkipActivityInstance)



// WEBPACK FOOTER //
// ./packages/cases/src/events/engine/SkipActivityInstance.js