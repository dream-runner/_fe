// @flow
import * as React from 'react'

import { defaultStyle } from '@signavio/effektif-commons/lib/styles'

type PropsT = {
  kind: 'default' | 'header',

  children: React.Node,
}

const Logo = ({ style }: PropsT) => <div {...style} />

const styled = defaultStyle(
  ({ logoHeader, logo }, { kind = 'default' }: PropsT) => ({
    width: '100%',
    height: '100%',

    textShadow: 'none',

    backgroundPosition: 'center center',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',

    backgroundImage: `url(${kind === 'header' ? logoHeader : logo})`,
  })
)

export default styled(Logo)



// WEBPACK FOOTER //
// ./packages/main/src/components/Logo.js