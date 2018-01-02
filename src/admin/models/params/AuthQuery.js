import _ from 'underscore'
import Query from 'eff-admin/models/params/Query'
import LicenseType from 'eff-admin/models/LicenseType'

var QUERY_FIELDS = ['type', 'used', 'expirationDate']

module.exports = Query.extend({
  references: _.merge({}, Query.prototype.references, {
    type: LicenseType,
  }),

  fields: {
    used: {
      type: { name: 'boolean' },
    },
    expirationDate: {
      type: { name: 'date', kind: 'date' },
    },
  },

  parse: function() {
    return _.merge(
      {},
      Query.prototype.parse.call(this),
      this.myProps(QUERY_FIELDS)
    )
  },

  print: function() {
    var query = Query.prototype.print.call(this)

    _.each(
      QUERY_FIELDS,
      param => {
        var value = this.get(param)

        if (_.isUndefined(value) || _.isNull(value)) {
          return
        }

        if (this.references[param]) {
          query[param] = value.id

          return
        }

        query[param] = value
      },
      this
    )

    return query
  },
})



// WEBPACK FOOTER //
// ./src/admin/models/params/AuthQuery.js