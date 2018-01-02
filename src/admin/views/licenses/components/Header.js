// @flow
import React from 'react'
import { withState, withHandlers, compose } from 'recompose'

import { Popover, Icon } from '@signavio/effektif-commons/lib/components'
import { IconButton } from '@signavio/effektif-commons/lib/components/buttons'

import { Avatar } from '../../../../../packages/organizations'
import type { UserT } from '@signavio/effektif-api'

type PropsT = {
  hover: boolean,
  isSelected: boolean,
  isGenerator: boolean,

  user: ?UserT,

  invitee?: string,
}

function Header(props: PropsT) {
  const {
    hover,
    user,
    invitee,
    isSelected,
    isGenerator,
    onSelect,
    ...rest
  } = props

  return (
    <div onClick={onSelect} {...rest}>
      <IconButton
        onClick={onSelect}
        icon={getIcon(hover, isSelected, isGenerator)}
      />
      {user && <Avatar user={user} style={{ float: 'right' }} />}

      {invitee && (
        <Popover placement="top" small popover={invitee}>
          <Icon icon="at" />
        </Popover>
      )}
    </div>
  )
}

const getIcon = (hover, isSelected, isGenerator) => {
  if (isSelected) {
    return 'square-check'
  }

  if (!hover && !isSelected) {
    if (isGenerator) {
      return 'cube'
    }

    return 'license'
  }

  if (hover && !isSelected) {
    return 'square'
  }
}

export default compose(
  withState('hover', 'toggleHover', false),
  withHandlers({
    onMouseOver: ({ isSelectable, toggleHover }) => () =>
      isSelectable && toggleHover(true),
    onMouseOut: ({ isSelectable, toggleHover }) => () =>
      isSelectable && toggleHover(false),
  })
)(Header)



// WEBPACK FOOTER //
// ./src/admin/views/licenses/components/Header.js