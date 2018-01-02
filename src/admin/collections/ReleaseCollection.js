import Effektif from 'singleton/Effektif'
import { collections as commonsCollections } from 'commons'
const { BaseCollection } = commonsCollections
import Release from '../models/Release'

module.exports = BaseCollection.extend({
  model: Release,

  url: Effektif.rootUrl('admin/releasenotes'),
})



// WEBPACK FOOTER //
// ./src/admin/collections/ReleaseCollection.js