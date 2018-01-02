import Effektif from 'singleton/Effektif'
import EditableModel from 'forms/models/EditableModel'

module.exports = EditableModel.extend({
  fields: {
    expirationDate: {
      type: { name: 'date', kind: 'date' },
    },
    packages: {
      type: { name: 'list', elementType: { name: 'text' } },
    },
  },

  urlRoot: function() {
    return Effektif.rootUrl('/admin/batch')
  },

  save: function() {
    var data = {
      packages: this.get('packages'),
      expirationDate: this.get('expirationDate'),
    }

    this.once(
      'action:' + this.get('type'),
      () => {
        this.trigger('sync')
      },
      this
    )

    this.action(this.get('type'), {
      method: 'PUT',
      data: {
        references: this.get('references'),
        data: data,
      },
    })
  },

  destroy: function() {
    this.once(
      'action:' + this.get('type'),
      () => {
        this.trigger('destroy')
      },
      this
    )

    this.action(this.get('type'), { method: 'DELETE' })
  },
})



// WEBPACK FOOTER //
// ./src/admin/models/Batch.js