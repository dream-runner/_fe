// @flow
import React from 'react'

import i18n from 'signavio-i18n'

import { defaultStyle } from '@signavio/effektif-commons/lib/styles'
import { Markdown } from '@signavio/effektif-commons/lib/components'

import Event from '@signavio/workflow-events'

import type { CaseCancelEventT } from '../../types'

type PropsT = {
  event: CaseCancelEventT,
}

function CaseCancel({ event, ...rest }: PropsT) {
  return (
    <Event
      {...rest}
      important
      expanded
      event={event}
      title={i18n('This case has been canceled')}
      icon="close-case"
    >
      <Markdown style={rest.style('content')}>
        {event.reason}
      </Markdown>
    </Event>
  )
}

const styled = defaultStyle(({ padding, color }) => ({
  content: {
    padding: padding.normal,
    backgroundColor: color.mono.ultralight,
  },
}))

export default styled(CaseCancel)



// WEBPACK FOOTER //
// ./packages/cases/src/events/case/Cancel.js