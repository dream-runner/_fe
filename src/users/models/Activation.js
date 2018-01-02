import UniqueModel from 'uniquemodel'
import Effektif from 'singleton/Effektif'
import { models as commonsModels } from 'commons'
const { BaseModel } = commonsModels
import User from 'users/models/User'
import OrganizationCollection from 'organizations/collections/OrganizationCollection'

/**
 * To complete a registration an activation is needed
 *
 */
module.exports = UniqueModel(
  BaseModel.extend({
    url() {
      if (!this.get('code')) {
        throw new Error('Activation needs an activation link.')
      }
      return (
        Effektif.baseUrl() + '/registrations/' + this.get('code') + '/activate'
      )
    },
  }),
  'Activation'
)



// WEBPACK FOOTER //
// ./src/users/models/Activation.js