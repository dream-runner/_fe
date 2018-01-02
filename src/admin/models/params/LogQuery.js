import _ from 'underscore'
import Query from 'eff-admin/models/params/Query'

var QUERY_FIELDS = [
  'after',
  'before',
  'dur',
  'sortby',
  'path',
  'msg',
  'piid',
  'caseId',
  'debug',
  'method',
]

module.exports = Query.extend({
  fields: {
    after: {
      type: { name: 'date', kind: 'date' },
    },
    before: {
      type: { name: 'date', kind: 'date' },
    },
    dur: {
      type: { name: 'number' },
    },
    path: {
      type: { name: 'text' },
    },
    msg: {
      type: { name: 'text', multiLine: true },
    },
    piid: {
      type: { name: 'text' },
    },
    caseId: {
      type: { name: 'text' },
    },
    debug: {
      type: { name: 'boolean' },
    },
  },

  parse: function() {
    var props = _.merge(
      {},
      Query.prototype.parse.call(this),
      this.myProps(QUERY_FIELDS)
    )

    if (_.isUndefined(props.debug)) {
      props.debug = false
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

        if (_.isNumber(value) && isNaN(value)) {
          return
        }

        if (_.isString(value) && !value) {
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
// ./src/admin/models/params/LogQuery.js