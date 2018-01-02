import Effektif from 'singleton/Effektif'
import { collections as commonsCollections } from 'commons'
const { BaseCollection } = commonsCollections
import Service from 'services/models/Service'

module.exports = BaseCollection.extend({
  model: Service,

  urlRoot: function() {
    return Effektif.makeUrl('services')
  },
})



// WEBPACK FOOTER //
// ./src/services/collections/ServiceCollection.js