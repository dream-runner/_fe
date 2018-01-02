import _ from 'underscore'
import i18n from 'i18n'
import $ from 'jquery'

import { LoginUtils } from 'commons-utils'

import { Query } from 'commons-models'

export default class OrganizationQuery extends Query {
  constructor() {
    super()

    this.organizations = []
  }

  fetch(query, options = {}) {
    return new Promise(resolve => {
      $.ajax({
        url: LoginUtils.adminUrl('organizations'),
        data: _.merge({}, options, {
          query: query,
        }),
      }).then((results, status, xhr) => {
        this.setSize(xhr)

        resolve(this.transformOrganizations(results))
      })
    })
  }

  getDescriptor() {
    return {
      id: 'adminOrganization',
      size: this.size,
      name: i18n('Organizations'),
    }
  }

  transformOrganizations(organizations) {
    return organizations.map(organization => {
      return {
        type: 'adminOrganization',
        entity: organization,
        value: organization.name,
      }
    })
  }
}



// WEBPACK FOOTER //
// ./src/admin/models/OrganizationQuery.js