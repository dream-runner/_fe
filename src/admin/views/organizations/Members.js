// @flow
import React from 'react'
import i18n from 'signavio-i18n'

import { Group, List } from '@signavio/effektif-commons/lib/components'
import { makeInteractive } from '@signavio/effektif-commons/lib/components/tiles'
import { userUtils } from '@signavio/effektif-api'
import type { OrganizationT, UserT } from '@signavio/effektif-api'
import { UserTile } from '../../../../packages/organizations'

import { Select as UserSelect } from '../users'

const UserItem = makeInteractive(UserTile)

type PropsT = {
  organization: OrganizationT,

  systemUsers: Array<UserT>,
  admins: Array<UserT>,

  onUserSelect: (user: UserT) => void,
}

export default function Members({
  organization,
  systemUsers = [],
  admins,
  onUserSelect,
}) {
  return (
    <div className="members">
      {systemUsers.length > 0 && (
        <Group title={i18n('System users')} narrow>
          {systemUsers.map(user => (
            <UserItem
              key={user.id}
              user={user}
              onClick={() => onUserSelect(user)}
            >
              {userUtils.name(user)}
            </UserItem>
          ))}
        </Group>
      )}

      <Group title={i18n('Admins')} narrow>
        <List>
          {admins.map(admin => (
            <UserItem
              key={admin.id}
              user={admin}
              onClick={() => onUserSelect(admin)}
            >
              {userUtils.name(admin)}
            </UserItem>
          ))}
        </List>
      </Group>

      <Group title={i18n('Users')} narrow>
        <UserSelect
          static
          organization={organization}
          onChange={onUserSelect}
        />
      </Group>
    </div>
  )
}



// WEBPACK FOOTER //
// ./src/admin/views/organizations/Members.js