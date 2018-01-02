import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import i18n from 'signavio-i18n'
import _ from 'lodash'

import Router from 'singleton/Router'

import ServiceLogin from 'services/models/ServiceLogin'

import { applicationName } from '@signavio/effektif-commons'
import {
  defaultStyle,
  padding,
  font,
  utils,
} from '@signavio/effektif-commons/lib/styles'
import { Divider } from '@signavio/effektif-commons/lib/components'
import { Hint } from '@signavio/effektif-commons/lib/components/hints'
import {
  IconButton,
  TextButton,
} from '@signavio/effektif-commons/lib/components/buttons'

class Login extends Component {
  static propTypes = {
    onLogin: PropTypes.func.isRequired,
    registrationEnabled: PropTypes.bool.isRequired,
    authenticationProviders: PropTypes.arrayOf(PropTypes.string).isRequired,

    message: PropTypes.string,

    onServiceLogin: PropTypes.func,
  }

  constructor() {
    super(...arguments)

    this.state = {
      submitting: false,

      emailAddress: '',
      password: '',

      rememberLogin: false,
    }
  }

  componentDidMount() {
    if (this.props.SSOProvider) {
      this.performSignavioLogin()
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.message !== this.props.message) {
      this.setState({
        submitting: false,
      })
    }
  }

  render() {
    let { style } = this.props

    return (
      <div className="login view">
        <div className="row">
          <div className="col-xs-12 col-sm-6 col-sm-offset-3 col-md-4 col-md-offset-4">
            <iframe id="invisible-login-target" name="invisible-login-target" />

            <div className="view-header">
              <h2 className="page-header" {...style('header')}>
                {applicationName}
              </h2>
            </div>

            <div className="view-content">
              {this.renderWarning()}

              <div {...style('panel')}>
                {this.renderForm()}
                {this.renderSignavioLogin()}
                {this.renderRegistration()}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  renderWarning() {
    let { message } = this.props

    if (!message) {
      return
    }

    return <Hint warning>{message}</Hint>
  }

  renderDivider() {
    let { style } = this.props

    return <Divider title={i18n('Or')} style={style('divider')} />
  }

  renderSignavioLogin() {
    let { authenticationProviders } = this.props

    if (
      !_.includes(authenticationProviders, 'signavio') ||
      !_.includes(authenticationProviders, 'password')
    ) {
      return
    }

    let { style } = this.props

    return (
      <div>
        {this.renderDivider()}

        {this.renderSignavioButton()}
      </div>
    )
  }

  renderRegistration() {
    let { registrationEnabled } = this.props

    if (!registrationEnabled) {
      return
    }

    return (
      <div>
        {this.renderDivider()}

        <Link to="/registration">
          <TextButton light block style={{ textAlign: 'center' }}>
            {i18n('Register a new account')}
          </TextButton>
        </Link>
      </div>
    )
  }

  renderEmail() {
    let { style } = this.props
    let { emailAddress } = this.state

    return (
      <input
        {...style('input')}
        ref="emailAddress"
        type="email"
        required
        value={emailAddress}
        onChange={ev => this.setState({ emailAddress: ev.target.value })}
        id="login-mail"
        readOnly={this.state.submitting}
        placeholder={i18n('E-Mail address')}
        autoFocus
      />
    )
  }

  renderPassword() {
    let { style } = this.props
    let { password } = this.state

    return (
      <input
        ref="password"
        type="password"
        {...style('input')}
        required
        className="form-control"
        readOnly={this.state.submitting}
        value={password}
        onChange={ev => this.setState({ password: ev.target.value })}
        id="login-password"
        placeholder={i18n('Password')}
      />
    )
  }

  renderRemeberMe() {
    let { rememberLogin } = this.state
    let { style } = this.props

    return (
      <label {...style('remember')}>
        <input
          type="checkbox"
          ref="rememberLogin"
          readOnly={this.state.submitting}
          value={rememberLogin}
          onChange={ev => this.setState({ rememberLogin: ev.target.checked })}
        />

        {i18n('Remember me')}
      </label>
    )
  }

  renderForm() {
    let { style, authenticationProviders } = this.props

    if (_.includes(authenticationProviders, 'password')) {
      return (
        <form
          {...style('form')}
          target="invisible-login-target"
          onSubmit={::this.performLogin}
        >
          {this.renderEmail()}
          {this.renderPassword()}
          {this.renderRemeberMe()}

          <TextButton
            primary
            block
            type="submit"
            disabled={this.state.submitting}
          >
            {this.renderButtonText()}
          </TextButton>

          {this.renderReset()}
        </form>
      )
    }

    if (_.includes(authenticationProviders, 'signavio')) {
      return (
        <div>
          <Hint>
            {i18n(
              'You can use your Signavio Process Manager account to login to __applicationName__. Simply click below, ' +
                'login in to your Process Manager account and you will be redirected to __applicationName__.',
              { applicationName }
            )}
          </Hint>

          {this.renderSignavioButton()}
        </div>
      )
    }
  }

  renderSignavioButton() {
    let { style } = this.props

    return (
      <IconButton
        block
        icon="signavio"
        onClick={::this.performSignavioLogin}
        style={style('signavio')}
      >
        {i18n('Log in with Process Manager account')}
      </IconButton>
    )
  }

  renderReset() {
    let { authenticationProviders } = this.props

    if (!_.includes(authenticationProviders, 'password')) {
      return
    }

    let { style } = this.props

    return (
      <div {...style('reset')}>
        <Link to="/password/reset">{i18n('Reset password')}</Link>
      </div>
    )
  }

  renderButtonText() {
    if (!this.state.submitting) {
      return i18n('Log in')
    }

    let { style } = this.props

    return (
      <Hint loading inline style={style('loading')}>
        {i18n('Logging you in...')}
      </Hint>
    )
  }

  performLogin() {
    // make sure to set the model's email and password fields using the values of the form controls
    // as the browser's autofill may have changed them without triggering change events
    let {
      emailAddress: { value: emailAddress },
      password: { value: password },
      rememberLogin: { checked: rememberLogin },
    } = this.refs

    this.props.onLogin({ emailAddress, password, rememberLogin })

    // do not intercept form submit so that browsers save the login credentials
    // form's action is about:blank and the target an invisible iframe, so not much is
    // about to happen
    return true
  }

  performSignavioLogin() {
    this.props.onServiceLogin(new ServiceLogin({ key: 'signavio' }))
  }
}

const styled = defaultStyle(theme => ({
  header: {
    textAlign: 'center',
  },

  panel: {
    padding: padding.normal,

    ...utils.border('1px', 'solid', theme.color.mono.light),
    ...utils.boxShadow(),
  },

  signavio: {
    backgroundColor: theme.color.mono.dark,
    color: utils.color(theme.color.mono.dark),

    ':hover': {
      backgroundColor: theme.color.mono.middle,
    },

    icon: {
      color: 'white',
    },
  },

  remember: {
    fontSize: font.size.form,
    display: 'block',
    textAlign: 'right',

    marginBottom: padding.normal,
  },

  input: {
    borderTop: '0px solid',
    borderLeft: '0px solid',
    borderRight: '0px solid',

    marginBottom: padding.normal,

    width: '100%',
  },

  loading: {
    color: utils.color(theme.color.primary.base),

    spinner: {
      borderTopColor: utils.color(theme.color.primary.base),
      borderLeftColor: utils.color(theme.color.primary.base),
    },
  },

  form: {
    backgroundColor: 'transparent',
  },

  divider: {
    textAlign: 'center',

    marginTop: padding.normal,
    marginBottom: padding.normal,

    title: {
      marginLeft: null,
    },
  },

  reset: {
    fontSize: font.size.small,
    textAlign: 'center',
    padding: padding.xsmall,
  },
}))

export default styled(Login)



// WEBPACK FOOTER //
// ./packages/main/src/components/login/Login.js