import _ from 'underscore'
import Query from 'eff-admin/models/params/Query'

var QUERY_FIELDS = ['emailAddress', 'after', 'before']

module.exports = Query.extend({
  fields: {
    emailAddress: {
      type: { name: 'emailAddress' },
    },
    after: {
      type: { name: 'date', kind: 'date' },
    },
    before: {
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

        if (param === '') {
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
// ./src/admin/models/params/RegistrationQuery.js