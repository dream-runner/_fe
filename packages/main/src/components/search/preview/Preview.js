// @flow
import React from 'react'

import { List } from '@signavio/effektif-commons/lib/components'
import { defaultStyle } from '@signavio/effektif-commons/lib/styles'

type PropsT = {
  title: string,

  children: React$Element<any>,
}

function Preview({ title, style, children }: PropsT) {
  return (
    <div>
      <h3 {...style('title')}>{title}</h3>

      <List>{children}</List>
    </div>
  )
}

const styled = defaultStyle(({ padding }) => ({
  title: {
    marginBottom: padding.large,
  },
}))

export default styled(Preview)



// WEBPACK FOOTER //
// ./packages/main/src/components/search/preview/Preview.js