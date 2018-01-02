import UniqueModel from 'uniquemodel'
import i18n from 'i18n'
import { models as commonsModels } from 'commons'
const { BaseModel } = commonsModels
import { collections as commonsCollections } from 'commons'
const { BaseCollection } = commonsCollections
import { StringUtils } from 'commons-utils'
import _ from 'lodash'

var ValueValidators = {
  choice: function(value, type) {
    if (value && !_.find(type.get('options'), { id: value })) {
      return [i18n('Please select one of the available options.')]
    }
  },

  link: function(value) {
    if (value && !StringUtils.validateUrl(value)) {
      return [i18n('Please enter a valid URL.')]
    }
  },

  emailAddress: function(value = '') {
    var i = value.indexOf('<')
    var j = value.indexOf('>')
    var email = i && j && j > i ? value.substring(i + 1, j) : value
    if (!StringUtils.validateEmail(email)) {
      return [i18n('Please enter a valid email address.')]
    }
  },

  money: function(value, type, isRequired) {
    if (
      isRequired &&
      (!_.isNumber(value.get('amount')) || _.isNaN(value.get('amount')))
    ) {
      return [i18n('This field is required.')]
    }
  },
}

var Property = BaseModel.extend({
  idAttribute: 'key',

  defaults: {
    name: '',
  },

  embeddings: {
    type: function() {
      return require('processes/models/VariableType')
    },
  },

  inlineJSON: ['type'],
})

var PropertyCollection = BaseCollection.extend({
  model: Property,
})

module.exports = UniqueModel(
  BaseModel.extend({
    idAttribute: 'dynamicId', // `dynamicId` is a dynamic attribute calculated in `parse` by concatenating `key` and `id`

    embeddings: {
      fields: PropertyCollection,
    },

    inlineJSON: ['fields'],

    getIcon: function() {
      return this.get('icon') || 'icon-cloud'
    },

    getValueValidator: function() {
      return ValueValidators[this.id]
    },

    toJSON: function() {
      var json = BaseModel.prototype.toJSON.apply(this, arguments)
      delete json.dynamicId
      return json
    },

    parse: function() {
      var attrs = BaseModel.prototype.parse.apply(this, arguments)
      attrs.dynamicId = _.compact([attrs.key, attrs.id]).join('_')
      return attrs
    },
  }),
  'VariableTypeDescriptor'
)



// WEBPACK FOOTER //
// ./src/processes/models/VariableTypeDescriptor.js