import _ from 'underscore'
import ComplexValue from 'processes/models/ComplexValue'
import { collections as commonsCollections } from 'commons'
const { BaseCollection } = commonsCollections

module.exports = {
  _initializeValueRel: function(type, valueAttributeName) {
    valueAttributeName = valueAttributeName || 'value'
    this._valueReferenceAttributeNames =
      this._valueReferenceAttributeNames || []
    this._valueEmbeddingAttributeNames =
      this._valueEmbeddingAttributeNames || []

    // reset previous value relationships
    this._valueReferenceAttributeNames = _.without(
      this._valueReferenceAttributeNames,
      valueAttributeName
    )
    this._valueEmbeddingAttributeNames = _.without(
      this._valueEmbeddingAttributeNames,
      valueAttributeName
    )
    this.embeddings = _.omit(this.embeddings, valueAttributeName)
    this.references = _.omit(this.references, valueAttributeName)

    if (!type || type.isPrimitive() || type.isConnector()) {
      return
    }

    if (!this.autoFetchRelated) {
      this.autoFetchRelated = []
    }

    if (this.autoFetchRelated !== true) {
      this.autoFetchRelated = _.without(
        this.autoFetchRelated,
        valueAttributeName
      )
    }

    // determine the model class to use for the relationship
    // and the kind of the relationship (embeddings vs. references)
    var ElTypeModel = type.getReferenceModel() || ComplexValue
    var kindOfRel = !!type.getReferenceModel() ? 'references' : 'embeddings'

    var TypeModel = type.isList()
      ? BaseCollection.extend({ model: ElTypeModel })
      : ElTypeModel

    // setup the new value relationship
    this[kindOfRel][valueAttributeName] = TypeModel

    if (kindOfRel === 'embeddings') {
      // make sure the embedded value is inlined in the JSON
      this._valueEmbeddingAttributeNames.push(valueAttributeName)
      this._overrideInlineJSON()
    } else {
      // make sure the reference attribute has the right name
      this._valueReferenceAttributeNames.push(valueAttributeName)
      this._overrideReferenceAttributeName()

      if (this.autoFetchRelated !== true) {
        this.autoFetchRelated.push(valueAttributeName)
      }
    }
  },

  _overrideReferenceAttributeName: function() {
    if (!this._originalReferenceAttributeName) {
      this._originalReferenceAttributeName = this.referenceAttributeName
      this.referenceAttributeName = refKey => {
        if (_.includes(this._valueReferenceAttributeNames, refKey)) {
          return refKey
        }
        return this._originalReferenceAttributeName(refKey)
      }
    }
  },

  _overrideInlineJSON: function() {
    if (!this._originalInlineJSON) {
      this._originalInlineJSON = this.inlineJSON
      this.inlineJSON = () => {
        return _.result(this, '_originalInlineJSON').concat(
          this._valueEmbeddingAttributeNames
        )
      }
    }
  },
}



// WEBPACK FOOTER //
// ./src/processes/models/ValueRelMixin.js