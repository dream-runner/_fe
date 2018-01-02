// @flow
import i18n from 'signavio-i18n'
import React from 'react'
import { isEqual } from 'lodash'
import { withHandlers, withState, withProps, compose } from 'recompose'

import {
  connect,
  types,
  fulfillRequestThen,
  withUser,
  getBaseUrl,
} from '@signavio/effektif-api'

import { DocumentTitle } from '@signavio/effektif-commons/lib/components'
import { Hint } from '@signavio/effektif-commons/lib/components/hints'
import { TextButton } from '@signavio/effektif-commons/lib/components/buttons'

import { UserDetails } from '../../../packages/organizations'

import Preferences from './PreferencesView'
import Services from './ServicesView'
import Organizations from './OrganizationsView'

function UserProfile({
  model,
  services,
  updateUser,
  localUser,
  isDirty,
  fetchUser,
  onProfileChange,
  onPreferencesChange,
  onLeave,
  onSave,
}) {
  if (fetchUser.pending && !fetchUser.value) {
    return (
      <Hint loading view>
        {i18n('Loading profile...')}
      </Hint>
    )
  }

  const user = fetchUser.value

  return (
    <div className="view profile">
      <DocumentTitle title={i18n('Your Profile')} />

      <div className="view-header">
        <h2>{i18n('My Profile')}</h2>
      </div>

      <div className="row view-content">
        <div className="col-sm-7">
          <div className="me">
            <h3 className="container-header">{i18n('Me')}</h3>

            <UserDetails
              user={localUser}
              onChange={onProfileChange}
              userEndpoint={`${getBaseUrl()}users/${user.id}`}
            />

            <SaveButton
              model={localUser}
              isDirty={isDirty}
              saving={updateUser.pending}
              onSave={onSave}
            />
          </div>

          <div className="preferences">
            <h3 className="container-header">{i18n('Preferences')}</h3>

            <Preferences user={user} />
          </div>
        </div>
        <div className="col-sm-5">
          <h3 className="container-header">{i18n('Organizations')}</h3>

          <Organizations user={user} onLeave={onLeave} />

          <div className="services">
            <h3>{i18n('Services')}</h3>

            <Services user={user} />
          </div>
        </div>
      </div>
    </div>
  )
}

const SaveButton = ({ model, saving, isDirty, onSave }) => {
  if (isUserInvalid(model)) {
    return (
      <TextButton block primary disabled>
        {getError(model)}
      </TextButton>
    )
  }

  if (saving) {
    return (
      <TextButton block primary disabled>
        <Hint loading inline>
          {i18n('Saving changes...')}
        </Hint>
      </TextButton>
    )
  }

  return (
    <TextButton block disabled={!isDirty} primary={isDirty} onClick={onSave}>
      {isDirty ? i18n('Save changes') : i18n('No changes')}
    </TextButton>
  )
}

const getError = user => {
  if (!(user.firstName || '').trim()) {
    return i18n('Please enter your first name')
  }

  if (!(user.lastName || '').trim()) {
    return i18n('Please enter your last name')
  }

  if (!(user.phone || '').trim()) {
    return i18n('Please enter your phone number')
  }

  if (!user.country) {
    return i18n('Please enter your country')
  }

  return null
}

const isUserInvalid = user =>
  !(user.firstName || '').trim() ||
  !(user.lastName || '').trim() ||
  !(user.phone || '').trim() ||
  !user.country

export default compose(
  withUser,
  connect(({ user }) => ({
    fetchUser: {
      type: types.USER,
      id: user.id,
    },
    updateUser: {
      type: types.USER,
      id: user.id,
      method: 'update',
    },
  })),
  withState('localUser', 'changeLocalUser', ({ fetchUser }) => fetchUser.value),
  fulfillRequestThen({
    fetchUser: ({ fetchUser, changeLocalUser }) =>
      changeLocalUser(fetchUser.value),
    updateUser: ({ fetchUser }) => fetchUser(),
  }),
  withHandlers({
    onProfileChange: ({ localUser, changeLocalUser }) => changes =>
      changeLocalUser({
        ...localUser,
        ...changes,
      }),
    onPreferencesChange: ({ updateUser, fetchUser }) => changes =>
      updateUser({
        ...fetchUser.value,

        preferences: {
          ...fetchUser.value.preferences,
          ...changes,
        },
      }),
    onLeave: () => () => window.location.reload(),
    onSave: ({ localUser, updateUser }) => () => updateUser(localUser),
  }),
  withProps(({ localUser, fetchUser }) => ({
    isDirty: !isEqual(localUser, fetchUser.value),
    localUser: localUser || fetchUser.value,
  }))
)(UserProfile)



// WEBPACK FOOTER //
// ./src/users/views/ProfileView.js