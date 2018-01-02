import Effektif from 'singleton/Effektif'
import { models as commonsModels } from 'commons'
const { BaseModel } = commonsModels

/**
     * A model used for transmitting the login form data to the server
     *
     */
module.exports = BaseModel.extend({
  idAttribute: 'stateReference',

  url: function() {
    return `${Effektif.baseUrl()}/login/${this.get('key')}${this.get('suffix')}`
  },

  defaults: {
    stateReference: null,
    authenticationUrl: null,
    redirectTo: '/',
    suffix: '',
    key: '',
  },

  serviceKey: function(key) {
    this.key = key
    return this
  },

  urlSuffix: function(suffix) {
    this.suffix = suffix
    return this
  },

  login: function(redirectTo) {
    this.set('redirectTo', redirectTo)
    this.set('hostname', window.location.hostname)

    this.once(
      'sync',
      () => {
        var url = this.get('authenticationUrl')
        var ref = this.get('stateReference')

        if (!url || !ref) {
          throw new Error(
            'Something went wrong on service login. Authentication URL or state reference are missing.'
          )
        }

        this.trigger('login', ref, url)
      },
      this
    )

    this.create()
  },
})



// WEBPACK FOOTER //
// ./src/services/models/ServiceLogin.js