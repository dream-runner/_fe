// @flow

import React from 'react'
import i18n from 'signavio-i18n'
import { withState, withHandlers, compose } from 'recompose'
import { includes } from 'lodash'

import {
  AsAccordion,
  WithUserQuery,
  Autocomplete,
  Disable,
} from '@signavio/effektif-commons/lib/components'

import type { UserT } from '@signavio/effektif-api'
import Member from './Member'

import ReplacementModal from './ReplacementModal'

type Props = {
  userQuery: any,

  activeItem: UserT,
  userToRemove?: UserT,

  adminIds: Array<string>,

  onToggle: (user: UserT) => void,
  onCancelRemove: () => void,
  onReplace: (replacement: UserT) => void,
  onRequestRemove: (user: UserT) => void,
}

function MemberList(props: Props) {
  const {
    userQuery,
    activeItem,
    adminIds,
    userToRemove,
    onToggle,
    onRequestRemove,
    onCancelRemove,
    onReplace,
    disabledUsers,
    ...rest
  } = props
  return (
    <div>
      <Autocomplete
        static
        query={userQuery}
        placeholder={i18n('Search for users in your organization...')}
        onComplete={() => null}
        renderItem={({ entity }: { entity: UserT }) => (
          <Disable disabled={includes(disabledUsers, entity.id)}>
            <Member
              {...rest}
              onRemove={onRequestRemove}
              member={entity}
              isAdmin={includes(adminIds, entity.id)}
              expanded={entity === activeItem}
              onToggle={(isOpen: boolean, ev: Event) => {
                ev.stopPropagation()
                ev.preventDefault()

                onToggle(entity)
              }}
            />
          </Disable>
        )}
      />

      {userToRemove && (
        <ReplacementModal
          allowSpecifyLater
          onCancel={onCancelRemove}
          userToRemove={userToRemove}
          onReplace={onReplace}
        />
      )}
    </div>
  )
}

export default compose(
  withState('disabledUsers', 'addDisabledUser', []),
  withState('userToRemove', 'toggleUserToRemove', null),
  withHandlers({
    onRequestRemove: ({ toggleUserToRemove }) => (user: UserT) =>
      toggleUserToRemove(user),
    onCancelRemove: ({ toggleUserToRemove }) => () => toggleUserToRemove(null),
    onReplace: ({
      userToRemove,
      toggleUserToRemove,
      onRemove,
      disabledUsers,
      addDisabledUser,
    }) => (replacement: UserT) => {
      onRemove({
        userToRemove,
        replacement,
      })
      addDisabledUser([...disabledUsers, userToRemove.id])
      toggleUserToRemove(null)
    },
  }),
  AsAccordion,
  WithUserQuery
)(MemberList)



// WEBPACK FOOTER //
// ./src/organizations/views/members/MemberList.js