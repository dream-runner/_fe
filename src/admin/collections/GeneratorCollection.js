import Effektif from 'singleton/Effektif'
import { collections as commonsCollections } from 'commons'
const { BaseCollection } = commonsCollections
import License from 'eff-admin/models/License'

module.exports = BaseCollection.extend({
  urlRoot: Effektif.rootUrl('/admin/generators'),

  model: License,

  initialize: function() {
    this.on(
      'add',
      generator => {
        generator.set('isGenerator', true)
      },
      this
    )
  },
})



// WEBPACK FOOTER //
// ./src/admin/collections/GeneratorCollection.js