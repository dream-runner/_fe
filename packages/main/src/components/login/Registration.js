// @flow
import i18n from 'signavio-i18n'
import * as React from 'react'
import { withState, withHandlers, compose } from 'recompose'

import { KeyUtils } from '@signavio/effektif-commons/lib/utils'
import { defaultStyle, utils } from '@signavio/effektif-commons/lib/styles'
import { Modal, List } from '@signavio/effektif-commons/lib/components'
import { Hint } from '@signavio/effektif-commons/lib/components/hints'
import { TextButton } from '@signavio/effektif-commons/lib/components/buttons'

import Field, { emailAddressType } from '@signavio/effektif-fields'

import { applicationName } from '@signavio/effektif-commons'

import RegistrationProgress from './RegistrationProgress'

type PropsT = {
  waiting?: boolean,
  success?: boolean,
  error?: boolean,

  email: string,

  onEmailComplete: (email: string) => void,
  onKeyDown: (event: Event) => void,
  onSubmit: () => void,
}

function Registration({
  success,
  waiting,
  error,
  style,
  email,
  onEmailComplete,
  onKeyDown,
  onSubmit,
}: PropsT) {
  return (
    <div className="view registration">
      <div className="view-header">
        <h2 className="page-header">
          {i18n(
            'Welcome to __applicationName__ - Workflow Management in the Cloud',
            { applicationName }
          )}
        </h2>

        <div className="row">
          <div className="col-xs-12 col-sm-10 col-sm-offset-1 col-md-6 col-md-offset-3">
            <p className="welcome-text">
              {i18n(
                'Register now for your **30-day free trial** and begin automating your business processes. ' +
                  'With just a few clicks you can easily create and implement your custom workflows. ' +
                  '**__applicationName__ makes collaboration simple and fun**.',
                { markdown: true, applicationName }
              )}
            </p>
          </div>
        </div>
      </div>

      <div className="view-content">
        <RegistrationProgress step={1} />

        <div className="row">
          <div className="col-xs-12 col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2">
            {error && (
              <Hint warning>
                {i18n(
                  'One of our users already uses the email address you provided. ' +
                    'Was that you? Then try to [log in](__loginLink__) into your account. ' +
                    "Can't remember your password? [No problem at all!](__pwdresetLink__)",
                  {
                    loginLink: '/login',
                    pwdresetLink: '/password/reset',
                    markdown: true,
                  }
                )}
              </Hint>
            )}

            <List>
              <Field
                noClear
                autoFocus
                type={emailAddressType}
                onComplete={onEmailComplete}
                onKeyDown={onKeyDown}
              />

              <TextButton
                primary
                block
                disabled={email === ''}
                onClick={onSubmit}
              >
                {waiting ? (
                  <Hint loading inline style={style('loading')}>
                    {i18n('We are preparing your workspace...')}
                  </Hint>
                ) : (
                  i18n('Register a new user')
                )}
              </TextButton>
            </List>
          </div>
        </div>
      </div>

      {success && (
        <Modal>
          <Hint>
            {i18n(
              'You successfully registered.\n\n' +
                'A confirmation link has been sent to [__mail__](mailto:__mail__). Please check your email to complete the registration.',
              {
                mail: email,
                markdown: true,
              }
            )}
          </Hint>
        </Modal>
      )}
    </div>
  )
}

type ApiPropsT = PropsT & {
  onRegister: (email: string) => void,
}

export default compose(
  withState('email', 'setEmail', ''),
  withHandlers(() => {
    let enterPressed = false

    return {
      onEmailComplete: ({ setEmail, onRegister }) => (value: ?string) => {
        const email = value || ''

        if (enterPressed && email) {
          onRegister(value)
        }

        setEmail(email)
      },
      onKeyDown: () => (event: Event) => {
        enterPressed = KeyUtils.isEnter(event)
      },
      onSubmit: ({ email, onRegister }: ApiPropsT) => () => {
        if (email) {
          onRegister(email)
        }
      },
    }
  }),
  defaultStyle(({ color }) => ({
    loading: {
      color: utils.color(color.primary.base),

      spinner: {
        borderTopColor: utils.color(color.primary.base),
        borderLeftColor: utils.color(color.primary.base),
      },
    },
  }))
)(Registration)



// WEBPACK FOOTER //
// ./packages/main/src/components/login/Registration.js