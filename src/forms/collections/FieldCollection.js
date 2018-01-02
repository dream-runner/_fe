import { collections as commonsCollections } from 'commons'
const { BaseCollection } = commonsCollections
import Field from 'forms/models/Field'

module.exports = BaseCollection.extend({
  model: Field,
})



// WEBPACK FOOTER //
// ./src/forms/collections/FieldCollection.js