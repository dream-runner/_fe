import Effektif from 'singleton/Effektif'
import { collections as commonsCollections } from 'commons'
const { BaseCollection } = commonsCollections
import Feedback from 'eff-admin/models/Feedback'

module.exports = BaseCollection.extend({
  urlRoot: Effektif.rootUrl('admin/feedback'),

  model: Feedback,
})



// WEBPACK FOOTER //
// ./src/admin/collections/FeedbackCollection.js