import { collections as commonsCollections } from 'commons'
const { BaseCollection } = commonsCollections
import Feedback from '../models/Feedback'

module.exports = BaseCollection.extend({
  model: Feedback,
})



// WEBPACK FOOTER //
// ./src/container/collections/FeedbackCollection.js