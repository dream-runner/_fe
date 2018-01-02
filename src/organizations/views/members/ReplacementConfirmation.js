// @flow
import React from 'react'
import i18n from 'signavio-i18n'
import { withHandlers, compose } from 'recompose'

import {
  semicontrollable,
  triggerOnCompleteOnEnter,
} from '@signavio/react-forms'

import { Text } from '@signavio/effektif-commons/lib/components/forms'

import { userUtils } from '@signavio/effektif-api'
import type { UserT } from '@signavio/effektif-api'
import { Field, textType } from '../../../../packages/fields'

type PropsT = {
  user: UserT,

  onChange: (value: string) => void,
  onComplete: () => void,
}

const Input = compose(semicontrollable(), triggerOnCompleteOnEnter)(Text)

function ReplacementConfirmation({ user, onChange, onComplete }: PropsT) {
  return (
    <div>
      <p>
        {i18n(
          'If you are sure you want to replace this user, type __userName__ to confirm:',
          {
            userName: <code>{userUtils.name(user)}</code>,
          }
        )}
      </p>

      <Input
        autoFocus
        type="text"
        placeholder={i18n(
          'Please confirm by typing the name of the user you want to replace'
        )}
        onChange={onChange}
        onComplete={onComplete}
      />
    </div>
  )
}

export default compose(
  withHandlers(() => {
    let isValid = false

    return {
      onChange: ({ user, onValidityChange }) => (value: string) => {
        const stillValid = value === userUtils.name(user)

        if (isValid !== stillValid) {
          onValidityChange(stillValid)
        }
        isValid = stillValid
      },
      onComplete: ({ onConfirm }) => () => {
        if (!isValid) {
          return
        }

        onConfirm()
      },
    }
  })
)(ReplacementConfirmation)



// WEBPACK FOOTER //
// ./src/organizations/views/members/ReplacementConfirmation.js