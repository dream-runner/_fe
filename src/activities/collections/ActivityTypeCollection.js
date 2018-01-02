import { collections as commonsCollections } from 'commons'
const { BaseCollection } = commonsCollections
import ActivityType from 'activities/models/ActivityType'

module.exports = BaseCollection.extend({
  model: ActivityType,

  modelId: function(attrs) {
    // This has to be in sync with ActivityType#parse implemention
    return _.compact([attrs.key, attrs.descriptorId]).join('_')
  },
})



// WEBPACK FOOTER //
// ./src/activities/collections/ActivityTypeCollection.js