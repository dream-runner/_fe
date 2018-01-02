import ProcessConstituent from 'processes/models/ProcessConstituent'
import FieldCollection from 'formdefinitions/collections/FieldCollection'

module.exports = ProcessConstituent.extend({
  embeddings: {
    fields: FieldCollection,
  },

  defaults: {
    fields: [],
  },

  getActivity: function() {
    return this.parent
  },

  isNew: function() {
    // prevent that an ID is auto-assigned
    return false
  },

  getButtonsField: function() {
    return this.get('fields').find(field => {
      return field.get('asButtons')
    })
  },
})



// WEBPACK FOOTER //
// ./src/formdefinitions/models/Form.js