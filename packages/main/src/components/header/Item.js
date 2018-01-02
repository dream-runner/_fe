import PropTypes from 'prop-types'
import React from 'react'
import { omit } from 'lodash'

import { defaultStyle } from 'commons-style'
import { ActionTile } from 'commons-components/tiles'

function Item({ children, ...rest }) {
  return (
    <ActionTile small {...omit(rest, 'active', 'highlighted')}>
      {children}
    </ActionTile>
  )
}

Item.propTypes = {
  children: PropTypes.node,
}

const getModifiers = props => ({
  '&active': props.active,
  '&highlighted': props.highlighted,
})

const styled = defaultStyle(
  theme => ({
    icon: {
      backgroundColor: 'transparent',
    },

    main: {
      color: theme.color.mono.ultradark,
    },

    '&active': {
      main: {
        color: theme.color.primary.base,
      },
    },

    '&highlighted': {
      main: {
        color: theme.color.primary.base,
      },
    },
  }),
  getModifiers
)

export default styled(Item)



// WEBPACK FOOTER //
// ./packages/main/src/components/header/Item.js