// @flow
import React from 'react'
import i18n from 'signavio-i18n'
import { withState, withHandlers, compose } from 'recompose'

import {
  Confirm,
  Divider,
  Disable,
} from '@signavio/effektif-commons/lib/components'
import { Hint } from '@signavio/effektif-commons/lib/components/hints'

import Field from '../../../../packages/fields'

import { userUtils } from '@signavio/effektif-api'
import type { UserT } from '@signavio/effektif-api'

import ReplacementSelect from './ReplacementSelect'
import ReplacementConfirmation from './ReplacementConfirmation'

type PropsT = {
  allowSelectUser?: boolean,
  userToRemove: UserT,
  onCancel: () => void,
}

type InnerPropsT = PropsT & {
  replacement: UserT,
  onReplace: () => void,
}

function ReplacementModal(props: PropsT) {
  const {
    allowSelectUser,
    confirmed,
    replacement,
    userToRemove,
    specifyLater,
    style,
    onConfirmationValidityChange,
    onReplace,
    onCancel,
    onToggleSpecifyLater,
    onReplacementChange,
    allowSpecifyLater,
  } = props

  const isValid = (replacement && confirmed) || specifyLater

  return (
    <Confirm
      {...style}
      danger
      disabled={!isValid}
      confirmText={
        specifyLater ? i18n('Specify replacement later') : i18n('Replace')
      }
      title={i18n('Select a replacement for : __userToRemove__', {
        userToRemove: userUtils.name(userToRemove),
      })}
      onCancel={onCancel}
      onConfirm={onReplace}
    >
      <Hint warning>
        {i18n('Are you sure? This step cannot be undone!')}
      </Hint>

      {allowSpecifyLater && (
        <Field
          regularBoolean
          type={{ name: 'boolean' }}
          label={i18n('I want to do this later')}
          onChange={onToggleSpecifyLater}
          value={specifyLater}
        />
      )}

      <Disable disabled={specifyLater}>
        <p>
          {i18n(
            "To avoid losing work, select a replacement user."
          )}
        </p>

        <ReplacementSelect
          allowSelectUser={allowSelectUser}
          onChange={onReplacementChange}
          value={replacement}
          userToRemove={userToRemove}
        />

        <Divider />

        <ReplacementConfirmation
          user={userToRemove}
          onValidityChange={onConfirmationValidityChange}
          onConfirm={onReplace}
        />
      </Disable>
    </Confirm>
  )
}

export default compose(
  withState('confirmed', 'toggleConfirmed', false),
  withState('replacement', 'setReplacement', null),
  withState('specifyLater', 'toggleSpecifyLater', false),
  withHandlers({
    onReplace: ({ replacement, onReplace }: InnerPropsT) => () =>
      onReplace(replacement),
  }),
  withHandlers({
    onConfirmationValidityChange: ({ toggleConfirmed }) => (isValid: boolean) =>
      toggleConfirmed(isValid),
    onReplacementChange: ({ setReplacement }) => (user: UserT) =>
      setReplacement(user),
    onToggleSpecifyLater: ({ specifyLater, toggleSpecifyLater }) => () =>
      toggleSpecifyLater(!specifyLater),
  })
)(ReplacementModal)



// WEBPACK FOOTER //
// ./src/organizations/views/members/ReplacementModal.js