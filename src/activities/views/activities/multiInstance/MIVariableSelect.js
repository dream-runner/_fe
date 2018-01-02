// @flow
import React from 'react'
import { compose, withHandlers, withProps } from 'recompose'
import { find, findIndex, filter, map, sortBy } from 'lodash'
import i18n from 'signavio-i18n'
import { Autocomplete, List } from '@signavio/effektif-commons/lib/components'
import {
  GroupQuery,
  QueryContainer,
  UserQuery,
} from '@signavio/effektif-commons/lib/models'
import { BindableQuery } from 'processes/models'

import { withOrganization } from '@signavio/effektif-api'

import {
  getFieldsContext,
  bindingUtils,
  userType,
  isListType,
  isType,
} from '../../../../../packages/fields'
import type { BindingT } from '../../../../../packages/fields'

import MIVariable from './MIVariable'

type UserGroupT = {
  id: string,
}

type ItemT = {
  entity: UserGroupT | BindingT,
  disabled?: boolean,
  type: 'bindable' | 'group' | 'user',
  value: string,
}

type InnerPropsT = {
  onComplete: (item: ItemT) => void,
  onDelete: (variable: BindingT) => void,
  onResult: (result: Array<ItemT>) => Array<ItemT>,
  query: any,
}

type PropsT = {
  onChange: (variables: Array<BindingT>) => void,
  readOnly: boolean,
  value: Array<BindingT>,
} & InnerPropsT

const convertToVariable = (item: ItemT): BindingT => {
  if (item.type === 'bindable') {
    return { ...item.entity }
  }

  if (item.type === 'group') {
    return {
      type: {
        name: 'groupId',
      },
      value: item.entity.id,
    }
  }

  return {
    type: {
      candidateIds: [],
      candidateGroupIds: [],
      name: 'userId',
    },
    value: item.entity.id,
  }
}

const MIVariableSelect = ({
  onComplete,
  onDelete,
  onResult,
  query,
  readOnly,
  value,
}: PropsT) => {
  const sortedValues = sortBy(value, ['expression', 'type.name'])

  return (
    <div>
      {sortedValues.length > 0 && (
        <List>
          {map(sortedValues, (variable: BindingT) => (
            <MIVariable
              key={variable.expression || variable.value}
              onDelete={onDelete}
              readOnly={readOnly}
              variable={variable}
            />
          ))}
        </List>
      )}
      <Autocomplete
        emptyText={i18n('Select fields, users or groups')}
        onComplete={onComplete}
        onResult={onResult}
        placeholder={i18n('Search for fields, users or groups')}
        query={query}
        readOnly={readOnly}
        renderItem={(item: ItemT) => (
          <MIVariable transparent variable={convertToVariable(item)} />
        )}
        resetOnBlur
        resetOnComplete
      />
    </div>
  )
}

const representsUsers = (bindable, dataTypeDescriptors, variables): boolean => {
  const type = bindingUtils.getType(dataTypeDescriptors, variables, bindable)
  return isType(userType, type) || isListType(userType, type)
}

const getBindables = (dataTypeDescriptors, variables): Array<BindingT> =>
  filter(
    bindingUtils.unfoldBindables(dataTypeDescriptors, variables),
    (bindable: BindingT) =>
      representsUsers(bindable, dataTypeDescriptors, variables)
  )

export default compose(
  getFieldsContext,
  withOrganization,
  withProps(({ dataTypeDescriptors, organization, variables }: PropsT) => ({
    query: new QueryContainer(
      new BindableQuery(
        getBindables(dataTypeDescriptors, variables),
        dataTypeDescriptors,
        variables
      ),
      new GroupQuery(organization),
      new UserQuery(organization)
    ),
  })),
  withHandlers({
    onComplete: ({ onChange, value }: PropsT) => (item: ItemT) => {
      const variable = convertToVariable(item)
      if (!variable) {
        return
      }

      onChange([...value, variable])
    },
    onDelete: ({ onChange, value }: PropsT) => (variable: BindingT) => {
      const index = findIndex(value, variable)

      onChange([...value.slice(0, index), ...value.slice(index + 1)])
    },
    onResult: ({ value }: PropsT) => (result: Array<ItemT>) =>
      map(result, (item: ItemT) => {
        item.disabled = !!find(value, convertToVariable(item))
        return item
      }),
  })
)(MIVariableSelect)



// WEBPACK FOOTER //
// ./src/activities/views/activities/multiInstance/MIVariableSelect.js