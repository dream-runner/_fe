import PropTypes from 'prop-types'
// @flow

import React from 'react'

import { defaultStyle, utils } from 'commons-style'
import { TextTile } from 'commons-components/tiles'

type Props = {
  children: React$Element,
}

function Changed({ children, ...rest }: Props) {
  return (
    <TextTile {...rest} icon="flow">
      {children}
    </TextTile>
  )
}

export default defaultStyle(theme => ({
  icon: {
    backgroundColor: theme.color.status.warning,
    color: utils.textColor(theme.color.status.warning),
  },
}))(Changed)



// WEBPACK FOOTER //
// ./src/services/views/connectors/diffs/Changed.js