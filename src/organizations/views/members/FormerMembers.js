// @flow
import React from 'react'
import i18n from 'signavio-i18n'
import { withHandlers, withState, compose } from 'recompose'

import { List } from '@signavio/effektif-commons/lib/components'
import { defaultStyle, utils } from '@signavio/effektif-commons/lib/styles'

import type { UserT } from '@signavio/effektif-api'

import type { FormerMemberT, ReplacementT } from '../../types'

import FormerMember from './FormerMember'
import ReplacementModal from './ReplacementModal'

type PropsT = {
  formerMembers: Array<FormerMemberT>,
  userToRemove: UserT,

  expandedUser: boolean,

  onToggle: (userId: string) => void,
  onRequestReplace: (userId: string) => void,
  onReplace: (replacement: UserT) => void,
  onCancelReplace: () => void,
}

function FormerMemberList(props: PropsT) {
  const {
    formerMembers,
    userToRemove,
    expandedUser,
    style,
    onToggle,
    onRequestReplace,
    onReplace,
    onCancelReplace,
  } = props
  return (
    <div {...style}>
      <h3 {...style('heading')}>{i18n('Former users')}</h3>

      <List style={style('userContainer')}>
        {formerMembers.map(({ user, stats }: FormerMemberT) => (
          <FormerMember
            key={user.id}
            user={user}
            stats={stats}
            expanded={expandedUser === user.id}
            onToggle={onToggle}
            onReplace={onRequestReplace}
          />
        ))}
      </List>

      {userToRemove && (
        <ReplacementModal
          allowSelectUser
          userToRemove={userToRemove}
          onCancel={onCancelReplace}
          onReplace={onReplace}
        />
      )}
    </div>
  )
}

const styled = defaultStyle(({ font, lineHeight, padding }) => {
  const height = utils.calculateHeight(
    font.size.normal,
    lineHeight,
    padding.small
  )

  return {
    userContainer: {
      maxHeight: 6.5 * height,
      overflowY: 'scroll',
      marginBottom: padding.large,
    },
    heading: {
      marginBottom: padding.normal,
    },
  }
})

type ApiPropsT = PropsT & {
  onReplace: (replacement: ReplacementT) => void,
}

export default compose(
  withState('expandedUser', 'setExpanded', ''),
  withState('userToRemove', 'setUserToRemove', null),
  withHandlers({
    onToggle: ({ setExpanded, expandedUser }) => (id: string) => {
      setExpanded(expandedUser === id ? null : id)
    },
    onRequestReplace: ({ setUserToRemove }) => (user: UserT) =>
      setUserToRemove(user),
    onCancelReplace: ({ setUserToRemove }) => () => setUserToRemove(null),
    onReplace: ({ onReplace, userToRemove, setUserToRemove }: ApiPropsT) => (
      replacement: UserT
    ) => {
      onReplace({ userToRemove, replacement })
      setUserToRemove(null)
    },
  }),
  styled
)(FormerMemberList)



// WEBPACK FOOTER //
// ./src/organizations/views/members/FormerMembers.js