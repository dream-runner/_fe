// @flow
import { chain, compact } from 'lodash'

import UniqueModel from 'backbone.uniquemodel'

import type { UserT } from '../types'

export function getUsersFromLocalCache(organization) {
  return chain(UniqueModel.getModelCache('User').instances)
    .filter(
      user =>
        !user.isSystemUser() &&
        (!organization || !!user.get('organizations').get(organization.id))
    )
    .map(user => user.toJSON())
    .value()
}

export function getName(user: UserT) {
  return compact([user.firstName, user.lastName]).join(' ')
}



// WEBPACK FOOTER //
// ./src/users/utils/index.js