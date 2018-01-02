import { collections as commonsCollections } from 'commons'
const { BaseCollection } = commonsCollections
import File from '../models/File'

module.exports = BaseCollection.extend({
  model: File,
})



// WEBPACK FOOTER //
// ./src/container/collections/FileCollection.js