// @flow
import React from 'react'
import Color from 'color'
import { compose, mapProps, withHandlers } from 'recompose'

import i18n from 'signavio-i18n'

import {
  defaultStyle,
  font,
  padding,
  variables,
  utils,
} from '@signavio/effektif-commons/lib/styles'
import {
  ContextHelp,
  omitProps,
} from '@signavio/effektif-commons/lib/components'
import { TextButton } from '@signavio/effektif-commons/lib/components/buttons'
import { withLabel } from '@signavio/effektif-commons/lib/components/forms'

import type { UserT } from '@signavio/effektif-api'

type PropsT = {
  isLoggedInUser: boolean,

  title: string,
  help: string,
  actionText: string,

  onClick: (event: MouseEvent) => void,
}

function Membership(props: PropsT) {
  const {
    title,
    help,
    actionText,
    isLoggedInUser,
    onClick,
    style,
    ...rest
  } = props

  return (
    <div {...rest} {...style}>
      {title}

      <ContextHelp {...style('help')} placement="top" title={title}>
        {help}
      </ContextHelp>

      <br />

      {!isLoggedInUser && (
        <TextButton {...style('button')} onClick={onClick}>
          {actionText}
        </TextButton>
      )}
    </div>
  )
}

type ApiPropsT = PropsT & {
  member: UserT,

  isAdmin: boolean,

  onAdminRevoke: (member: UserT) => void,
  onAdminGrant: (member: UserT) => void,
}

export default compose(
  withLabel,
  mapProps(({ isAdmin, ...rest }: ApiPropsT) => ({
    ...rest,
    isAdmin,
    title: isAdmin ? i18n('Administrator') : i18n('Collaborator'),
    help: isAdmin
      ? i18n(`
        Administrators have full privileges for managing organization settings.
        They can add and remove organization members, and grant or revoke other users\' administrator access.
      `)
      : i18n(`
        Collaborators can create and edit processes, start new cases, and collaborate in tasks.
        They can not edit organization settings and they can not manage members and groups.
      `),
    actionText: isAdmin
      ? i18n('Revoke administrator access')
      : i18n('Promote to administrator'),
  })),
  withHandlers({
    onClick: ({ onAdminGrant, onAdminRevoke, isAdmin, member }: ApiPropsT) => (
      ev: MouseEvent
    ) => {
      ev.stopPropagation()
      ev.preventDefault()

      if (isAdmin) {
        onAdminRevoke(member)
      } else {
        onAdminGrant(member)
      }
    },
  }),
  defaultStyle(
    theme => ({
      button: {
        height: variables.lineHeight.block / 2,
        lineHeight: `${variables.lineHeight.block / 2}px`,

        paddingLeft: padding.small,
        paddingRight: padding.small,

        fontSize: font.size.small,
      },

      '&admin': {
        button: {
          backgroundColor: theme.color.status.danger,
          color: utils.color(theme.color.status.danger),

          ':hover': {
            backgroundColor: Color(theme.color.status.danger)
              .darken(0.2)
              .string(),
            color: utils.color(
              Color(theme.color.status.danger)
                .darken(0.2)
                .string()
            ),
          },
        },
      },
    }),
    ({ isAdmin }: ApiPropsT) => ({
      '&admin': isAdmin,
    })
  ),
  omitProps(['isAdmin', 'member', 'onAdminRevoke', 'onAdminGrant'])
)(Membership)



// WEBPACK FOOTER //
// ./src/organizations/views/members/Membership.js