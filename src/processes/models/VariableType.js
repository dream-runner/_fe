import _ from 'underscore'
import i18n from 'i18n'

import { models as commonsModels } from 'commons'

const { BaseModel } = commonsModels

import __VariableTypeMixins__ from 'processes/models/mixins/__VariableTypeMixins__'
import { connectedFieldConfigs } from 'services/statics'

import baseConfigs from '../statics/baseConfigs'

var VariableType = BaseModel.extend({
  references: {
    // service: function() { return require('services/models/Service'); }
  },

  embeddings: {
    elementType: function() {
      return VariableType // used for "list" types
    },
  },

  inlineJSON: ['elementType'],

  partialAttributesCore: ['name'],

  prepareForSet: function(attrs) {
    if (attrs.name && __VariableTypeMixins__[attrs.name]) {
      this.mixin(__VariableTypeMixins__[attrs.name])
    }
  },

  copy: function() {
    return new VariableType(this.toJSON())
  },

  // Returns true if values of this type can be converted to otherType
  convertsTo: function(otherType) {
    if (this.isList() && !otherType.isList()) {
      return false
    }

    var elTypeName = this.isList()
      ? this.get('elementType').get('name')
      : this.get('name')

    if (otherType.isList()) {
      if (!otherType.get('elementType')) {
        // we can always convert to untyped lists
        return true
      }

      return elTypeName === otherType.get('elementType').get('name')
    }

    return elTypeName === otherType.get('name')
  },

  // Types do not have IDs, so Backbone's default isNew method would always return true
  //
  // TODO: consider moving this method override to a more general place to apply for all
  // embedded models, which do not get IDs assigned from the server
  isNew: function() {
    return !this.parent || this.parent.isNew()
  },

  getDescriptor: function() {
    // var variableTypeDescriptors = require('singleton/VariableTypeDescriptors');
    var VariableTypeDescriptor = require('processes/models/VariableTypeDescriptor')
    var descriptorId = _.compact([this.get('name'), this.get('id')]).join('_')

    return new VariableTypeDescriptor({ dynamicId: descriptorId })
    // return variableTypeDescriptors.get(descriptorId) ||
    //     variableTypeDescriptors.findWhere({ key: this.get("name"), id: this.get("id") }); // quick&dirty fix for situations in which the collection's _byId map is not properly built
  },

  // For the given value, returns an array of validation errors, or `false` if the value is valid
  getValueValidationErrors: function(value, isRequired) {
    var validator = this.getDescriptor().getValueValidator()
    if (!validator) {
      return false
    }

    return validator(value, this, isRequired)
  },

  isValidValue: function(value) {
    var errors = this.getValueValidationErrors(value)
    return !errors || _.isEmpty(errors)
  },

  isConnector: function() {
    if (this.isList()) {
      return this.get('elementType').isConnector()
    }

    return this.get('name') === 'connectorReference'
  },

  // returns true for all types for values that are serialized as primitive JSON attributes
  // (as opposed to references to other ojects or nested structures)
  isPrimitive: function() {
    return this.isList()
      ? this.get('elementType').isPrimitive()
      : !!this.getDescriptor().get('isPrimitive')
  },

  isConnected: function() {
    return !!this.getDescriptor().get('connectorId')
  },

  getReferenceModel: function() {
    var type = this.isList() ? this.get('elementType') : this
    return type.getDescriptor().get('referenceModel')
  },

  isBoolean: function() {
    return this.get('name') === 'boolean'
  },

  isList: function() {
    return this.get('name') === 'list'
  },

  // Returns an array of objects of the form { fields: <Array>, type: <VariableType> }
  // This function is used to calculate bindables for variables.
  unfoldProperties: function() {
    var unfoldRecursive = (type, path) => {
      if (type.isPrimitive()) {
        return [{ fields: path, type: type }]
      }

      // TODO: remove this as soon as the server supports field bindings for money field
      if (type.get('name') === 'money') {
        return [{ fields: path, type: type }]
      }

      var result = [{ fields: path, type: type }]

      var fields = type.getDescriptor().get('fields')
      if (fields) {
        fields.each(field => {
          var newPath = _.clone(path)
          newPath.push(field.get('key'))
          result = _.union(result, unfoldRecursive(field.get('type'), newPath))
        })
      }

      return result
    }

    return unfoldRecursive(this, [])
  },

  getIcon: function() {
    return this.isList()
      ? this.get('elementType').getDescriptor().getIcon()
      : this.getDescriptor().getIcon()
  },

  getName: function() {
    if (this.isList()) {
      var descriptor = this.get('elementType').getDescriptor()

      return i18n('List of __elementType__', {
        elementType: descriptor.get('namePlural') || descriptor.get('name'),
      })
    }

    return this.getDescriptor().get('name')
  },

  getConfigs: function() {
    if (this.isList()) {
      // for list types, return the configs applicable for the elementType
      return (
        this.get('elementType').getDescriptor().get('configs') || baseConfigs()
      )
    }

    return this.getDescriptor().get('configs') || baseConfigs()
  },

  isInPalette: function() {
    return !!this.getDescriptor().get('isInPalette')
  },
})

module.exports = VariableType



// WEBPACK FOOTER //
// ./src/processes/models/VariableType.js