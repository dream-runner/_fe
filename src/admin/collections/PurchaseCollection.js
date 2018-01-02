import Effektif from 'singleton/Effektif'
import { collections as commonsCollections } from 'commons'
const { BaseCollection } = commonsCollections
import Purchase from 'eff-admin/models/Purchase'

module.exports = BaseCollection.extend({
  url: Effektif.rootUrl('/admin/purchase'),

  model: Purchase,
})



// WEBPACK FOOTER //
// ./src/admin/collections/PurchaseCollection.js