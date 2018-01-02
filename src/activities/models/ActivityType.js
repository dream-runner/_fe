import _ from 'underscore'
import UniqueModel from 'uniquemodel'
import iconCharMapping from '@signavio/effektif-commons/lib/font/signavio-icon-char-map.json'
import { models as commonsModels } from 'commons'
const { BaseModel } = commonsModels
import ParameterDescriptorCollection from 'activities/collections/ParameterDescriptorCollection'
import Binding from 'processes/models/Binding'
import Variable from 'processes/models/Variable'
import BindingCollection from 'processes/collections/BindingCollection'
import activityMixins from 'activities/models/mixins'
import ProcessConstituent from 'processes/models/ProcessConstituent'
import Form from 'forms/models/Form'

var Parameters = ProcessConstituent.extend({
  autoAssignId: false, // nested input and output models must not have IDs,
  referenceAttributeName: key => key, // save output variables' ID references using the parameter name without the default "Id" suffix
})

module.exports = UniqueModel(
  BaseModel.extend({
    idAttribute: 'id', // `id` is built by concatenating `key` and `descriptorId` (see `parse` function)

    embeddings: {
      inputDescriptors: ParameterDescriptorCollection,
      outputDescriptors: ParameterDescriptorCollection,
      configurationForm: Form,
    },

    defaults: {
      inputDescriptors: [],
      outputDescriptors: [],
    },

    getMixins: function() {
      var mixins = _.values(_.pick(activityMixins, this.get('mixins') || []))

      var inputBindingsMixins = this._getInputBindingsMixin()
      var outputVariablesMixins = this._getOutputVariablesMixin()

      if (this.get('isCore')) {
        // for core types the input and output bidings are set directly on the activity model

        if (inputBindingsMixins) mixins.push(inputBindingsMixins)
        if (outputVariablesMixins) mixins.push(outputVariablesMixins)
      } else {
        // for custom types the input and output bindings are set into the nested maps `inputs`
        // and `outputs`

        var mixin = {
          embeddings: {},
          defaults: {},
        }

        if (inputBindingsMixins) {
          mixin.embeddings.inputs = Parameters.extend(inputBindingsMixins)
          mixin.defaults.inputs = {}
        }
        if (outputVariablesMixins) {
          mixin.embeddings.outputs = Parameters.extend(outputVariablesMixins)
          mixin.defaults.outputs = {}
        }

        mixins.push(mixin)
      }

      return mixins
    },

    _getInputBindingsMixin: function() {
      var embeddings = {}
      var defaults = {}
      this.get('inputDescriptors').each(param => {
        embeddings[param.get('key')] = param.get('type').isList()
          ? BindingCollection.extend({ staticType: param.get('type') })
          : Binding.extend({ staticType: param.get('type') })
        if (param.get('type').isList()) {
          defaults[param.get('key')] = []
        }
      })
      return {
        embeddings: embeddings,
        defaults: defaults,
      }
    },

    _getOutputVariablesMixin: function() {
      if (this.get('outputDescriptors').length === 0) {
        // do not add a mixin if the activity does not produce outputs
        return
      }
      var references = {}
      this.get('outputDescriptors').each(param => {
        references[param.get('key')] = Variable
      })
      return {
        references: references,
      }
    },

    getService: function() {
      return this.collection.parent
    },

    getIcon: function(defaultIcon) {
      return (
        this.get('icon') ||
        (this.getService() && this.getService().get('icon')) ||
        defaultIcon ||
        'question'
      )
    },

    getIconChar: function() {
      var typeIcon = this.getIcon()
      if (!typeIcon) return ''
      var charCode = iconCharMapping[typeIcon]
      if (!charCode) return '\uFFFD' // replacement character used to replace an unknown or unrepresentable character

      return String.fromCharCode(charCode)
    },

    isFlowElement: function() {
      var service = this.getService()
      return service && service.get('key') === 'bpmn-flow'
    },

    toJSON: function() {
      var json = BaseModel.prototype.toJSON.apply(this, arguments)
      delete json.id
      return json
    },

    parse: function() {
      var attrs = BaseModel.prototype.parse.apply(this, arguments)
      attrs.id =
        _.compact([attrs.key, attrs.descriptorId]).join('_') || attrs.id
      return attrs
    },
  }),
  'ActivityType'
)



// WEBPACK FOOTER //
// ./src/activities/models/ActivityType.js