// @flow
import React from 'react'
import i18n from 'signavio-i18n'
import { lifecycle, withState, compose } from 'recompose'

import Effektif from 'singleton/Effektif'
import Login from 'singleton/Login'

import { Cookies } from '@signavio/effektif-commons/lib/utils'

import store from '../store'
import { login } from '../actions'

import { Loading } from '../components'

function SplashScreen({ stage, user, organization }) {
  if (stage === 'init') {
    return (
      <Loading message={i18n('Initializing application...')} progress={20} />
    )
  }

  if (stage === 'authenticating') {
    return <Loading message={i18n('Authenticating user...')} progress={40} />
  }

  return <Loading progress={20} />
}

const applyCustomStyles = (user, organization) => {
  if (organization.customCSS) {
    import(`../../../../src/less/ci/${organization.customCSS}.less`)
  }

  // notify redux store (new client architecture)
  store.dispatch(login(user.id, Cookies.get('authorization'), organization.key))
}

export default compose(
  withState('stage', 'setStage', 'init'),
  lifecycle({
    componentWillMount() {
      const { onLogin, setStage } = this.props

      const hasAuthToken = Cookies.get('authorization')

      Login.once('login', (_, user, organization) => {
        Login.on('login', () => applyCustomStyles(user, organization))

        applyCustomStyles(user, organization)
        onLogin()
      })

      Login.on('error', () => {
        if (!Login.token()) {
          // user probably tried to login with wrong
          // credentials
          return
        }

        Login.clear()

        onLogin()
      })

      Effektif.loadConfiguration(() => {
        if (hasAuthToken) {
          setStage('authenticating')

          Login.login({
            token: Cookies.get('authorization'),
            organizationKey: Cookies.get('org'),
          })
        } else {
          onLogin()
        }
      })
    },
  })
)(SplashScreen)



// WEBPACK FOOTER //
// ./packages/main/src/containers/SplashScreen.js