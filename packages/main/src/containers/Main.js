// @flow
import React from 'react'
import { connect } from 'react-redux'
import { Switch, Redirect, withRouter, Route } from 'react-router'
import { compose, withHandlers, withState } from 'recompose'
import i18n from 'signavio-i18n'

import LoginSingleton from 'singleton/Login'
import Effektif from 'singleton/Effektif'

// import { actions, prependOrg } from '@signavio/effektif-api'

// import { Modal, DocumentTitle } from '@signavio/effektif-commons/lib/components'
// import { Hint } from '@signavio/effektif-commons/lib/components/hints'

import {
  ContextProvider,
  Header,
  PrivateRoute,
  PublicRoute,
  withLinkSupport,
  with40xSupport,
} from '../components'

import { LegacyPage } from './legacy'
import {
  Login,
  Registration,
  ForgotPassword,
  HandoverLogin,
  CallbackLogin,
} from './login'

import SplashScreen from './SplashScreen'
import AuthenticatedPage from './AuthenticatedPage'

function Main({
  location,
  loading,
  switching,
  onLogout,
  onLogin,
  onOrganizationSwitch,
}) {
  if (loading) {
    return <SplashScreen onLogin={onLogin} />
  }

  const user = LoginSingleton.get('user')
  const organization = LoginSingleton.getActiveOrganization()

  return (
    <ContextProvider>
      <div className="application">
        <DocumentTitle />

        <Header
          hideSections={
            switching || // force hideSections while switching so the header re-renders afterwards
            !user ||
            !organization ||
            organization.licenseRequired
          }
          model={user}
          location={location}
          onLogout={onLogout}
          onOrganizationSwitch={onOrganizationSwitch}
        />

        {switching && (
          <Modal>
            <Hint loading>
              {i18n('Please wait while we switch your organization...')}
            </Hint>
          </Modal>
        )}

        <Switch>
          <Route path="/login/handover/:reference" component={HandoverLogin} />
          <PublicRoute path="/login/callback/:id" component={CallbackLogin} />
          <PublicRoute path="/login" component={Login} />

          {Effektif.config().registrationEnabled() && (
            <PublicRoute path="/registration/:id?" component={Registration} />
          )}

          {Effektif.config().hasProvider('password') && (
            <PublicRoute
              path="/password/reset/:id?"
              component={ForgotPassword}
            />
          )}

          <Redirect from="/try" to="/registration" />

          <PrivateRoute global path="/profile" component={LegacyPage} />

          <PrivateRoute
            path="/:organization"
            component={AuthenticatedPage}
            onOrganizationSwitch={onOrganizationSwitch}
          />

          <Redirect to={prependOrg('/tasks')} />
        </Switch>
      </div>
    </ContextProvider>
  )
}

const getOrganizationSwitchUrl = (currentOrganization, nextOrganizationKey) => {
  const currentUrl = window.location.pathname

  if (currentUrl.indexOf(`/${currentOrganization.key}/`) !== 0) {
    return currentUrl
  }

  const base = `/${nextOrganizationKey}`

  // if (nextOrganization.licenseRequired) {
  //   return `${base}/buy`
  // }

  if (currentUrl.indexOf('/case/') >= 0 || currentUrl.indexOf('/cases/') >= 0) {
    return `${base}/cases`
  }

  if (currentUrl.indexOf('/process/') >= 0) {
    return `${base}/processes`
  }

  if (currentUrl.indexOf('/report/') >= 0) {
    return `${base}/analytics`
  }

  if (currentUrl.indexOf('/services/connectors/') >= 0) {
    return `${base}/services/connectors`
  }

  // URL change will trigger org switch
  if (currentOrganization.licenseRequired) {
    return `${base}/tasks`
  }

  return `${base}/${currentUrl.substring(currentOrganization.key.length + 2)}`
}

export default compose(
  withLinkSupport,
  withRouter,
  withState('loading', 'toggleLoading', true),
  withState('switching', 'toggleSwitching', false),
  connect(undefined, { wipe: actions.wipe }),
  withHandlers({
    onLogout: ({ wipe, history }) => () => {
      wipe()
      LoginSingleton.logout()

      history.push('/login')
    },
    onLogin: ({ toggleLoading }) => () => toggleLoading(false),
    onOrganizationSwitch: ({
      wipe,
      toggleSwitching,
      switching,
      history,
    }) => organizationKey => {
      if (switching) {
        return
      }

      const organization = LoginSingleton.getActiveOrganization()

      if (organization.key === organizationKey) {
        return
      }

      toggleSwitching(true)

      const newUrl = getOrganizationSwitchUrl(organization, organizationKey)

      LoginSingleton.once('switch', () => {
        history.push(newUrl)

        toggleSwitching(false)
      })

      wipe()
      LoginSingleton.switchTo(organizationKey)
    },
  }),
  with40xSupport
)(Main)


