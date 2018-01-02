import UniqueModel from 'uniquemodel'
import { models as commonsModels } from 'commons'
const { BaseModel } = commonsModels
import FileCollection from '../collections/FileCollection'

module.exports = UniqueModel(
  BaseModel.extend({
    references: {
      attachments: FileCollection,
    },

    defaults: {
      attachments: [],
    },

    autoFetchRelated: ['attachments'],
  }),
  'Mail'
)



// WEBPACK FOOTER //
// ./src/container/models/Mail.js