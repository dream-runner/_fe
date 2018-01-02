import Effektif from 'singleton/Effektif'
import ProcessCollection from 'processes/collections/ProcessCollection'

/**
     * A collection of example Processes
     */
module.exports = ProcessCollection.extend({
  initialize: function(models, options) {
    ProcessCollection.prototype.initialize.apply(this, arguments)
    this.category = options && options.category
  },

  urlRoot: function() {
    var query = this.category ? '?category=' + this.category : ''
    return Effektif.makeUrl('templates' + query)
  },
})



// WEBPACK FOOTER //
// ./src/processes/collections/ProcessTemplateCollection.js