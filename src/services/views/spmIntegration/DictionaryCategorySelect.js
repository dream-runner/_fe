// @flow

import React from 'react'
import i18n from 'signavio-i18n'
import { debounce, map } from 'lodash'
import { compose, withHandlers, withState } from 'recompose'

import {
  DropdownSelect,
  Option,
} from '@signavio/effektif-commons/lib/components'
import { Hint } from '@signavio/effektif-commons/lib/components/hints'

import { connect, types } from '@signavio/effektif-api'

import type { ConnectorT, DescriptorT } from '../../types'

const isSynced = (
  typeDescriptors: Array<DescriptorT> = [],
  categoryId: string
) =>
  typeDescriptors.find(
    (typeDescriptor: DescriptorT) => typeDescriptor.key === categoryId
  )

type PropsT = {
  connector: ConnectorT,
}

function DictionaryCategorySelect({
  fetchDictionaryCategories,
  connector,
  onSearch,
  onSelect,
}: PropsT) {
  return (
    <DropdownSelect
      placeholder={i18n('Select a category')}
      onChange={onSelect}
      onSearch={onSearch}
    >
      {fetchDictionaryCategories.pending && (
        <Hint loading>{i18n('Loading dictionary categories...')}</Hint>
      )}

      {fetchDictionaryCategories.rejected && (
        <Hint danger>
          {i18n(
            'Could not load categories for the following reason: __reason__',
            {
              reason: fetchDictionaryCategories.reason,
            }
          )}
        </Hint>
      )}

      {map(
        fetchDictionaryCategories.value,
        ({ id, name }: { id: string, name: string }) => (
          <Option
            key={id}
            name={name}
            value={id}
            disabled={isSynced(
              connector.connectorDescriptor.typeDescriptors,
              id
            )}
          />
        )
      )}
    </DropdownSelect>
  )
}

type ApiPropsT = PropsT & {
  searchTerm: string,
  setSearchTerm: (term: string) => void,
}

const enhance = compose(
  withState('searchTerm', 'setSearchTerm', ''),
  connect(({ connector, searchTerm }: ApiPropsT) => ({
    fetchDictionaryCategories: {
      type: types.DICTIONARY_CATEGORIES,
      query: {
        id: connector.id,
        searchTerm,
      },
    },
  })),
  withHandlers({
    onSearch: ({ setSearchTerm }) => debounce(setSearchTerm, 300),
  })
)

export default enhance(DictionaryCategorySelect)



// WEBPACK FOOTER //
// ./src/services/views/spmIntegration/DictionaryCategorySelect.js