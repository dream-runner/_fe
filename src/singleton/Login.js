import UniqueModel from 'uniquemodel'
import { find, filter } from 'lodash'
import moment from '@signavio/effektif-commons/lib/extensions/moment'
import $ from 'jquery'
import Effektif from 'singleton/Effektif'
import { models as commonsModels } from 'commons'
const { BaseModel } = commonsModels
import User from 'users/models/User'
import OrganizationCollection from 'organizations/collections/OrganizationCollection'
import { Cookies } from 'commons-utils'
import { LoginUtils } from 'commons-utils'

/**
     * A model used for transmitting the login form data to the server
     *
     */
var Login = UniqueModel(
  BaseModel.extend({
    url: Effektif.baseUrl() + '/users/login',

    idAttribute: 'token',

    // references: {
    //   user: User,
    //   organizations: OrganizationCollection,
    // },

    defaults: {
      emailAddress: '',
      password: '',
      rememberLogin: false,
      organizations: [],
    },

    partialAttributesCore: [
      'emailAddress',
      'password',
      'rememberLogin',
      'token',
      'organizationKey',
      'hostname',
    ],

    getActiveOrganization: function() {
      return this.getOrganization(
        this.get('organizationKey') || Cookies.get('org')
      )
    },

    organization: function() {
      return this.getActiveOrganization()
    },

    getOrganizationKey: function(organization) {
      if (organization) {
        return organization.key
      }

      return this.get('organizationKey')
    },

    getOrganization(key) {
      const organizations = this.get('organizations')

      if (!organizations) {
        return
      }

      if (organizations && organizations.length === 1) {
        return organizations[0]
      }

      return find(organizations, { key }) || organizations[0]
    },

    isActiveOrganization: function(organization) {
      return this.getActiveOrganization().key === organization.key
    },

    _setup: function() {
      if (!this.token()) {
        Cookies.remove('authorization')
        Cookies.remove('org')

        this._setupAjax()

        return
      }

      var organization = this.getOrganization(this.get('organizationKey'))
      var expires = false

      if (!this.get('rememberLogin')) {
        expires = this.standardExpiryDate()
      }

      Cookies.set('org', this.getOrganizationKey(organization))
      Cookies.set('authorization', this.token(), expires)

      this._setupAjax(this.token())

      Effektif.updateOrganization(organization)
    },

    _setupAjax: function(token) {
      if (!token) {
        $.ajaxSettings.headers = {}

        return
      }

      $.ajaxSettings.headers = { Authorization: token }
    },

    token: function() {
      return this.id
    },

    user: function() {
      return this.get('user')
    },

    organizations: function() {
      if (!this.get('organizations')) {
        return []
      }

      return filter(
        this.get('organizations'),
        organization => !organization.disabled
      )
    },

    standardExpiryDate: function() {
      return moment()
        .add(1, 'day')
        .toDate()
    },

    service: function(service, pathname) {
      const handleLogin = (stateReference, authUrl) => {
        // store the state reference, it will be necessary when the user is redirected back to Effektif
        Cookies.set('statereference', stateReference, this.standardExpiryDate())
        // redirect the user to the authentication url of the service
        window.location = authUrl
        service.off('error', handleError)
      }

      const handleError = () => {
        this.trigger('error')
        service.off('login', handleLogin)
      }

      service.once('login', handleLogin)
      service.once('error', handleError)

      service.login(pathname)
    },

    handover: function(handover) {
      if (handover.get('reference') === this._lastHandoverReference) {
        // route has been triggered multiple times, do nothing
        return
      }

      this._lastHandoverReference = handover.get('reference')

      const oldToken = this.token()
      const handleSync = () => {
        const newToken = handover.get('token')
        if (newToken === oldToken) {
          // we are already logged in, just trigger the redirect callbacks
          this.trigger(
            'login',
            newToken,
            this.get('user'),
            this.getActiveOrganization(),
            handover.get('redirectTo')
          )
        } else {
          this.login({
            token: newToken,
            organizationKey: handover.get('organizationKey'),
            path: handover.get('redirectTo'),
          })
        }
        handover.off('error', handleError)
      }

      const handleError = () => {
        this.trigger('error')
        this._lastHandoverReference = null
        handover.off('sync', handleSync)
      }

      handover.once('sync', handleSync)
      handover.once('error', handleError)

      handover.create()
    },

    activate: function(activation) {
      this.set('token', activation.get('token'))
      this.set('organizations', activation.get('organizations'))
      this.set('user', activation.get('user'))

      this._setup()
    },

    switchTo: function(orgKey) {
      this.set('organizationKey', orgKey)

      this._setup()

      this.once('login', () => {
        this.trigger('switch')
      })

      this.login({
        token: this.token(),
        organizationKey: orgKey,
      })
    },

    login: function(options) {
      options = options || {}

      options.path = options.path || LoginUtils.currentPath()
      options.hostname = options.hostname || window.location.hostname

      // reset redirectTo just in case
      options.redirectTo = null

      this.set(options)
      this.once(
        'sync',
        () => {
          // the login might return a redirect URL
          // this is the case if the user tried to access its
          // account under the wrong domain (can happen with a Signavio organization)
          var redirectTo = this.get('redirectTo')
          if (redirectTo) {
            Cookies.remove('authorization')
            Cookies.remove('org')

            window.location.href = redirectTo

            return
          }

          this._setup()

          Effektif.init(() => {
            this.trigger(
              'login',
              this.token(),
              this.get('user'),
              this.getActiveOrganization(),
              options.path
            )
          })
        },
        this
      )

      this.create()
    },

    logout: function() {
      this.clear()
      this.set('organizations', [])

      Cookies.remove('authorization')
      Cookies.remove('org')
      Effektif.removeOrganization()
      window.SSO_PROVIDER = null
    },
  }),
  'Login'
)

module.exports = new Login()



// WEBPACK FOOTER //
// ./src/singleton/Login.js