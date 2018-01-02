import UniqueModel from 'uniquemodel'
import { models as commonsModels } from 'commons'
const { BaseModel } = commonsModels
import Logs from 'eff-admin/collections/Logs'
import User from 'eff-admin/models/User'
import Organization from 'eff-admin/models/Organization'

module.exports = UniqueModel(
  BaseModel.extend({
    references: {
      user: User,
      organization: Organization,
    },

    embeddings: {
      logs: Logs,
    },

    defaults: {
      logs: [],
    },
  }),
  'LogGroup'
)



// WEBPACK FOOTER //
// ./src/admin/models/LogGroup.js