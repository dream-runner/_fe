import UniqueModel from 'uniquemodel'
import { models as commonsModels } from 'commons'
const { BaseModel } = commonsModels

module.exports = UniqueModel(
  BaseModel.extend({
    defaults: {
      message: '',
    },
  }),
  'Feedback'
)



// WEBPACK FOOTER //
// ./src/container/models/Feedback.js