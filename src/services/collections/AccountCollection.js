import { collections as commonsCollections } from 'commons'
const { BaseCollection } = commonsCollections
import Account from 'services/models/Account'

/**
     * A collection of account models
     */
module.exports = BaseCollection.extend({
  //urlSuffix: '/accounts',
  model: Account,
})



// WEBPACK FOOTER //
// ./src/services/collections/AccountCollection.js