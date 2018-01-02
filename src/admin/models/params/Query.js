import _ from 'underscore'
import { HttpUtils } from 'commons-utils'
import EditableModel from 'forms/models/EditableModel'
import Organization from 'eff-admin/models/Organization'
import User from 'eff-admin/models/User'

var PARAMS = ['organizationId', 'userId']

module.exports = EditableModel.extend({
  references: {
    organization: Organization,
    user: User,
  },

  initialize: function() {
    this.set(this.parse())
  },

  myProps: function(allowed) {
    return HttpUtils.parseQuery(this.get('query'), key => {
      return _.includes(allowed, key)
    })
  },

  parse: function() {
    return this.myProps(PARAMS)
  },

  print: function() {
    var query = {}

    _.each(
      PARAMS,
      param => {
        var value = this.get(param)

        if (!value) {
          return
        }

        query[param] = value
      },
      this
    )

    return query
  },

  toString: function() {
    return HttpUtils.queryString(this.print())
  },
})



// WEBPACK FOOTER //
// ./src/admin/models/params/Query.js