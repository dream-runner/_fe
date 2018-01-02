import React from 'react'
import { Link } from 'react-router-dom'

import { compose, withPropsOnChange } from 'recompose'

import { withUser, withOrganization, prependOrg } from '@signavio/effektif-api'

import { defaultStyle, utils } from '@signavio/effektif-commons/lib/styles'
import { Header, Icon } from '@signavio/effektif-commons/lib/components'

import Login from 'singleton/Login'
import Effektif from 'singleton/Effektif'

import MainMenu from './header/Menu'
import UserMenu from './header/UserMenu'
import DebugWarning from './header/DebugWarning'
import Logo from './Logo'

function WorkflowHeader(props) {
  const {
    hideSections,
    location,
    style,
    about,
    user,
    organization,
    organizations,
    onLogout,
    onOrganizationSwitch,
  } = props

  return (
    <div {...style}>
      <div className="container" {...style('container')}>
        <Header
          app="workflowAccelerator"
          logo={
            <Link className="hidden-xs" to={prependOrg('/tasks')}>
              <div {...style('logo')}>
                <Logo kind="header" />
              </div>
            </Link>
          }
          metaMenu={
            user && (
              <Link to={prependOrg('/search')}>
                <Icon icon="search" style={style('search')} />
              </Link>
            )
          }
          userMenu={
            user && (
              <UserMenu
                about={about}
                user={user}
                organization={organization}
                organizations={organizations}
                onLogout={onLogout}
                onSwitchOrganization={onOrganizationSwitch}
              />
            )
          }
        >
          {!hideSections && <MainMenu location={location} />}

          {Effektif.isDebug() && <DebugWarning />}
        </Header>
      </div>
    </div>
  )
}

export default compose(
  withOrganization,
  withUser,
  withPropsOnChange(['user'], () => {
    const about = Effektif.about()

    return {
      organizations: Login.organizations(),
      about: about && !about.unavailable() && about.toJSON(),
    }
  }),
  defaultStyle(({ color, padding }) => {
    const backgroundColor = color.header.primary || color.primary.base

    return {
      ...utils.media.print({
        display: 'none',
      }),

      backgroundColor,

      container: {
        marginBottom: 0,

        ...utils.media.xs({
          marginLeft: -padding.normal,
          marginRight: -padding.normal,
        }),
      },

      logo: {
        width: 102,
        height: 56,
        marginLeft: padding.normal,
        marginRight: padding.normal,
      },

      search: {
        color: utils.color(backgroundColor),
      },
    }
  })
)(WorkflowHeader)



// WEBPACK FOOTER //
// ./packages/main/src/components/Header.js