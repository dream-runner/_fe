import UniqueModel from 'uniquemodel'
import { models as commonsModels } from 'commons'
const { BaseModel } = commonsModels

/**
     * One log
     *
     */
module.exports = UniqueModel(
  BaseModel.extend({
    idAttribute: '_id',
  }),
  'Log'
)



// WEBPACK FOOTER //
// ./src/admin/models/Log.js