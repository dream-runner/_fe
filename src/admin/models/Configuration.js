import Effektif from 'singleton/Effektif'
import UserCollection from 'eff-admin/collections/UserCollection'
import EditableModel from 'forms/models/EditableModel'
import About from 'container/models/About'

module.exports = EditableModel.extend({
  urlRoot: Effektif.rootUrl('admin/systemconfiguration'),

  embeddings: {
    about: About,

    systemAdmins: UserCollection,
    systemUsers: UserCollection,
  },

  defaults: {
    about: {},

    systemAdmins: [],
    systemUsers: [],
  },

  fields: {
    serverName: {
      type: { name: 'text' },
    },
    dbName: {
      type: { name: 'text' },
    },
    mailDomain: {
      type: { name: 'text' },
    },
    receiverMailDomain: {
      type: { name: 'text' },
    },
    baseUrl: {
      type: { name: 'link' },
    },
    baseUrlSignavioApproval: {
      type: { name: 'link' },
    },
    mode: {
      type: { name: 'text' },
    },
    registrationEnabled: {
      type: { name: 'boolean' },
    },
    authenticationProviders: {
      type: { name: 'list', elementType: { name: 'text' } },
    },
  },
})



// WEBPACK FOOTER //
// ./src/admin/models/Configuration.js