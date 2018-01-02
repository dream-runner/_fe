import Effektif from 'singleton/Effektif'
import { collections as commonsCollections } from 'commons'
const { BaseCollection } = commonsCollections
import LicenseProfile from 'eff-admin/models/LicenseProfile'

module.exports = BaseCollection.extend({
  urlRoot: function() {
    return Effektif.rootUrl('/admin/licenseProfiles')
  },

  model: LicenseProfile,
})



// WEBPACK FOOTER //
// ./src/admin/collections/LicenseProfileCollection.js