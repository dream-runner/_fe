import { collections as commonsCollections } from 'commons'
const { BaseCollection } = commonsCollections
import Version from 'processes/models/Version'
import moment from '@signavio/effektif-commons/lib/extensions/moment'

module.exports = BaseCollection.extend({
  model: Version,

  comparator: function(version) {
    return moment(version.get('createTime')).valueOf()
      ? -moment(version.get('createTime')).valueOf()
      : -Infinity
  },

  latest: function() {
    return this.first()
  },
})



// WEBPACK FOOTER //
// ./src/processes/collections/VersionCollection.js