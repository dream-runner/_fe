import UniqueModel from 'uniquemodel'
import i18n from 'i18n'
import { models as commonsModels } from 'commons'
const { BaseModel } = commonsModels

var Global = UniqueModel(
  BaseModel.extend({
    name: function() {
      return i18n('Global')
    },
  })
)

module.exports = new Global({
  id: '000000010000010001000001',
})



// WEBPACK FOOTER //
// ./src/singleton/GlobalEntity.js