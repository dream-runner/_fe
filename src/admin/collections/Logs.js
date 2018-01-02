import { collections as commonsCollections } from 'commons'
const { BaseCollection } = commonsCollections
import Log from 'eff-admin/models/Log'

module.exports = BaseCollection.extend({
  model: Log,
})



// WEBPACK FOOTER //
// ./src/admin/collections/Logs.js