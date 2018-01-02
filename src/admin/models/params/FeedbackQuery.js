import _ from 'underscore'
import Query from 'eff-admin/models/params/Query'

var QUERY_FIELDS = ['subject']

module.exports = Query.extend({
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
// ./src/admin/models/params/FeedbackQuery.js