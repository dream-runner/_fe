import Effektif from 'singleton/Effektif'
import { collections as commonsCollections } from 'commons'
const { BaseCollection } = commonsCollections
import Registration from 'eff-admin/models/Registration'

module.exports = BaseCollection.extend({
  model: Registration,

  url: Effektif.rootUrl('admin/registrations'),
})



// WEBPACK FOOTER //
// ./src/admin/collections/RegistrationCollection.js