// @flow
import React from 'react'

import { defaultStyle, utils } from '@signavio/effektif-commons/lib/styles'

type PropsT = {
  children: React$Element<*>,
}

const CommentCounter = ({ children, style }: PropsT) => (
  <div {...style}>{children}</div>
)

const styled = defaultStyle(({ color, padding, font }) => {
  const size = padding.large * 2 / 3

  return {
    display: 'inline-block',

    borderRadius: size,

    backgroundColor: color.mono.middle,
    color: utils.color(color.mono.middle),

    lineHeight: `${size}px`,
    paddingLeft: padding.small,
    paddingRight: padding.small,

    fontSize: font.size.form,
  }
})

export default styled(CommentCounter)



// WEBPACK FOOTER //
// ./packages/cases/src/components/CommentCounter.js