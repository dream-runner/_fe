// @flow
import React from 'react'
import { withHandlers, compose } from 'recompose'

import { defaultStyle } from '@signavio/effektif-commons/lib/styles'
import { Tile } from '@signavio/effektif-commons/lib/components/tiles'
import { RemoveButton } from '@signavio/effektif-commons/lib/components/buttons'

import { UserSelect, User } from '../../../../packages/organizations'
import type { UserT } from '@signavio/effektif-api'

type PropsT = {
  allowSelectUser?: boolean,
  value?: UserT,

  onRemove: () => void,
  onSelect: (user: UserT) => void,
  onFilter: (users: Array<UserT>) => Array<UserT>,

  userToRemove: UserT,
}

function ReplacementSelect({ value, onSelect, onRemove, onFilter }: PropsT) {
  if (value) {
    return (
      <Tile toolbar={<RemoveButton onClick={onRemove} />}>
        <User value={value.id} />
      </Tile>
    )
  }

  return (
    <UserSelect
      selfOnTop
      registeredOnly
      onUserSelect={onSelect}
      filter={onFilter}
    />
  )
}

const styled = defaultStyle(({ padding }) => ({
  paddingBottom: padding.large,
}))

export default compose(
  withHandlers({
    onSelect: ({ onChange }) => (user: UserT) => onChange(user),
    onRemove: ({ onChange }) => () => onChange(null),
    onFilter: ({ allowSelectUser, userToRemove }: PropsT) => (
      users: Array<UserT>
    ) => {
      return users.map((user: UserT) => {
        if (user.entity.id === userToRemove.id && !allowSelectUser) {
          return { ...user, disabled: true }
        }

        return user
      })
    },
  }),
  styled
)(ReplacementSelect)



// WEBPACK FOOTER //
// ./src/organizations/views/members/ReplacementSelect.js