import PropTypes from 'prop-types'
// @flow

import React from 'react'

import { defaultStyle, utils } from 'commons-style'
import { TextTile } from 'commons-components/tiles'

type Props = {
  children: React$Element,
}

function Removed({ children, ...rest }: Props) {
  return (
    <TextTile {...rest} icon="minus">
      {children}
    </TextTile>
  )
}

export default defaultStyle(theme => ({
  icon: {
    backgroundColor: theme.color.status.danger,
    color: utils.textColor(theme.color.status.danger),
  },
}))(Removed)



// WEBPACK FOOTER //
// ./src/services/views/connectors/diffs/Removed.js