import LicenseType from 'eff-admin/models/LicenseType'
import { collections as commonsCollections } from 'commons'
const { BaseCollection } = commonsCollections

module.exports = BaseCollection.extend({
  model: LicenseType,
})



// WEBPACK FOOTER //
// ./src/admin/collections/LicenseTypeCollection.js