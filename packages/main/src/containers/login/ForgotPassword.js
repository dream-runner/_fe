import React from 'react'
import createReactClass from 'create-react-class'
import i18n from 'signavio-i18n'
import { withProps } from 'recompose'

import Router from 'singleton/Router'
import User from 'users/models/User'

import { BaseMixin } from '@signavio/effektif-commons/lib/mixins'
import { Divider } from '@signavio/effektif-commons/lib/components'
import { Hint } from '@signavio/effektif-commons/lib/components/hints'
import { TextButton } from '@signavio/effektif-commons/lib/components/buttons'

import { ChangePassword } from '@signavio/workflow-organizations'

const PasswordReset = createReactClass({
  displayName: 'PasswordReset',

  mixins: [BaseMixin],

  getInitialState() {
    return {
      passwordValid: false,
      resetFailed: false,
      emailUnknown: false,
      resetComplete: false,
      submitting: false,
    }
  },

  render() {
    return (
      <div className="password-reset view">
        <div className="row">
          <div className="col-xs-12 col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2">
            <div className="row">
              <div className="col-lg-12">
                <div className="view-header">
                  <h2 className="page-header">{i18n('Reset your password')}</h2>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-12">
                <div className="view-content">{this.renderContent()}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  },

  renderReset() {
    const { error, submitting, resetFailed } = this.state

    return (
      <div className="reset-password">
        {i18n('Please enter a new password.')}

        <div className="input-group">
          <ChangePassword
            required
            readOnly={submitting}
            onChange={this.handleChange}
          />

          <Divider />

          <TextButton primary block disabled={error} onClick={this.handleReset}>
            {i18n('OK')}
          </TextButton>
        </div>

        {resetFailed && (
          <Hint danger>
            {i18n(
              'Something went wrong resetting your password, please try again.'
            )}
          </Hint>
        )}
      </div>
    )
  },

  handleChange(password, error) {
    this.props.model.set('password', password)
    this.setState({ error })
  },

  renderContent() {
    if (this.state.resetComplete) {
      return i18n(
        'An email to reset your password has been sent. Please follow the instructions given in the email.'
      )
    }

    if (this.props.model.get('code')) {
      return this.renderReset()
    }

    return this.renderRequestForm()
  },

  renderRequestForm() {
    const { model } = this.props
    const { emailUnknown, submitting } = this.state

    return (
      <div className="reset-password">
        {i18n('To reset your password, please fill in your email address.')}

        <div className="input-group">
          <input
            required
            type="email"
            className="form-control"
            id="login-mail"
            readOnly={submitting}
            value={model.get('emailAddress')}
            onChange={ev => model.set('emailAddress', ev.target.value)}
            name="login-mail"
          />

          <span className="input-group-btn">
            <TextButton
              primary
              block
              onClick={this.handleResetRequest}
              disabled={submitting}
            >
              {submitting ? i18n('Please wait...') : i18n('Reset password')}
            </TextButton>
          </span>
        </div>

        {emailUnknown && (
          <Hint warning>{i18n('The email address is unknown.')}</Hint>
        )}
      </div>
    )
  },

  handleResetRequest() {
    this.props.model.once(
      'action:reset',
      () => {
        this.setState({
          emailUnknown: false,
          resetComplete: true,
          submitting: false,
        })
      },
      this
    )

    this.props.model.once(
      'error',
      () => {
        this.setState({
          emailUnknown: true,
          submitting: false,
        })
      },
      this
    )

    this.props.model.action('reset')
  },

  handleReset() {
    this.setState({
      submitting: true,
    })

    this.props.model.once(
      'action:confirm',
      () => {
        this.setState({
          resetFailed: false,
          submitting: false,
        })

        Router.navigate('/', {
          trigger: true,
          replace: true,
        })
      },
      this
    )

    this.props.model.once(
      'error',
      () => {
        this.setState({
          resetFailed: true,
          submitting: false,
        })
      },
      this
    )

    this.props.model.action('confirm')
  },
})

const enhance = withProps(({ match }) => ({
  model: new User({ code: match.params.id }),
}))

export default enhance(PasswordReset)



// WEBPACK FOOTER //
// ./packages/main/src/containers/login/ForgotPassword.js