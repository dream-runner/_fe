import UniqueModel from 'uniquemodel'
import moment from '@signavio/effektif-commons/lib/extensions/moment'
import Effektif from 'singleton/Effektif'
import { LicenseUtils } from 'organizations/utils'
import EditableModel from 'forms/models/EditableModel'

module.exports = UniqueModel(
  EditableModel.extend({
    urlRoot: function() {
      if (this.isGenerator()) {
        return Effektif.rootUrl('/admin/generators')
      }

      return Effektif.rootUrl('/admin/licenses')
    },

    url: function() {
      if (!this.id) {
        return this.urlRoot()
      }

      return this.urlRoot() + '/' + this.id
    },

    references: {
      user: function() {
        return require('eff-admin/models/User')
      },
      organization: function() {
        return require('eff-admin/models/Organization')
      },
      generatedBy: function() {
        return require('eff-admin/models/License')
      },
    },

    fields: {
      expirationDate: {
        type: { name: 'date', kind: 'date' },
      },
      creationDate: {
        type: { name: 'date', kind: 'date' },
        readOnly: true,
      },
      invitee: {
        type: { name: 'emailAddress' },
      },
      packages: {
        type: { name: 'list', elementType: { name: 'text' } },
      },
      number: {
        type: { name: 'number' },
      },
      autoAssign: {
        type: { name: 'boolean' },
      },
      assignOnActivation: {
        type: { name: 'boolean' },
      },
    },

    compositeId: function() {
      var id = ''

      if (this.get('isGenerator')) {
        id += '+'
      }

      id += this.get('type')

      if (this.get('packages')) {
        id += ';' + this.get('packages').join('+')
      }

      if (this.get('expirationDate')) {
        id +=
          ';' + moment(this.get('expirationDate')).utc().format('DD-MM-YYYY')
      }

      return id
    },

    title: function() {
      return LicenseUtils.getTitle(this.get('type')) || this.get('type')
    },

    expiresSoon: function() {
      if (!this.get('expirationDate')) {
        return false
      }

      return moment().add(2, 'months').isAfter(this.get('expirationDate'))
    },

    isGenerator: function() {
      return this.get('isGenerator')
    },

    expirationDateFormatted: function() {
      if (!this.get('expirationDate')) {
        return ''
      }

      return moment(this.get('expirationDate')).format('LL')
    },

    isExpired: function() {
      return (
        this.hasExpirationDate() &&
        moment(this.get('expirationDate')).isBefore(moment())
      )
    },

    hasExpirationDate: function() {
      return this.has('expirationDate')
    },

    getCategory: function() {
      if (!this.isGenerator()) {
        return 'licenses'
      }

      return 'generators'
    },

    save: function() {
      if (this.get('invitee') === '') {
        // submit null instead of an empty string, otherwise the reset doesn't work
        this.set('invitee', null)
      }

      return EditableModel.prototype.save.apply(this, arguments)
    },
  }),
  'AdminLicense'
)



// WEBPACK FOOTER //
// ./src/admin/models/License.js