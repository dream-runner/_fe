import React from 'react'

import { defaultStyle, utils, variables, padding, font } from 'commons-style'

function DebugWarning({ style }) {
  return (
    <div {...style}>
      Development
    </div>
  )
}

const styled = defaultStyle(theme => ({
  position: 'absolute',

  top: 0,
  left: 0,

  paddingLeft: padding.normal,
  paddingRight: padding.normal,

  height: variables.lineHeight.block,
  lineHeight: `${variables.lineHeight.block}px`,

  color: 'red',
  fontFamily: 'Courier New',
  fontWeight: 'bold',
  fontSize: font.size.form,
  textTransform: 'uppercase',

  background: 'white',

  zIndex: 99,

  transform: 'rotate(-10deg)',

  ...utils.border('1px', 'solid', theme.color.mono.light),
  ...utils.boxShadow(),
}))

export default styled(DebugWarning)



// WEBPACK FOOTER //
// ./packages/main/src/components/header/DebugWarning.js