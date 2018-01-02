import UniqueModel from 'uniquemodel'
import { models as commonsModels } from 'commons'
const { BaseModel } = commonsModels
import User from 'users/models/User'

/**
     * A Version is a published revision of a Process definition
     *
     */
module.exports = UniqueModel(
  BaseModel.extend({
    urlSuffix: '/versions',

    defaults: {
      name: '',
    },

    references: {
      creator: User,
    },
  }),
  'Version'
)



// WEBPACK FOOTER //
// ./src/processes/models/Version.js