import { models as commonsModels } from 'commons'
const { BaseModel } = commonsModels
import { collections as commonsCollections } from 'commons'
const { BaseCollection } = commonsCollections

var ComplexValue = BaseModel.extend({
  initialize: function() {
    // propagate change event from inside the value model to the object owning the value
    this.on('change', () => {
      if (!this.parent) return
      this.parent.trigger('change:' + this.keyInParent, this.parent, this)
      this.parent.trigger('change', this.parent)
    })
  },
})

module.exports = ComplexValue



// WEBPACK FOOTER //
// ./src/processes/models/ComplexValue.js