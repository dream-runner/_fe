import UniqueModel from 'uniquemodel'

import i18n, { locale } from 'signavio-i18n'
import { models as commonsModels } from '@signavio/effektif-commons/lib'
import { DateUtils } from '@signavio/effektif-commons/lib/utils'

import Effektif from 'singleton/Effektif'
import User from 'users/models/User'
import Organization from 'organizations/models/Organization'
import Activation from 'users/models/Activation'

const { BaseModel } = commonsModels

module.exports = UniqueModel(
  BaseModel.extend({
    /**
   * The registration
   *
   */
    idAttribute: 'code',

    embeddings: {
      user: User,
      organization: Organization,
    },

    defaults: {
      tc: false,
      salutation: '',
      numberOfEmployees: '',
      department: '',
      seniorityLevel: '',
    },

    url() {
      return Effektif.makeUrl(
        `/registrations${!this.isNew() ? `/${this.get('code')}` : ''}`
      )
    },

    hasOrganization() {
      return false
    },

    defaultOrganizationName() {
      const name = this.get('user').name()

      if (!name) {
        return i18n('Organization')
      }

      return i18n("__user__'s organization", {
        user: name,
      })
    },

    name() {
      return this.get('user').name()
    },

    initials() {
      return this.get('user').initials()
    },

    isValid() {
      const user = this.get('user')

      if (!this.get('salutation').trim()) {
        return false
      }

      if (!user.get('firstName').trim()) {
        return false
      }

      if (!user.get('lastName').trim()) {
        return false
      }

      if (user.get('password').trim().length < 6) {
        return false
      }

      if (!this.get('tc')) {
        return false
      }

      if (!user.get('phone').trim()) {
        return false
      }

      if (!user.get('country').trim()) {
        return false
      }

      return true
    },

    organizationName() {
      const organization = this.get('organization')

      if (organization) {
        return organization.get('name')
      }

      return this.get('organizationName')
    },

    activate() {
      const user = this.get('user')

      const activation = new Activation({
        code: this.get('code'),
        password: user.get('password'),
        firstName: user.get('firstName'),
        lastName: user.get('lastName'),
        country: user.get('country'),
        phone: user.get('phone'),
        color: user.get('color'),
        industry: this.get('industry'),
        timeZone: DateUtils.currentTimezone(),
        newsletter: this.get('newsletter'),
        language: locale(),
        organizationName:
          this.organizationName() || this.defaultOrganizationName(),
        salutation: this.get('salutation'),
        department: this.get('department'),
        numberOfEmployees: this.get('numberOfEmployees'),
        seniorityLevel: this.get('seniorityLevel'),
      })

      activation.save()

      return activation
    },
  }),
  'Registration'
)



// WEBPACK FOOTER //
// ./src/users/models/Registration.js