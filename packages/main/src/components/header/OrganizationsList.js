// @flow
import React from 'react'
import { sortBy } from 'lodash'

import { List } from '@signavio/effektif-commons/lib/components'

import Item from './Item'

const OrganizationsList = ({
  organizations,
  currentOrganizationId,
  onSelect,
}) => (
  <List>
    {sortBy(organizations, 'name').map(organization => (
      <Item
        key={organization.id}
        className="organization"
        icon="building-o"
        iconSet="fontAwesome"
        active={organization.id === currentOrganizationId}
        onClick={() => onSelect(organization.key)}
      >
        {organization.name}
      </Item>
    ))}
  </List>
)

export default OrganizationsList



// WEBPACK FOOTER //
// ./packages/main/src/components/header/OrganizationsList.js