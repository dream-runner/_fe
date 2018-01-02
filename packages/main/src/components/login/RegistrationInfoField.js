// @flow
import React from 'react'
import { compose } from 'recompose'

import { List } from '@signavio/effektif-commons/lib/components'
import { TextTile } from '@signavio/effektif-commons/lib/components/tiles'
import { defaultStyle } from '@signavio/effektif-commons/lib/styles'

type PropsT = {
  children: React$Element<any>,
  label?: string,
}

function RegistrationInfoField({ label, children, style }: PropsT) {
  return (
    <List direction="horizontal" style={style}>
      <div>
        {children}
      </div>
      {label &&
        <TextTile style={style('label')}>
          {label}
        </TextTile>}
    </List>
  )
}

export default compose(
  defaultStyle(({ font }) => ({
    entry: {
      width: 'calc(50% - 1px)',

      '&first': {
        width: '50%',
      },
    },
    label: {
      fontSize: font.size.small,
    },
  }))
)(RegistrationInfoField)



// WEBPACK FOOTER //
// ./packages/main/src/components/login/RegistrationInfoField.js