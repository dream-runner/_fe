import React from 'react'
import i18n from 'signavio-i18n'
import { filter, map } from 'lodash'
import { withHandlers, compose } from 'recompose'

import { connect, types, fulfillRequestThen } from '@signavio/effektif-api'

import { applicationName } from '@signavio/effektif-commons'

import { Modal } from '@signavio/effektif-commons/lib/components'
import { Hint } from '@signavio/effektif-commons/lib/components/hints'

import Accounts from './AccountsView'

function Services({
  fetchServices,
  removeAccount,
  user,
  onReAuth,
  onRemoveAccount,
}) {
  if (fetchServices.pending) {
    return <Hint loading>{i18n('Loading your accounts...')}</Hint>
  }

  const services = fetchServices.value

  const activeServices = filter(
    services,
    ({ accounts }) => accounts && accounts.length > 0
  )

  const hasServices = activeServices.length > 0

  return (
    <div>
      {removeAccount.pending && (
        <Modal>
          <Hint loading>{i18n('Removing account...')}</Hint>
        </Modal>
      )}

      {removeAccount.rejected && (
        <Hint danger>
          {i18n(
            'Could not remove account for the following reason: __reason__',
            {
              reason: removeAccount.reason,
            }
          )}
        </Hint>
      )}

      {!hasServices && (
        <Hint>
          {i18n(
            "You don't have any services configured in __applicationName__.",
            { applicationName }
          )}
        </Hint>
      )}

      {hasServices &&
        map(activeServices, service => (
          <div className="service" key={service.key}>
            <h4>{service.name}</h4>

            <Accounts
              user={user}
              service={service}
              onReAuth={onReAuth}
              onRemove={onRemoveAccount}
            />
          </div>
        ))}
    </div>
  )
}

export default compose(
  connect(() => ({
    fetchServices: {
      type: types.SERVICES,
    },
    removeAccount: {
      type: types.ACCOUNT,
      method: 'remove',
    },
  })),
  fulfillRequestThen({
    removeAccount: ({ fetchServices }) => fetchServices(),
  }),
  withHandlers({
    onReAuth: ({ fetchServices }) => () => fetchServices(),
    onRemoveAccount: ({ removeAccount }) => (service, account) =>
      removeAccount({
        serviceKey: service.key,
        accountId: account.id,
      }),
  })
)(Services)



// WEBPACK FOOTER //
// ./src/users/views/ServicesView.js