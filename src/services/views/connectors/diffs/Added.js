import PropTypes from 'prop-types'
// @flow

import React from 'react'

import { defaultStyle, utils } from 'commons-style'
import { TextTile } from 'commons-components/tiles'

type Props = {
  children: React$Element,
}

function Added({ children, ...rest }: Props) {
  return (
    <TextTile {...rest} icon="plus">
      {children}
    </TextTile>
  )
}

export default defaultStyle(theme => ({
  icon: {
    backgroundColor: theme.color.status.success,
    color: utils.textColor(theme.color.status.success),
  },
}))(Added)



// WEBPACK FOOTER //
// ./src/services/views/connectors/diffs/Added.js