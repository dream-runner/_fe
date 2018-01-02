import { collections as commonsCollections } from 'commons'
const { BaseCollection } = commonsCollections
import Organization from '../models/Organization'

module.exports = BaseCollection.extend({
  model: Organization,
})



// WEBPACK FOOTER //
// ./src/organizations/collections/OrganizationCollection.js