import _ from 'underscore'
import i18n from 'i18n'
import $ from 'jquery'

import { LoginUtils } from 'commons-utils'

import { Query } from 'commons-models'

export default class AdminProfileQuery extends Query {
  getDescriptor() {
    return {
      id: 'adminProfile',
      name: i18n('Editions'),
    }
  }

  fetch(query, options = {}) {
    return new Promise(resolve => {
      $.ajax({
        url: LoginUtils.adminUrl('licenseProfiles'),
        data: _.merge({}, options, {
          name: query,
        }),
      }).then((results, status, xhr) => {
        resolve(this.transformProfiles(results))
      })
    })
  }

  transformProfiles(results) {
    return results.map(profile => {
      return {
        type: 'adminProfile',
        entity: profile,
        value: profile.id,
      }
    })
  }
}



// WEBPACK FOOTER //
// ./src/admin/models/ProfileQuery.js