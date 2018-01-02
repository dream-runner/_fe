import Backbone from 'backbone-rel-partialput'
import UniqueModel from 'uniquemodel'
import _ from 'underscore'
import Effektif from 'singleton/Effektif'
import { models as commonsModels } from 'commons'
const { BaseModel } = commonsModels
import User from 'users/models/User'
import LicenseCollection from 'eff-admin/collections/LicenseCollection'

module.exports = UniqueModel(
  BaseModel.extend(
    _.merge({}, User.prototype, {
      references: {
        organizations: function() {
          return require('eff-admin/collections/OrganizationCollection')
        },
      },

      embeddings: {
        licenses: LicenseCollection,
      },

      defaults: {
        licenses: [],
      },

      urlRoot: function() {
        return Effektif.rootUrl('admin/users')
      },

      url: function() {
        return this.urlRoot() + '/' + this.id
      },
    })
  ),
  'AdminUser'
)



// WEBPACK FOOTER //
// ./src/admin/models/User.js