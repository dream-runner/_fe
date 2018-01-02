import _ from 'underscore'
import Query from 'eff-admin/models/params/Query'

var QUERY_FIELDS = ['after', 'before', 'completed']

module.exports = Query.extend({
  fields: {
    after: {
      type: { name: 'date', kind: 'date' },
    },
    before: {
      type: { name: 'date', kind: 'date' },
    },
    completed: {
      type: { name: 'boolean' },
    },
  },

  parse: function() {
    var props = _.merge(
      {},
      Query.prototype.parse.call(this),
      this.myProps(QUERY_FIELDS)
    )

    if (_.isUndefined(props.completed)) {
      props.completed = false
    }

    return props
  },

  print: function() {
    var query = Query.prototype.print.call(this)

    _.each(
      QUERY_FIELDS,
      field => {
        var value = this.get(field)

        if (_.isUndefined(value) || _.isNull(value)) {
          return
        }

        query[field] = value
      },
      this
    )

    return query
  },
})



// WEBPACK FOOTER //
// ./src/admin/models/params/PurchaseQuery.js