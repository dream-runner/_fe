import _ from 'underscore'
import ProcessConstituentCollection from 'processes/collections/ProcessConstituentCollection'
import Binding from 'processes/models/Binding'

module.exports = ProcessConstituentCollection.extend(
  {
    constructor: function() {
      if (!this.staticType) {
        throw new Error(
          'Trying to instantiate a BindingCollection with unspecified staticType'
        )
      }
      this.model = Binding.extend({ staticType: this.staticType })
      return ProcessConstituentCollection.prototype.constructor.apply(
        this,
        arguments
      )
    },

    removeValue: function(value) {
      var item = this.findWithValue(value)
      this.remove(item)
    },

    findWithValue: function(value) {
      return this.find(item => {
        // findWhere wouldn't work here, since `value`s can also be referenced objects
        return item.get('value') === value
      })
    },

    contains: function(binding) {
      return binding.isStatic()
        ? !!this.findWithValue(binding.get('value'))
        : !!this.get(binding.id)
    },

    remove: function(bindings, options) {
      if (!_.isArray(bindings)) {
        bindings = [bindings]
      }

      // map static bindings (no ID) to the exact item with that value in the collection
      var bindings = _.map(
        bindings,
        binding => {
          return binding.isStatic()
            ? this.findWithValue(binding.get('value'))
            : binding
        },
        this
      )

      ProcessConstituentCollection.prototype.remove.apply(this, [
        bindings,
        options,
      ])
    },

    // When using the BindingCollection class, it should always be extended to overwrite the type property
    // to match the binding type required
    staticType: null,
  },
  {
    // static properties
    isCollection: true,
  }
)



// WEBPACK FOOTER //
// ./src/processes/collections/BindingCollection.js