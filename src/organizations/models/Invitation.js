import Effektif from 'singleton/Effektif'
import { models as commonsModels } from 'commons'
const { BaseModel } = commonsModels

/**
     * A user of the Effektif application
     *
     */
module.exports = BaseModel.extend({
  urlRoot: '/invitations',

  url: function() {
    if (this.isNew()) {
      return Effektif.makeUrl('users')
    }

    return Effektif.makeUrl(this.urlRoot + '/' + encodeURI(this.id))
  },

  idAttribute: 'emailAddress',

  attributes: {
    emailAddress: '',
  },
})



// WEBPACK FOOTER //
// ./src/organizations/models/Invitation.js