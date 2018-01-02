import i18n from 'i18n'
import _ from 'underscore'
import ProcessConstituent from 'processes/models/ProcessConstituent'
import Binding from 'processes/models/Binding'
import Field from 'forms/models/Field'
import VariableType from 'processes/models/VariableType'

module.exports = ProcessConstituent.extend({
  embeddings: {
    type: VariableType,
    binding: Binding,
  },

  inlineJSON: ['binding'],

  constructor: function() {
    this.on('change:readOnly', this._onReadOnlyChange, this)
    return ProcessConstituent.prototype.constructor.apply(this, arguments)
  },

  getType: function() {
    return this.get('binding')
      ? this.get('binding').getType()
      : this.get('type')
  },

  getName: function() {
    return (
      this.get('name') || (this.get('binding') && this.get('binding').getName())
    )
  },

  hasName: function() {
    return (
      this.get('name') || (this.get('binding') && this.get('binding').hasName())
    )
  },

  getDescription: function() {
    return (
      this.get('binding') &&
      this.get('binding').get('variable').get('description')
    )
  },

  _onReadOnlyChange: function() {
    // make sure to set required to false when switching to read-only
    if (this.get('readOnly') && this.get('required')) {
      this.set('required', false)
    }
  },

  bindTo: function(bindable) {
    this.set('binding', bindable.copy())
  },

  removeBinding: function() {
    this.set('binding', null)
  },

  // Returns a field instance based on this field definition
  instantiateField: function() {
    var isDeeplyBound =
      this.get('binding') && !_.isEmpty(this.get('binding').get('fields'))

    var type = this.getType().copy()
    if (type.get('name') === 'choice' && this.get('asButtons')) {
      this._setDefaultOptionLabels(type.get('options'))
    }

    return new Field({
      type: type,

      value: this.get('binding') && !isDeeplyBound
        ? this.get('binding').get('variable').get('defaultValue')
        : null,

      description: this.getDescription(),
      readOnly: this.get('readOnly') || isDeeplyBound,
      required: this.get('required'),

      asButtons: this.get('asButtons'),
    })
  },

  // for an "asButtons" choice fields, sets default labels for every option if the user did not set one
  _setDefaultOptionLabels: function(options) {
    //not working and not required anymore
    var process = this.getProcess()
    _.each(options, (val, key) => {
      if (val) return

      var target = process.get('transitions').get(key).get('to')
      options[key] = i18n('To __taskName__', { taskName: target.getName() })
    })
  },
})



// WEBPACK FOOTER //
// ./src/formdefinitions/models/Field.js