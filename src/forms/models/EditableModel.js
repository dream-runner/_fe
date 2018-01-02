import _ from 'underscore'
import { models as commonsModels } from 'commons'
const { BaseModel } = commonsModels

module.exports = BaseModel.extend({
  prepareForSet: function(attrs) {
    BaseModel.prototype.prepareForSet.apply(this, arguments)

    if (!this._fields) {
      this._fields = {}
    }

    var Field = require('forms/models/Field')

    _.each(this.fields, (definition, name) => {
      if (!this._fields[name]) {
        this._fields[name] = new Field(definition)
        this._fields[name].on('change', () => {
          this.set(name, this._fields[name].get('value'))
        })
      }

      if (_.isUndefined(attrs[name])) {
        return
      }

      this.field(name).set('value', attrs[name])
    })
  },

  unset: function(field) {
    if (this._fields[field]) {
      this._fields[field].unset('value')
    }

    BaseModel.prototype.unset.apply(this, arguments)
  },

  field: function(field) {
    return this._fields[field]
  },
})



// WEBPACK FOOTER //
// ./src/forms/models/EditableModel.js