import UniqueModel from 'uniquemodel'
import Effektif from 'singleton/Effektif'
import { models as commonsModels } from 'commons'
const { BaseModel } = commonsModels

module.exports = UniqueModel(
  BaseModel.extend({
    urlRoot: function() {
      return Effektif.rootUrl('/admin/licenseProfiles')
    },

    url: function() {
      if (!this.id) {
        return this.urlRoot()
      }

      return this.urlRoot() + '/' + this.id
    },
  }),
  'AdminLicenseProfile'
)



// WEBPACK FOOTER //
// ./src/admin/models/LicenseProfile.js