// @flow
import { reduce } from 'lodash'

import type { ProcessRightsT } from '../types'

import getAccessDefinition from './getAccessDefinition'

export default function getInitialRights(users) {
  return reduce(
    getAccessDefinition().order,
    (access, right: ProcessRightsT) => ({
      ...access,

      [right]: users.map(user => ({
        id: user.id,
        type: 'user',
      })),
    }),
    {}
  )
}



// WEBPACK FOOTER //
// ./src/processes/utils/getInitialRights.js