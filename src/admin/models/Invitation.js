import _ from 'underscore'
import { StringUtils } from 'commons-utils'
import { models as commonsModels } from 'commons'
const { BaseModel } = commonsModels

module.exports = BaseModel.extend({
  idAttribute: 'emailAddress',

  // this is a crazy hack because the backend refuses
  // to send a proper represenation of invites because of "reasons"
  // General problem seems to be that their API model is their data
  // model...
  prepareForSet: function(attrs) {
    var isEmail = false
    var emailAddress

    if (attrs['emailAddress']) {
      return
    }

    _.each(attrs, (value, key) => {
      if (!StringUtils.validateEmail(key)) {
        return
      }

      isEmail = true
      emailAddress = key
    })

    if (!isEmail) {
      return
    }

    this.set('emailAddress', emailAddress)
  },
})



// WEBPACK FOOTER //
// ./src/admin/models/Invitation.js