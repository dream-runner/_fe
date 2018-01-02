import _ from 'underscore'
import { onChangeLocale } from 'i18n'
import Effektif from 'singleton/Effektif'
import { collections as commonsCollections } from 'commons'
const { BaseCollection } = commonsCollections
import VariableTypeDescriptor from 'processes/models/VariableTypeDescriptor'
import getDefaultVariableTypeDescriptors from 'processes/statics/getDefaultVariableTypeDescriptors'

var VariableTypeDescriptorCollection = BaseCollection.extend({
  model: VariableTypeDescriptor,

  urlRoot: function() {
    return Effektif.makeUrl('typeDescriptors')
  },

  allInPalette: function() {
    return this.filter(item => item.get('isInPalette'))
  },

  connected: function() {
    return this.filter(item => item.get('connectorId'))
  },

  modelId: function(attrs) {
    // This has to be in sync with VariableTypeDescriptor#parse implemention
    return _.compact([attrs.key, attrs.id]).join('_')
  },

  parse: function(models, options) {
    // make sure to always set the default variable type descriptors
    return BaseCollection.prototype.parse.apply(this, [
      _.union(models, getDefaultVariableTypeDescriptors()),
      options,
    ])
  },

  reset: function(models, options) {
    var defaults = _.map(
      getDefaultVariableTypeDescriptors(),
      descriptor => new VariableTypeDescriptor(descriptor, { parse: true })
    )
    return BaseCollection.prototype.reset.call(
      this,
      _.union(defaults, models),
      options
    )
  },
})

var collection = new VariableTypeDescriptorCollection(
  _.map(
    getDefaultVariableTypeDescriptors(),
    descriptor => new VariableTypeDescriptor(descriptor, { parse: true })
  )
)

onChangeLocale(() => {
  collection.set(
    _.map(
      getDefaultVariableTypeDescriptors(),
      descriptor => new VariableTypeDescriptor(descriptor, { parse: true })
    ),
    { remove: false }
  )
})

module.exports = collection



// WEBPACK FOOTER //
// ./src/singleton/VariableTypeDescriptors.js