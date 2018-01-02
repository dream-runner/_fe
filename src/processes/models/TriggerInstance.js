import { models as commonsModels } from 'commons'
const { BaseModel } = commonsModels
import Process from 'processes/models/Process'

module.exports = BaseModel.extend({
  references: {
    sourceWorkflow: Process,
  },
})



// WEBPACK FOOTER //
// ./src/processes/models/TriggerInstance.js