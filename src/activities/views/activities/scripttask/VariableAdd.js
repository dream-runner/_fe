// @flow
import React from 'react'
import createReactClass from 'create-react-class'
import i18n from 'signavio-i18n'
import { map, sortBy } from 'lodash'
import { withHandlers, withState, compose } from 'recompose'

import {
  Icon,
  InputWithButton,
} from '@signavio/effektif-commons/lib/components'
import {
  DropdownSelect,
  Option,
} from '@signavio/effektif-commons/lib/components/forms'

import { Tile, TextTile } from '@signavio/effektif-commons/lib/components/tiles'

import { dataTypeUtils, textType } from '../../../../../packages/fields'

import { VariableUtils } from '../../../../processes/utils'

function VariableAdd({ type, descriptors, onAdd, onTypeSelect }) {
  return (
    <div className="add-new-variable">
      <Tile
        header={
          <DropdownSelect
            toggle={<Icon icon={dataTypeUtils.getIcon(descriptors, type)} />}
            value={type.name}
            onChange={onTypeSelect}
          >
            {map(sortBy(descriptors, 'name'), descriptor => (
              <Option key={descriptor.key} value={descriptor.key}>
                <TextTile transparent icon={descriptor.icon}>
                  {descriptor.name}
                </TextTile>
              </Option>
            ))}
          </DropdownSelect>
        }
      >
        <InputWithButton
          clearOnSubmit
          onSubmit={onAdd}
          border="none"
          buttonLabel={i18n('Create')}
          placeholder={i18n(
            'Select a type and enter a name to create a new variable'
          )}
        />
      </Tile>
    </div>
  )
}

export default compose(
  withState('type', 'setType', textType()),
  withHandlers({
    onTypeSelect: ({ setType }) => name =>
      setType({
        name,
      }),
    onAdd: ({ type, onAdd }) => name =>
      onAdd({
        id: VariableUtils.provideId(),
        name,
        type,
      }),
  })
)(VariableAdd)



// WEBPACK FOOTER //
// ./src/activities/views/activities/scripttask/VariableAdd.js