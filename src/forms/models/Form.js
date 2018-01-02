import { models as commonsModels } from 'commons'
import { isObject, reduce } from 'lodash'

import { listUtils } from '@signavio/effektif-commons/lib/utils'

const { BaseModel } = commonsModels
import FieldCollection from 'forms/collections/FieldCollection'

var Form = BaseModel.extend({
  defaults: {
    fields: [],
  },

  inlineJSON: ['fields'],

  initialize: function() {
    this._hasValidValues = true
  },

  getButtonsField: function() {
    return this.get('fields').find(field => {
      return field.asButtons
    })
  },

  /**
         * Collect a key value hash
         */
  getValues: function() {
    var values = {}
    this.get('fields').forEach(field => {
      values[field.key || field.id] = field.value
    })
    return values
  },

  /**
         * Set the field values according to the passed key value hash
         */
  setValues: function(values) {
    const fields = this.get('fields')

    this.set(
      'fields',
      reduce(
        fields,
        (result, field) => {
          const urlValue = values[field.key || field.id]

          return [
            ...result,

            urlValue && isObject(urlValue)
              ? {
                  ...field,
                  ...urlValue,
                }
              : {
                  ...field,
                  value: urlValue || field.value,
                },
          ]
        },
        []
      )
    )
  },

  /**
         * Validate form data
         */
  validateValues: function() {
    this._hasValidValues = true
    if (this.get('fields')) {
      this.get('fields').each(field => {
        this._hasValidValues = field.validateValue(true) && this._hasValidValues
      }, this)
    }
    this.trigger('validate', this, this._hasValidValues)
    return this._hasValidValues
  },

  hasValidValues: function() {
    return this._hasValidValues
  },

  clone: function() {
    return new Form({
      description: this.get('description'),
      fields: this.get('fields'),
    })
  },
})

module.exports = Form



// WEBPACK FOOTER //
// ./src/forms/models/Form.js