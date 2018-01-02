import _ from 'underscore'
import Effektif from 'singleton/Effektif'
import { collections as commonsCollections } from 'commons'
const { BaseCollection } = commonsCollections
import Feature from '../models/Feature'
module.exports = BaseCollection.extend({
  urlRoot: function() {
    return Effektif.makeUrl('features')
  },

  model: Feature,

  hasFeature: function(key) {
    return (
      typeof this.find(feature => {
        return key === feature.key()
      }) !== 'undefined'
    )
  },

  hasFeatures: function(keys) {
    return _.every(keys, this.hasFeature.bind(this))
  },

  filterByCategory: function(cat) {
    return this.filter(feature => {
      return cat === feature.category()
    })
  },
})



// WEBPACK FOOTER //
// ./src/container/collections/FeatureCollection.js