import Effektif from 'singleton/Effektif'
import { collections as commonsCollections } from 'commons'
const { BaseCollection } = commonsCollections
import LicenseInfo from '../models/LicenseInfo'
module.exports = BaseCollection.extend({
  urlRoot: function() {
    return Effektif.makeUrl('info/licenses')
  },

  model: LicenseInfo,

  getUsed: function() {
    return this.filter(info => {
      return info.isUsed()
    })
  },

  getUnused: function() {
    return this.filter(info => {
      return (
        !info.isExpired() &&
        info.isForInvite() &&
        (info.isUnused() || info.isGenerator())
      )
    })
  },

  getUnusedCount: function(type) {
    return this.chain()
      .filter(license => license.get('type') === type)
      .reduce((result, license) => {
        return Math.max(
          result,
          license.isGenerator()
            ? Number.POSITIVE_INFINITY
            : license.get('unused')
        )
      }, 0)
      .value()
  },
})



// WEBPACK FOOTER //
// ./src/organizations/collections/LicenseInfoCollection.js