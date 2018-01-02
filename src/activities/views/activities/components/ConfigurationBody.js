// @flow
import React from 'react'

import { defaultStyle } from '@signavio/effektif-commons/lib/styles'

type PropsT = {
  children: React$Element<any>,
}

function ConfigurationBody({ style, children }: PropsT) {
  return (
    <div {...style}>
      {children}
    </div>
  )
}

const styled = defaultStyle(({ padding }) => ({
  backgroundColor: 'white',
  padding: padding.normal,
}))

export default styled(ConfigurationBody)



// WEBPACK FOOTER //
// ./src/activities/views/activities/components/ConfigurationBody.js