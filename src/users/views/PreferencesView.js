// @flow
import React from 'react'
import { withHandlers, withState, compose } from 'recompose'
import i18n, { setLocale } from 'signavio-i18n'

import { connect, types } from '@signavio/effektif-api'

import { Modal, List } from '@signavio/effektif-commons/lib/components'
import { Hint } from '@signavio/effektif-commons/lib/components/hints'

import { Field, booleanType } from '../../../packages/fields'
import { TimeZoneSelect, LanguageSelect } from '../../../packages/organizations'

function UserPreferences({
  fetchPreferences,
  changingLanguage,
  onLanguageChange,
  onTimeZoneChange,
  onNotificationsChange,
  onBatchNotificationsChange,
}) {
  if (fetchPreferences.pending) {
    return <Hint loading>{i18n('Loading preferences')}</Hint>
  }

  const preferences = fetchPreferences.value

  return (
    <div>
      <List>
        <LanguageSelect
          label={i18n('Language')}
          value={preferences.language}
          onChange={onLanguageChange}
        />

        <TimeZoneSelect
          label={i18n('Time zone')}
          value={preferences.timeZone}
          onChange={onTimeZoneChange}
        />

        <div style={{ paddingLeft: '40%' }}>
          <Field
            regularBoolean
            type={booleanType}
            value={preferences.notifications}
            onChange={onNotificationsChange}
            label={i18n('Receive notifications via email')}
          />
        </div>

        <div style={{ paddingLeft: '40%' }}>
          <Field
            regularBoolean
            type={booleanType}
            value={preferences.batchNotifications}
            onChange={onBatchNotificationsChange}
            label={i18n('Receive a daily digest via email')}
          />
        </div>
      </List>

      {changingLanguage && (
        <Modal title={i18n('Switching the language')}>
          <Hint loading>
            {i18n('Please wait while the new language settings are applied.')}
          </Hint>
        </Modal>
      )}
    </div>
  )
}

export default compose(
  connect(({ user }) => ({
    fetchPreferences: {
      type: types.USER_PREFERENCE,
      id: user.id,
    },
    updatePreferences: {
      type: types.USER_PREFERENCE,
      id: user.id,
      method: 'update',
    },
  })),
  withState('changingLanguage', 'toggleChangingLanguage', false),
  withHandlers({
    onLanguageChange: ({ toggleChangingLanguage, updatePreferences }) => (
      language: string
    ) => {
      toggleChangingLanguage(true)

      setLocale(language).then(() => toggleChangingLanguage(false))

      updatePreferences({ language })
    },
    onTimeZoneChange: ({ updatePreferences }) => (timeZone: string) =>
      updatePreferences({ timeZone }),
    onNotificationsChange: ({ updatePreferences }) => (
      notifications: boolean
    ) => updatePreferences({ notifications }),
    onBatchNotificationsChange: ({ updatePreferences }) => (
      batchNotifications: boolean
    ) => updatePreferences({ batchNotifications }),
  })
)(UserPreferences)



// WEBPACK FOOTER //
// ./src/users/views/PreferencesView.js