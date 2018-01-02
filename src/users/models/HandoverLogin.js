import UniqueModel from 'uniquemodel'
import Effektif from 'singleton/Effektif'
import { models as commonsModels } from 'commons'
const { BaseModel } = commonsModels

/**
     * A model used for transmitting the login reference to the server
     *
     */
module.exports = UniqueModel(
  BaseModel.extend({
    url: Effektif.baseUrl() + '/users/login/handover',
    idAttribute: 'reference',
    defaults: {
      reference: null,
      token: null,
      redirectTo: '/',
    },
  }),
  'HandoverLogin'
)



// WEBPACK FOOTER //
// ./src/users/models/HandoverLogin.js