import UniqueModel from 'uniquemodel'

import Effektif from 'singleton/Effektif'

import { models as commonsModels } from 'commons'
const { BaseModel } = commonsModels

import EditableModel from 'forms/models/EditableModel'

import InvitationCollection from '../collections/InvitationCollection'
import LicenseCollecion from '../collections/LicenseCollection'
import LicenseProfileCollection from '../collections/LicenseProfileCollection'
import UserCollection from '../collections/UserCollection'

module.exports = UniqueModel(
  EditableModel.extend({
    urlRoot: function() {
      return Effektif.rootUrl('admin/organizations')
    },

    url: function() {
      return this.urlRoot() + '/' + this.id
    },

    inlineJSON: ['admins', 'systemUsers'],

    references: {
      admins: UserCollection,
      members: UserCollection,
      systemUsers: UserCollection,
      licenseProfiles: LicenseProfileCollection,
    },

    embeddings: {
      licenses: LicenseCollecion,
      invitations: InvitationCollection,
    },

    defaults: {
      admins: [],
      members: [],
      systemUsers: [],
      licenseProfiles: [],
      invitations: [],

      licenses: [],
    },

    fields: {
      name: {
        type: { name: 'text' },
      },
      customCSS: {
        type: { name: 'text' },
      },
      tenantId: {
        type: { name: 'text' },
      },
      useCentralSSO: {
        type: { name: 'boolean' },
      },
    },
  }),
  'AdminOrganization'
)



// WEBPACK FOOTER //
// ./src/admin/models/Organization.js