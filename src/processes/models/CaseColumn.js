import ProcessConstituent from 'processes/models/ProcessConstituent'
import Binding from 'processes/models/Binding'
import VariableType from 'processes/models/VariableType'

module.exports = ProcessConstituent.extend({
  embeddings: {
    binding: Binding,
    type: VariableType,
  },

  // exclude the variable reference in the binding from process variable reference collection
  // as we want to garbage collect variables also if there are still case columns for those variable
  skipVariableReferences: true,

  constructor: function() {
    this.on('change:binding', this._handleBindingChange, this)
    return ProcessConstituent.prototype.constructor.apply(this, arguments)
  },

  bindTo: function(bindable) {
    this.set('binding', bindable.copy())
  },

  _handleBindingChange: function() {
    if (this.previous('binding')) {
      this.previous('binding').off(
        'change:variable',
        this._handleBindingVariableChange,
        this
      )
    }

    if (this.get('binding')) {
      // store resolved type of binding to a temp property
      this._type = this.get('binding').getType()
      // listen for binding's var change to unset the binding when the variable is destroyed
      this.get('binding').on(
        'change:variable',
        this._handleBindingVariableChange,
        this
      )
    } else {
      // when the binding is unset, copy the stored type into the attributes
      this.set('type', this._type)
    }
  },

  _handleBindingVariableChange: function() {
    if (this.get('binding') && !this.get('binding').get('variable')) {
      this.set('binding', null)
    }
  },
})



// WEBPACK FOOTER //
// ./src/processes/models/CaseColumn.js