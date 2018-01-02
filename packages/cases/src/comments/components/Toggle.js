// @flow
import React from 'react'

import i18n from 'signavio-i18n'

import { font, defaultStyle } from '@signavio/effektif-commons/lib/styles'
import { LinkButton } from '@signavio/effektif-commons/lib/components/buttons'

type PropsT = {
  replies: number,
}

function Toggle({ replies, ...rest }: PropsT) {
  return (
    <LinkButton small {...rest}>
      {replies === 0
        ? i18n('Reply to this comment')
        : i18n('Show __count__ reply', 'Show __count__ replies', {
            count: replies,
          })}
    </LinkButton>
  )
}

const styled = defaultStyle({
  fontSize: font.size.small,
})

export default styled(Toggle)



// WEBPACK FOOTER //
// ./packages/cases/src/comments/components/Toggle.js