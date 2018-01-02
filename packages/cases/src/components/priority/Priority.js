/* @flow */
import React from 'react'
import { compose } from 'recompose'

import { defaultStyle, utils } from '@signavio/effektif-commons/lib/styles'
import { omitProps } from '@signavio/effektif-commons/lib/components'

import { Colors } from './priorities'

type PropsT = {
  priority: string,
}

function Priority({ style, ...rest }: PropsT) {
  return <div {...rest} {...style} />
}

const styled = defaultStyle(
  () => ({
    '&priority-0': {
      backgroundColor: Colors.high,
      color: utils.color(Colors.high),
    },
    '&priority-1': {
      backgroundColor: Colors.medium,
      color: utils.color(Colors.medium),
    },
    '&priority-2': {
      backgroundColor: Colors.normal,
      color: utils.color(Colors.normal),
    },
    '&priority-3': {
      backgroundColor: Colors.low,
      color: utils.color(Colors.low),
    },
  }),
  ({ priority }: PropsT) => ({ [`&priority-${priority}`]: true })
)

const enhance = compose(styled, omitProps(['priority']))

export default enhance(Priority)



// WEBPACK FOOTER //
// ./packages/cases/src/components/priority/Priority.js