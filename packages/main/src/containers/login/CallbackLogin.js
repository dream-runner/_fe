import React, { Component } from 'react'
import i18n from 'signavio-i18n'

import ServiceLoginModel from 'services/models/ServiceLogin'
import Login from 'singleton/Login'

import { Cookies } from '@signavio/effektif-commons/lib/utils'
import { Hint } from '@signavio/effektif-commons/lib/components/hints'

let lastLoginId

export default class CallbackLogin extends Component {
  componentWillMount() {
    const { match, history, location } = this.props
    const { id } = match.params

    if (id === lastLoginId) {
      // route has been triggered multiple times, do nothing
      return
    }

    lastLoginId = id

    const login = new ServiceLoginModel()
      .set({
        stateReference: Cookies.get('statereference') || null,
        hostname: window.location.hostname,
        key: id,
        suffix: location.search,
      })
      .once('sync', () => {
        lastLoginId = null

        Login.login({
          token: login.get('token'),
          path: login.get('redirectTo'),
        })

        Login.once('error', () => history.replace('/'))
        Login.once('login', () => history.replace(login.get('redirectTo')))
      })
      .once('error', () => {
        // in case of an error redirect the user to the root path
        // and wait for the login form to appear
        // TODO: there should be some kind of error message
        lastLoginId = null
        history.replace('/')
      })

    Cookies.remove('statereference')

    login.save()
  }

  render() {
    return (
      <Hint view loading>
        {i18n('You are being logged in...')}
      </Hint>
    )
  }
}



// WEBPACK FOOTER //
// ./packages/main/src/containers/login/CallbackLogin.js