import Form from 'formdefinitions/models/Form'

// A mixin for "form" and "publicForm" type Triggers
module.exports = {
  embeddings: {
    form: Form,
  },

  defaults: {
    form: {},
  },

  // override Activity#getBindables()
  getBindables: function() {
    var bindables = []
    var variables = this.get('form').get('fields').each(field => {
      bindables = bindables.concat(
        field.get('binding').get('variable').getBindables()
      )
    })
    return bindables
  },
}



// WEBPACK FOOTER //
// ./src/activities/models/mixins/FormTriggerMixin.js