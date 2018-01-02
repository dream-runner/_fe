// @flow
import React from 'react'
import i18n from 'signavio-i18n'
import { compose, withHandlers, withState } from 'recompose'
import { get } from 'lodash'

import { List } from '@signavio/effektif-commons/lib/components'
import { Hint } from '@signavio/effektif-commons/lib/components/hints'
import { TextButton } from '@signavio/effektif-commons/lib/components/buttons'
import { defaultStyle } from '@signavio/effektif-commons/lib/styles'

import type { PromiseT, DictionaryConnectorT } from '@signavio/effektif-api'
import {
  connect,
  types,
  fulfillRequestThen,
  requestRejectedThen,
} from '@signavio/effektif-api'

import { LabeledField, userType } from '../../../../packages/fields'

import ShowConnector from './ShowConnector'
import AddConnector from './AddConnector'

type PropsT = {
  onCreateConnector: (userId: string) => void,
  fetchDictionaryConnectors: PromiseT<DictionaryConnectorT>,
  createDictionaryConnector: (body: { userId: string }) => void,
  reloadDictionaryConnector: (body: { connectorId: string }) => void,
  updateDictionaryConnector: (body: { userId: string }) => void,
  onUpdateCategory: () => void,
  onUnsyncCategory: (connectorId: string, descriptorId: string) => void,
  onReload: () => void,
  onUserSelectionChange: (id?: string) => void,
  selectedUserId: ?string,
}

function SpmIntegration({
  style,
  fetchDictionaryConnectors,
  createDictionaryConnector,
  reloadDictionaryConnector,
  updateDictionaryConnector,
  onCreateConnector,
  onUpdateCategory,
  onUnsyncCategory,
  onReload,
  onUserSelectionChange,
  selectedUserId,
}: PropsT) {
  if (fetchDictionaryConnectors.pending) {
    return <Hint loading>{i18n('Loading Dictionary categories...')} </Hint>
  }

  if (fetchDictionaryConnectors.rejected) {
    return (
      <Hint danger>
        {i18n(
          'Could not load Dictionary integration for the following reason: __reason__',
          {
            reason: fetchDictionaryConnectors.reason,
          }
        )}
      </Hint>
    )
  }

  if (createDictionaryConnector.pending) {
    return (
      <Hint loading>
        {i18n('Setting up the integration with the Dictionary...')}
      </Hint>
    )
  }

  if (createDictionaryConnector.rejected) {
    return (
      <Hint danger>
        {i18n(
          'Could not set up the Dictionary integration for the following reason: __reason__',
          {
            reason: createDictionaryConnector.reason,
          }
        )}
      </Hint>
    )
  }

  if (reloadDictionaryConnector.pending) {
    return <Hint loading>{i18n('Reloading Dictionary integration...')}</Hint>
  }

  if (reloadDictionaryConnector.rejected) {
    return (
      <Hint danger>
        {i18n(
          'Could not reload the Dictionary integration for the following reason: __reason__',
          {
            reason: reloadDictionaryConnector.reason,
          }
        )}
      </Hint>
    )
  }

  if (fetchDictionaryConnectors.value.length === 0) {
    return <AddConnector onUserSelect={onCreateConnector} />
  }

  const connector = fetchDictionaryConnectors.value[0]

  return (
    <div>
      <div {...style('header')}>
        <div {...style('description')}>
          <Hint inline>{connector.description}</Hint>
        </div>
      </div>

      {connector.hasDirtyItems && (
        <Hint warning>
          {i18n(
            'This connector is out of sync with the Process Manager Dictionary. Please reload it.'
          )}
        </Hint>
      )}

      <List>
        <div {...style('toolbar')}>
          <TextButton
            light
            primary={connector.hasDirtyItems}
            icon="reload"
            onClick={onReload}
          >
            {i18n('Reload integration')}
          </TextButton>
        </div>

        {!selectedUserId && (
          <Hint warning>
            {i18n(
              'The integration user account cannot be empty. Please select an account below. If no user account is provided we will use the last one selected.'
            )}
          </Hint>
        )}

        {updateDictionaryConnector.rejected && (
          <Hint danger>
            {i18n(
              'Could not update Dictionary integration for the following reason: __reason__',
              {
                reason: updateDictionaryConnector.reason,
              }
            )}
          </Hint>
        )}

        <LabeledField
          label={i18n('The integration uses this user account')}
          type={userType}
          value={selectedUserId}
          onChange={onUserSelectionChange}
        />

        <ShowConnector
          connector={connector}
          onChange={onUpdateCategory}
          onRemoveCategory={onUnsyncCategory}
        />
      </List>
    </div>
  )
}

const enhance = compose(
  connect(() => ({
    fetchDictionaryConnectors: {
      type: types.DICTIONARY_CONNECTORS,
    },
    createDictionaryConnector: {
      type: types.DICTIONARY_CONNECTOR,
      method: 'create',
    },
    updateDictionaryConnector: {
      type: types.DICTIONARY_CONNECTOR,
      method: 'update',
    },
    reloadDictionaryConnector: {
      type: types.DICTIONARY_CONNECTOR_RELOAD,
      method: 'create',
    },
    unsyncCategory: {
      type: types.SYNCED_DICTIONARY_CATEGORY,
      method: 'remove',
    },
    fetchDataTypeDescriptors: {
      type: types.DATA_TYPE_DESCRIPTORS,
      lazy: true,
    },
  })),
  withState(
    'selectedUserId',
    'setSelectedUserId',
    ({ fetchDictionaryConnectors }: PropsT) => {
      if (get(fetchDictionaryConnectors.value, 'length') > 0) {
        return fetchDictionaryConnectors.value[0].userId
      }
    }
  ),
  fulfillRequestThen({
    createDictionaryConnector: ({ fetchDictionaryConnectors }: PropsT) =>
      fetchDictionaryConnectors(),
    reloadDictionaryConnector: ({ fetchDictionaryConnectors }: PropsT) =>
      fetchDictionaryConnectors(),
    fetchDictionaryConnectors: ({
      fetchDictionaryConnectors,
      setSelectedUserId,
    }: PropsT) => {
      if (fetchDictionaryConnectors.value.length > 0) {
        setSelectedUserId(fetchDictionaryConnectors.value[0].userId)
      }
    },
    unsyncCategory: ({
      fetchDataTypeDescriptors,
      fetchDictionaryConnectors,
    }) => {
      fetchDataTypeDescriptors()
      fetchDictionaryConnectors()
    },
  }),
  requestRejectedThen({
    updateDictionaryConnector: ({ setSelectedUserId }) =>
      setSelectedUserId(null),
  }),
  withHandlers({
    onCreateConnector: ({ createDictionaryConnector }: PropsT) => (
      userId: string
    ) => createDictionaryConnector({ userId }),
    onUpdateCategory: ({ fetchDictionaryConnectors }: PropsT) => () => {
      fetchDictionaryConnectors()
    },
    onUnsyncCategory: ({ unsyncCategory }: PropsT) => (
      connectorId: string,
      descriptorId: string
    ) => unsyncCategory({ connectorId, descriptorId }),
    onReload: ({
      reloadDictionaryConnector,
      fetchDictionaryConnectors,
    }: PropsT) => () => {
      const connector = fetchDictionaryConnectors.value[0]

      reloadDictionaryConnector({ connectorId: connector.id })
    },
    onUserSelectionChange: ({
      setSelectedUserId,
      updateDictionaryConnector,
      fetchDictionaryConnectors,
    }: PropsT) => (userId: ?string) => {
      setSelectedUserId(userId)
      if (userId) {
        const connector = fetchDictionaryConnectors.value[0]

        updateDictionaryConnector({ connectorId: connector.id, userId })
      }
    },
  }),
  defaultStyle(({ padding }) => ({
    header: {
      marginBottom: padding.large,
    },
    body: {
      marginTop: padding.normal,
    },
    toolbar: {
      textAlign: 'right',

      marginLeft: '40%',
      marginBottom: padding.normal,
    },
    description: {
      marginTop: padding.normal,
    },
  }))
)

export default enhance(SpmIntegration)



// WEBPACK FOOTER //
// ./src/services/views/spmIntegration/SPMIntegration.js