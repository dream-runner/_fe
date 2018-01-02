import _ from 'underscore'
import i18n from 'i18n'
import $ from 'jquery'

import { LoginUtils } from 'commons-utils'

import { Query } from 'commons-models'

import { userUtils } from '@signavio/effektif-api'

export default class UserQuery extends Query {
  constructor(organization = {}) {
    super()

    this.organization = organization
    this.users = []
  }

  getDescriptor() {
    return {
      id: 'adminUser',
      size: this.size,
      name: i18n('Users'),
    }
  }

  fetch(query, options = {}) {
    return new Promise(resolve => {
      $.ajax({
        url: LoginUtils.adminUrl('users'),
        data: _.merge({}, options, {
          organizationId: this.organization.id,
          query: query,
        }),
      }).then((results, status, xhr) => {
        this.setSize(xhr)

        resolve(this.transformUsers(results))
      })
    })
  }

  transformUsers(results) {
    return results.map(user => ({
      type: 'adminUser',
      entity: user,
      value: userUtils.name(user),
    }))
  }
}



// WEBPACK FOOTER //
// ./src/admin/models/UserQuery.js