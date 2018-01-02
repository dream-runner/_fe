import UniqueModel from 'uniquemodel'
import { models as commonsModels } from 'commons'
const { BaseModel } = commonsModels
module.exports = UniqueModel(
  BaseModel.extend({
    key: function() {
      return this.get('key')
    },

    category: function() {
      return this.get('category')
    },
  }),
  'Feature'
)



// WEBPACK FOOTER //
// ./src/container/models/Feature.js