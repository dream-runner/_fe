import { collections as commonsCollections } from 'commons'
const { BaseCollection } = commonsCollections
import TriggerDescriptor from 'services/models/TriggerDescriptor'
import Effektif from 'singleton/Effektif'

module.exports = BaseCollection.extend({
  urlRoot: function() {
    return Effektif.makeUrl('triggerDescriptors')
  },

  model: TriggerDescriptor,
})



// WEBPACK FOOTER //
// ./src/services/collections/TriggerDescriptorCollection.js