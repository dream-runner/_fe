import _ from 'underscore'
import { models as commonsModels } from 'commons'
const { BaseModel } = commonsModels
import { collections as commonsCollections } from 'commons'
const { BaseCollection } = commonsCollections
import Variable from 'processes/models/Variable'
import VariableType from 'processes/models/VariableType'
import ValueRelMixin from 'processes/models/ValueRelMixin'

var Binding = BaseModel.extend(
  _.extend({}, ValueRelMixin, {
    idAttribute: 'expression',

    references: {
      variable: Variable,
    },

    embeddings: {
      type: VariableType,
    },

    inlineJSON: ['type'],

    excludeJSON: ['variable', 'variableId'],

    // For statically typed bindings, extend this class overriding the `staticType` property
    // with the static VariableType.
    // Bindings that store a reference-type `value` MUST be statically typed, so that the correct
    // value embedding will be initialized.
    // Bindings that store an `expression` MAY be statically typed, which will cause that
    // expressions will be type-checked. An error will be thrown if an expression resolves to a
    // wrong type.
    staticType: null,

    isCollection: false,

    prepareForSet: function(attrs, options) {
      if (attrs.type) {
        if (!(attrs.type instanceof VariableType)) {
          attrs = _.extend({}, attrs, {
            type: new VariableType(attrs.type, options),
          })
        }
      }

      var type = this.staticType || attrs.type
      if (!type) {
        return
      }

      // A list binding accepts only single item static values,
      // but no static list values. This limitation makes sense as it
      // would be useless to specify multiple static values in one binding
      // while it is already possible to add each single static value as an
      // own binding item.
      var valueRelType = type.isList() ? type.get('elementType') : type

      this._initializeValueRel(valueRelType)
    },

    constructor: function() {
      this.on('change:variable', this._handleVariableChange, this)
      this.on('change:fields', this._updateExpression, this)

      var result = BaseModel.prototype.constructor.apply(this, arguments)

      this._handleExpressionChange()
      this.on('change:expression', this._handleExpressionChange, this)

      return result
    },

    // setStaticType: function(type) {
    //     this.staticType = type;
    //     this._initializeValueRel(this._getValueRelType());
    // },

    isStatic: function() {
      return !this.get('expression')
    },

    equals: function(binding) {
      return this.get('expression') && binding.get('expression')
        ? this.get('expression') === binding.get('expression')
        : _.isEqual(this.get('value'), binding.get('value'))
    },

    isEmpty: function() {
      return !!this.get('expression') && !!this.get('value')
    },

    toJSON: function() {
      var json = BaseModel.prototype.toJSON.apply(this, arguments)
      if (_.has(json, 'variableId')) {
        delete json.variableId
      }
      if (_.has(json, 'fields')) {
        delete json.fields
      }

      var staticType = this.getStaticType()
      if (staticType) {
        json.type = staticType.toJSON()
      }
      return json
    },

    set: function(key, val, options) {
      var attrs
      if (key === null) {
        return this
      }

      // Handle both `"key", value` and `{key: value}` -style arguments.
      if (typeof key === 'object') {
        attrs = key
        options = val
      } else {
        ;(attrs = {})[key] = val
      }

      options || (options = {})

      if (_.has(attrs, 'expression')) {
        attrs = _.omit(attrs, 'variable', 'variableId', 'fields')
      }

      return BaseModel.prototype.set.apply(this, [attrs, options])
    },

    copy: function() {
      return new Binding(this.toJSON())
    },

    _getVariableFromExpression: function() {
      var expr = this.get('expression')
      if (!expr) return null
      return new Variable({ id: expr.split('.')[0] })
    },

    _getFieldsFromExpression: function() {
      var expr = this.get('expression')
      if (!expr) return null
      return _.tail(expr.split('.'))
    },

    getName: function() {
      var variable = this.get('variable')
      if (!variable) return null
      var fields = this.get('fields')

      var components = [variable.getName()]
      var type = variable.get('type')
      var prop

      for (var i = 0, l = fields.length; i < l; ++i) {
        if (!type) {
          throw new Error(
            'Name not found for binding #' + this.get('expression')
          )
        }
        prop = type.getDescriptor().get('fields').get(fields[i])
        components.push(prop.get('name'))
        type = prop.get('type')
      }
      return components.join(' / ')
    },

    hasName: function() {
      if (!this.get('variable')) {
        return false
      }

      return this.get('variable').hasName()
    },

    getResolvedType: function() {
      var variable = this.get('variable')
      if (!variable) return null
      var fields = this.get('fields')

      var type = variable.get('type')
      if (fields) {
        for (var i = 0, l = fields.length; i < l; ++i) {
          if (!type) {
            throw new Error(
              'Type not found for binding #' + this.get('expression')
            )
          }
          var typeDescFields = type.getDescriptor().get('fields')
          type = typeDescFields && typeDescFields.get(fields[i]).get('type')
        }
      }
      return type
    },

    getStaticType: function() {
      if (!this.isStatic()) {
        return null
      }

      if (this.get('type')) {
        return this.get('type')
      }

      if (this.staticType) {
        var value = this.get('value')
        if (value && this.staticType.isList()) {
          // if the static type is list but the value is elemental, return the element type
          var isListValue = _.isArray(value) || value instanceof BaseCollection
          return isListValue
            ? this.staticType
            : this.staticType.get('elementType')
        }
        return this.staticType
      }

      return null
    },

    getType: function() {
      return this.getStaticType() || this.getResolvedType()
    },

    getIcon: function() {
      return this.isStatic() ? this.getType().getIcon() : 'icon-link'
    },

    _handleExpressionChange: function() {
      if (this.staticType) {
        this._validateConditionType()
      }

      var fields = this._getFieldsFromExpression()
      if (_.isEqual(fields, this.get('fields'))) {
        // do not update if the array are deep equal
        fields = this.get('fields')
      }

      this.set({
        variable: this._getVariableFromExpression(),
        fields: fields,
      })
    },

    _handleVariableChange: function() {
      if (!this.get('variable')) {
        this.set('expression', null)
        return
      }

      this._updateExpression()
    },

    _updateExpression: function() {
      var variable = this.get('variable')
      var fields = this.get('fields')
      if (!variable) {
        return
      }

      if (this.get('variable').isNew()) {
        this.get('variable').once(
          'attach',
          (model, process) => {
            if (model === this.get('variable')) {
              this._updateExpression()
            }
          },
          this
        )
      }

      this.set('expression', [variable.id].concat(fields || []).join('.'))
    },

    _validateConditionType: function() {
      var type = this.getResolvedType()
      if (type && !type.convertsTo(this.staticType)) {
        throw new Error(
          'Trying to set expression `' +
            this.get('expression') +
            '` resolving to ' +
            type.get('name') +
            ' type ' +
            'on a binding with static ' +
            this.staticType.get('name') +
            ' type.'
        )
      }
    },
  })
)

export default Binding



// WEBPACK FOOTER //
// ./src/processes/models/Binding.js