import UniqueModel from 'uniquemodel'
import { models as commonsModels } from 'commons'
const { BaseModel } = commonsModels

module.exports = UniqueModel(
  BaseModel.extend({
    url: function() {
      return require('singleton/Effektif').baseUrl() + '/about'
    },

    unavailable: function() {
      return !this.get('version')
    },
  }),
  'About'
)



// WEBPACK FOOTER //
// ./src/container/models/About.js