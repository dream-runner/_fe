import Backbone from 'backbone-rel-partialput'
import UniqueModel from 'uniquemodel'
import { models as commonsModels } from 'commons'
const { BaseModel } = commonsModels

module.exports = UniqueModel(BaseModel.extend({}), 'LicenseType')



// WEBPACK FOOTER //
// ./src/admin/models/LicenseType.js