import _ from 'underscore'
import { collections as commonsCollections } from 'commons'
const { BaseCollection } = commonsCollections
import ParameterDescriptor from 'activities/models/ParameterDescriptor'

module.exports = BaseCollection.extend({
  model: ParameterDescriptor,

  // Override #set to make sure that items are NEVER removed, but only added or updated.
  // ParameterDescriptor items that are not existing anymore shall instead be unbound. This is required
  // due to some storage optimazation on the server side (unbound parameters are deleted in the DB).
  set: function(models, options) {
    options = options || {}

    // remove: false causes unbound parameters to not be removed
    options = _.extend({}, options, { remove: false })
    var result = BaseCollection.prototype.set.call(this, models, options)

    // unbind all parameters that are not existent in the passed models array
    var modelKeys = _.map(models, model => {
      // model.id for Backbone models, model.key for JSON objects
      return model.id || model.key
    })
    var unboundModelsKeys = _.difference(this.pluck('key'), modelKeys)
    _.each(
      unboundModelsKeys,
      key => {
        this.get(key).clearBinding()
      },
      this
    )

    return result
  },
})



// WEBPACK FOOTER //
// ./src/activities/collections/ParameterDescriptorCollection.js