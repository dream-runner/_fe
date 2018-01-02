import React from 'react'
import { withHandlers, compose } from 'recompose'
import i18n from 'signavio-i18n'

import { connect, types } from '@signavio/effektif-api'

import { TextTile } from '@signavio/effektif-commons/lib/components/tiles'
import {
  ContextHelp,
  Remove,
  List,
} from '@signavio/effektif-commons/lib/components'

import OAuthUtils from 'services/utils/OAuthUtils'

function Account({ user, service, fetchAccount, onRemove, onClick }) {
  const account = fetchAccount.value

  if (account.userId !== user.id) {
    return null
  }

  return (
    <TextTile
      icon={service.icon}
      className={account.needsAuthorization && 'account-needs-auth'}
      onClick={onClick}
      toolbar={<Remove onRemove={onRemove} style={{ display: 'block' }} />}
    >
      {account.email}

      {account.needsAuthorization && (
        <ContextHelp error block className="pull-right">
          {i18n(
            'The authorization of this account has expired. Click to reauthorize.'
          )}
        </ContextHelp>
      )}
    </TextTile>
  )
}

export default compose(
  connect(({ accountId }) => ({
    fetchAccount: {
      type: types.ACCOUNT,
      id: accountId,
    },
  })),
  withHandlers({
    onRemove: ({ fetchAccount, onRemove }) => () =>
      onRemove(fetchAccount.value),
    onClick: ({ fetchAccount, service, onReAuth }) => () => {
      if (!fetchAccount.value.needsAuthorization) {
        return
      }

      OAuthUtils.performOAuth(service, fetchAccount.value, onReAuth)
    },
  })
)(Account)



// WEBPACK FOOTER //
// ./src/users/views/Account.js