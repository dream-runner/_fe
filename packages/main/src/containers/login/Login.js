import React, { Component } from 'react'
import i18n from 'signavio-i18n'

import Effektif from 'singleton/Effektif'
import Login from 'singleton/Login'

import { Login as LoginView } from '../../components'

export default class LoginContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      message: null,
    }
  }

  render() {
    return (
      <LoginView
        authenticationProviders={Effektif.config().get(
          'authenticationProviders'
        )}
        registrationEnabled={Effektif.config().registrationEnabled()}
        message={this.state.message}
        onLogin={crendentials => this.performLogin(crendentials)}
        onServiceLogin={service => this.performServiceLogin(service)}
        SSOProvider={window.SSOProvider}
      />
    )
  }

  performServiceLogin(service) {
    Login.once('error', () => {
      this.setState({
        message: i18n('The authentication provider is not available.'),
      })
    })
    const { location } = this.props
    const { from: { pathname } } = location.state || {
      from: { pathname: '/tasks' },
    }

    Login.service(service, pathname)
  }

  performLogin(crendentials) {
    Login.set(crendentials)

    Login.once('login', this.handleLogin, this)
    Login.once('error', this.handleError, this)

    Login.login()
  }

  handleLogin() {
    const { history, location } = this.props

    const { from: { pathname } } = location.state || {
      from: { pathname: '/tasks' },
    }

    Login.off('error', this.handleError, this)

    history.push(pathname)
  }

  handleError = () => {
    Login.off('login', this.handleLogin, this)

    this.setState({
      message: i18n('Email or password was incorrect, please try again.'),
    })
  }
}



// WEBPACK FOOTER //
// ./packages/main/src/containers/login/Login.js