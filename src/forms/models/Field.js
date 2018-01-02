import i18n from 'i18n'
import _ from 'underscore'
import Effektif from 'singleton/Effektif'
import { models as commonsModels } from 'commons'
const { BaseModel } = commonsModels
import VariableType from 'processes/models/VariableType'
import ValueRelMixin from 'processes/models/ValueRelMixin'

module.exports = BaseModel.extend(
  _.extend({}, ValueRelMixin, {
    embeddings: {
      type: VariableType,
    },

    inlineJSON: ['type'],

    prepareForSet: function(attrs, options) {
      if (attrs.type) {
        if (!(attrs.type instanceof VariableType)) {
          attrs = _.extend({}, attrs, {
            type: new VariableType(attrs.type, options),
          })
        }

        this._initializeValueRel(attrs.type)
      }
    },

    initialize: function() {
      this.on(
        'change:value',
        () => {
          // while a field has an invalid value,
          // live update the valid indication
          if (!this.hasValidValue()) {
            this.validateValue()
          }
        },
        this
      )

      var result = BaseModel.prototype.initialize.apply(this, arguments)

      this._valueErrors = []

      return result
    },

    isSet: function() {
      return !_.isUndefined(this.get('value')) && !_.isNull(this.get('value'))
    },

    validateValue: function(fullFormValidation) {
      this._valueErrors = []

      if (this.get('readOnly')) {
        return true
      }

      if (
        fullFormValidation === true &&
        this.get('required') &&
        !this.get('readOnly') &&
        !this.hasValue()
      ) {
        this._valueErrors.push(i18n('This field is required.'))
      }

      if (this.get('value')) {
        var errors = this.get('type').getValueValidationErrors(
          this.get('value'),
          this.get('required')
        )
        if (errors) {
          this._valueErrors = _.union(this._valueErrors, errors)
        }
      }

      var isValid = this._valueErrors.length === 0
      this.trigger('validate', this, isValid)
      return isValid
    },

    hasValue: function() {
      var value = this.get('value')
      return !_.isUndefined(value) && !_.isNull(value)
    },

    hasValidValue: function() {
      return this._valueErrors.length === 0
    },

    getValueErrors: function() {
      return this._valueErrors
    },

    // For list type instances, this function returns a new Field instance that can be used
    // to take the value for a new item to be added to the list
    getNewItemType: function() {
      if (!this.get('type') || this.get('type').get('name') !== 'list') {
        throw new Error(
          'getNewItemField() is only applicable for list type fields'
        )
      }

      var elementType = this.get('type').get('elementType')

      // TODO: consider extracting the following type specific special handling to separate mixins

      // special handling for user list field:
      // only suggest users that are not already in the list
      if (elementType.get('name') === 'userId') {
        var candidates = elementType.getCandidatesExpanded()
        var currentItems = this.get('value') && this.get('value').models

        return new VariableType({
          name: 'userId',
          candidates: _.difference(candidates, currentItems || []),
        })
      }

      // special handling choice-list fields: exclude already added options from the list
      if (elementType.get('name') === 'choice') {
        return new VariableType({
          name: 'choice',
          options: _.filter(
            elementType.get('options'),
            opt => !_.includes(this.get('value'), opt.id)
          ),
        })
      }

      return new VariableType(elementType.toJSON())
    },
  })
)



// WEBPACK FOOTER //
// ./src/forms/models/Field.js