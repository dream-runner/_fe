import { models as commonsModels } from 'commons'
const { BaseModel } = commonsModels

import Form from 'forms/models/Form'

/**
 * A Version is a published revision of a Process definition
 *
 */
export default BaseModel.extend({
  urlSuffix: '/startInfo',

  embeddings: {
    form: Form,
  },
})



// WEBPACK FOOTER //
// ./src/processes/models/StartInfo.js