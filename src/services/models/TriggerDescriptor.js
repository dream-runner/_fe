import UniqueModel from 'uniquemodel'
import { models as commonsModels } from 'commons'
const { BaseModel } = commonsModels
import Service from 'services/models/Service'
import File from 'container/models/File'
import Effektif from 'singleton/Effektif'

module.exports = UniqueModel(
  BaseModel.extend({
    references: {
      service: Service,
      wsdl: File,
    },

    partialAttributesCore: ['type'],

    autoFetchRelated: ['wsdl'],

    getIcon: function() {
      return this.get('service') ? this.get('service').get('icon') : ''
    },

    getEndpointUrl: function(organization) {
      if (this.isNew() || !this.get('service')) {
        return null
      }

      return (
        'https://' +
        [
          window.location.host,
          Effektif.baseUrl().substring(1),
          organization.id,
          this.get('service').id,
          'notify',
          this.id,
        ].join('/')
      )
    },
  }),
  'TriggerDescriptor'
)



// WEBPACK FOOTER //
// ./src/services/models/TriggerDescriptor.js