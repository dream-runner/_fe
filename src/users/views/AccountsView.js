import React from 'react'
import { map } from 'lodash'
import { withHandlers } from 'recompose'

import { List } from '@signavio/effektif-commons/lib/components'

import Account from './Account'

function Accounts({ service, user, onReAuth, onRemove }) {
  return (
    <List className="accounts">
      {map(service.accounts, (accountId: string) => (
        <Account
          key={accountId}
          accountId={accountId}
          user={user}
          service={service}
          onRemove={onRemove}
          onReAuth={onReAuth}
        />
      ))}
    </List>
  )
}

const enhance = withHandlers({
  onRemove: ({ service, onRemove }) => account => onRemove(service, account),
})

export default enhance(Accounts)



// WEBPACK FOOTER //
// ./src/users/views/AccountsView.js