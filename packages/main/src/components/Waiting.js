/* @flow */
import React from 'react'

import { defaultStyle } from '@signavio/effektif-commons/lib/styles'
import { Hint } from '@signavio/effektif-commons/lib/components/hints'

import Logo from './Logo'

type PropsT = {
  message?: string,
}

function Waiting({ message, style }: PropsT) {
  return (
    <div {...style}>
      <div {...style('logo')}>
        <Logo />

        <Hint loading>{message}</Hint>
      </div>
    </div>
  )
}

const styled = defaultStyle({
  position: 'fixed',

  top: 0,
  left: 0,

  opacity: 1,

  width: '100%',
  height: '100%',

  zIndex: 100,

  logo: {
    position: 'absolute',

    top: '50%',

    opacity: 1,

    width: '100%',
    height: 75,

    marginTop: -(75 / 2),
  },
})

export default styled(Waiting)



// WEBPACK FOOTER //
// ./packages/main/src/components/Waiting.js