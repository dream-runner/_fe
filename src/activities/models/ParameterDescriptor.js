import { models as commonsModels } from 'commons'
const { BaseModel } = commonsModels
import VariableType from 'processes/models/VariableType'

module.exports = BaseModel.extend({
  idAttribute: 'key',

  embeddings: {
    type: VariableType,
  },
})



// WEBPACK FOOTER //
// ./src/activities/models/ParameterDescriptor.js