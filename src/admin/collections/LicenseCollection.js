import Effektif from 'singleton/Effektif'
import { collections as commonsCollections } from 'commons'
const { BaseCollection } = commonsCollections
import License from 'eff-admin/models/License'

module.exports = BaseCollection.extend({
  urlRoot: function() {
    return Effektif.rootUrl('/admin/licenses')
  },

  url: function() {
    if (!this.parent) {
      return this.urlRoot()
    }

    return this.parent.url() + '/licenses'
  },

  model: License,

  getUnused: function() {
    return this.filter(license => {
      return (
        !license.isExpired() &&
        (license.get('unused') > 0 || license.isGenerator())
      )
    })
  },
})



// WEBPACK FOOTER //
// ./src/admin/collections/LicenseCollection.js