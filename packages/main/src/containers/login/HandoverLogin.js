import React, { Component } from 'react'
import i18n from 'signavio-i18n'

import HandoverLoginModel from 'users/models/HandoverLogin'
import Login from 'singleton/Login'

import { Hint } from '@signavio/effektif-commons/lib/components/hints'

export default class HandoverLogin extends Component {
  componentWillMount() {
    const { match, history } = this.props
    const { reference } = match.params

    Login.once('error', () => history.replace('/'))
    Login.once('login', (token, user, organization, redirectTo) =>
      history.replace(redirectTo)
    )
    Login.handover(new HandoverLoginModel().set({ reference }))
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
// ./packages/main/src/containers/login/HandoverLogin.js