import React, { Component } from 'react'
import i18n from 'signavio-i18n'
import $ from 'jquery'
import { isEmpty } from 'lodash'
import { LoginUtils } from 'commons-utils'
import { Organization } from 'commons-propTypes'

/**
 * This API wraps the configuration of an LDAP directory service
 * which is used to synchronise users and groups.
 */
export default function connectToAPI(WrappedComponent) {
  return class LDAPConnection extends Component {
    static contextTypes = {
      organization: Organization.isRequired,
    }

    render() {
      return (
        <WrappedComponent
          {...this.props}
          api={{
            get: () => this.callAPI('ldap', 'GET'),
            create: config => this.callAPI('ldap', 'POST', config),
            update: config => this.callAPI('ldap', 'PUT', config),
            delete: () => this.callAPI('ldap', 'DELETE'),
            validate: () => this.callAPI('ldap/validate', 'POST'),
            synchronise: () => this.callAPI('ldap/synchronise', 'POST'),
          }}
        />
      )
    }

    callAPI(url, method, data = {}) {
      const { organization } = this.context

      return new Promise((resolve, reject) =>
        $.ajax({
          url: LoginUtils.makeUrl(url, organization),
          method,
          data: isEmpty(data) ? null : JSON.stringify(data),

          success: result => resolve(result),
          error: result =>
            reject(
              (result.responseJSON && result.responseJSON.message) ||
                i18n('Unknown error')
            ),
        })
      )
    }
  }
}



// WEBPACK FOOTER //
// ./src/organizations/models/LdapConfigurationAPI.js