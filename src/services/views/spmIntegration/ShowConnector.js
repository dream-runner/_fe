// @flow

import React from 'react'
import i18n from 'signavio-i18n'
import { withHandlers, compose } from 'recompose'
import { get, map } from 'lodash'

import { connect, types } from '@signavio/effektif-api'

import { defaultStyle } from '@signavio/effektif-commons/lib/styles'
import { Hint } from '@signavio/effektif-commons/lib/components/hints'
import { TextTile } from '@signavio/effektif-commons/lib/components/tiles'
import { ExpandButton } from '@signavio/effektif-commons/lib/components/buttons'
import {
  withLabel,
  Collapsible,
  List,
  Divider,
} from '@signavio/effektif-commons/lib/components'

import type { ConnectorT, DescriptorT } from '../../types'

import { Descriptor } from '../connectors'

import { handleRequestFulfilled } from './higher-order'
import { DeactivateDescriptor } from './components'

import DictionaryCategorySelect from './DictionaryCategorySelect'

type ApiPropsT = PropsT & {
  connector: ConnectorT,
  onChange: () => void,
  onRemoveCategory: (connectorId: string, descriptorId: string) => void,
}

type PropsT = {
  onDeactivate: (descriptor: DescriptorT) => void,
  onSelect: (categoryId: string) => void,
} & ApiPropsT

const LabeledSelect = withLabel(DictionaryCategorySelect)

function ShowConnector({
  connector,
  style,
  createSyncedDictionaryCategory,
  onDeactivate,
  onSelect,
}: PropsT) {
  const descriptors = get(
    connector,
    'connectorDescriptor.typeDescriptors',
    []
  ).filter((descriptor: DescriptorT) => !descriptor.deleted)

  return (
    <div>
      <LabeledSelect
        label={i18n('Activate a category')}
        connector={connector}
        onSelect={onSelect}
      />

      <Divider title={i18n('Synced categories')} />

      {createSyncedDictionaryCategory.pending && (
        <Hint loading>{i18n('Syncing dictionary category...')}</Hint>
      )}

      {createSyncedDictionaryCategory.rejected && (
        <Hint danger>
          {i18n(
            'Could not sync dictionary category for the following reason: __reason__',
            {
              reason: createSyncedDictionaryCategory.reason,
            }
          )}
        </Hint>
      )}

      <div {...style('body')}>
        {descriptors.length === 0 && (
          <Hint>{i18n("You haven't synchronized any categories yet.")}</Hint>
        )}

        <List>
          {map(descriptors, (descriptor: DescriptorT) => (
            <div key={descriptor.id}>
              <Collapsible
                header={(expanded: boolean) => (
                  <TextTile
                    transparent
                    subtitle={
                      descriptor.dirty &&
                      i18n('This category requires an update')
                    }
                    toolbar={
                      <List direction="horizontal">
                        <DeactivateDescriptor
                          connector={connector}
                          descriptor={descriptor}
                          onDeactivate={onDeactivate}
                        />

                        <ExpandButton light expanded={expanded} />
                      </List>
                    }
                  >
                    {descriptor.name}
                  </TextTile>
                )}
              >
                <div {...style('details')}>
                  <Descriptor {...descriptor} />
                </div>
              </Collapsible>

              <Divider />
            </div>
          ))}
        </List>
      </div>
    </div>
  )
}

const enhance = compose(
  connect(() => ({
    createSyncedDictionaryCategory: {
      type: types.SYNCED_DICTIONARY_CATEGORY,
      method: 'create',
    },
  })),
  withHandlers({
    onDeactivate: ({ connector, onRemoveCategory }: PropsT) => (
      descriptor: DescriptorT
    ) => onRemoveCategory(connector.id, descriptor.id),
    onSelect: ({ connector, createSyncedDictionaryCategory }: ApiPropsT) => (
      categoryId: string
    ) =>
      createSyncedDictionaryCategory({
        connectorId: connector.id,
        categoryId,
      }),
  }),
  handleRequestFulfilled({
    createSyncedDictionaryCategory: ({ onChange }: ApiPropsT) => onChange(),
  }),
  defaultStyle(({ padding }) => ({
    body: {
      marginTop: padding.normal,
    },
    details: {
      padding: padding.normal,
    },
  }))
)

export default enhance(ShowConnector)



// WEBPACK FOOTER //
// ./src/services/views/spmIntegration/ShowConnector.js