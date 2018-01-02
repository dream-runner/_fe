import _ from 'underscore'
import Query from './Query'

const QUERY_FIELDS = ['version', 'title', 'after', 'before']

export default Query.extend({
  fields: {
    version: {
      type: { name: 'text' },
    },
    title: {
      type: { name: 'text' },
    },
    notes: {
      type: { name: 'text', multiLine: true },
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
        var value = this.get(param) || ''

        if (!value.trim()) {
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
// ./src/admin/models/params/ReleaseQuery.js