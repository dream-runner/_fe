// @flow

import React from 'react'
import i18n from 'signavio-i18n'
import { withHandlers, compose } from 'recompose'

import { defaultStyle, utils } from 'commons-style'
import { Remove, Collapsible, List, Box } from 'commons-components'
import { IconButton } from 'commons-components/buttons'

import { userUtils, withUser } from '@signavio/effektif-api'
import type { UserT } from '@signavio/effektif-api'

import { UserTile } from '../../../../packages/organizations'

import { LabeledField } from '../../../../packages/fields'

import { LicenseUtils } from '../../utils'
import { License } from '../license'

import Membership from './Membership'

type PropsT = {
  user: UserT,
  member: UserT,

  expanded: boolean,
  isAdmin: boolean,

  onToggle: (state: boolean) => void,
  onRemove: () => void,
}

function Member({
  user,
  member,
  isAdmin,
  expanded = false,
  onToggle,
  onRemove,
  style,
  ...rest
}: PropsT) {
  const license = LicenseUtils.getLicenseForUser(member.licenses, member)
  const isLoggedInUser = user.id === member.id

  return (
    <Collapsible
      expanded={expanded}
      onToggle={onToggle}
      header={
        <UserTile
          user={member}
          subtitle={isAdmin && i18n('Admin')}
          toolbar={
            <List direction="horizontal">
              <Remove onRemove={onRemove} disabled={isLoggedInUser} />

              <Toggle expanded={expanded} onToggle={onToggle} />
            </List>
          }
        >
          {userUtils.name(member)}
        </UserTile>
      }
    >
      <Box>
        <Box white>
          <List>
            <LabeledField
              readOnly
              transparent
              label={i18n('Email address')}
              type={{ name: 'emailAddress' }}
              value={member.emailAddress}
            />

            <License label={i18n('License')} license={license} />

            <Membership
              {...rest}
              style={style('membership')}
              label={i18n('Membership type')}
              member={member}
              isAdmin={isAdmin}
              isLoggedInUser={isLoggedInUser}
            />
          </List>
        </Box>
      </Box>
    </Collapsible>
  )
}

const styled = defaultStyle(({ padding }) => ({
  membership: {
    marginBottom: padding.normal,
  },
}))

export default compose(
  withUser,
  withHandlers({
    onRemove: ({ member, onRemove }) => () => onRemove(member),
  }),
  styled
)(Member)

export function Toggle({
  expanded,
  onToggle,
}: {
  expanded: boolean,
  onToggle: (state: boolean) => void,
}) {
  return (
    <IconButton
      iconSet="fontAwesome"
      style={{
        display: 'block',
        float: 'right',

        ...utils.borderLeft('1px', 'solid', 'white'),
      }}
      icon={expanded ? 'angle-up' : 'angle-down'}
      onToggle={ev => {
        ev.stopPropagation()
        ev.preventDefault()

        onToggle(!expanded, ev)
      }}
    />
  )
}



// WEBPACK FOOTER //
// ./src/organizations/views/members/Member.js