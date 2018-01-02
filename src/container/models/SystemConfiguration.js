import UniqueModel from 'uniquemodel'
import _ from 'lodash'
import { models as commonsModels } from 'commons'
const { BaseModel } = commonsModels

import LicenseTypeCollection from 'eff-admin/collections/LicenseTypeCollection'

module.exports = UniqueModel(
  BaseModel.extend(
    {
      embeddings: {
        licenseTypes: LicenseTypeCollection,
      },

      defaults: {
        licenseTypes: [],
      },

      url: function() {
        return require('singleton/Effektif').baseUrl() + '/systemconfiguration'
      },

      registrationEnabled: function() {
        return this.get('registrationEnabled')
      },

      isOnPremise: function() {
        return window.EFFEKTIF_MODE === 'onpremise'
      },

      hasProvider: function(name) {
        var providers = this.get('authenticationProviders')
        if (_.isArray(providers)) {
          return providers.indexOf(name) !== -1
        }
        return false
      },

      getLicenseType: function(type) {
        return this.get('licenseTypes').find(t => {
          return t.id === type
        })
      },

      getLicenseTypes: function() {
        return this.get('licenseTypes')
      },

      getMailDomain: function() {
        return this.get('mailDomain')
      },

      getRecipientMailDomain: function() {
        return this.get('recipientMailDomain')
      },
    },
    'SystemConfiguration'
  )
)



// WEBPACK FOOTER //
// ./src/container/models/SystemConfiguration.js