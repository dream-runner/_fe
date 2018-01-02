import Effektif from 'singleton/Effektif'
import { collections as commonsCollections } from 'commons'
const { BaseCollection } = commonsCollections
import LogGroup from 'eff-admin/models/LogGroup'

module.exports = BaseCollection.extend({
  model: LogGroup,
  url: function() {
    return Effektif.baseUrl() + '/admin/logs'
  },
})



// WEBPACK FOOTER //
// ./src/admin/collections/LogGroups.js