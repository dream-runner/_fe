import UniqueModel from 'uniquemodel'
import _ from 'underscore'
import i18n from 'i18n'

import ProcessConstituent from 'processes/models/ProcessConstituent'
import { collections as commonsCollections } from 'commons'
const { BaseCollection } = commonsCollections
import VariableType from 'processes/models/VariableType'
import ValueRelMixin from 'processes/models/ValueRelMixin'

/**
     * A process variable definition
     *
     */
module.exports = UniqueModel(
  ProcessConstituent.extend(
    _.extend({}, ValueRelMixin, {
      embeddings: {
        type: VariableType,
      },

      defaults: {
        name: '',
      },

      // Collects all process constituents that are referencing this variable and returns an
      // array of the form `[ {from: <referencing object>, key: <reference key> }, ... ]`
      getReferences: function() {
        var process = this.getProcess()
        if (!process) {
          throw new Error('Cannot collect references for a detached variable.')
        }

        var testWhetherToSkip = constituent => {
          return constituent.skipVariableReferences === true
        }

        // Deeply traverse all process embeddings and check each for references to this
        // variable
        var references = []
        process.forEachConstituent(
          constituent => {
            var keys, key, i, l

            if (
              constituent.referencesVariable &&
              constituent.referencesVariable(this)
            ) {
              references.push({ from: constituent })
            }

            // scan references of the constituent
            keys = _.keys(constituent.references)
            for (i = 0, l = keys.length; i < l; ++i) {
              key = keys[i]

              var referencee = constituent.get(key)
              if (referencee instanceof BaseCollection) {
                if (referencee.includes(this)) {
                  references.push({ from: constituent, key: key })
                }
              } else if (referencee === this) {
                references.push({ from: constituent, key: key })
              }
            }
          },
          this,
          testWhetherToSkip
        )

        return references
      },

      // Returns all bindables for this variables. These are all its unfolded fields.
      getBindables: function() {
        var Binding = require('processes/models/Binding').default
        var unfolded = this.get('type').unfoldProperties()
        return _.map(
          unfolded,
          u => {
            return new Binding({
              variable: this,
              fields: u.fields || undefined,
            })
          },
          this
        )
      },

      getIcon: function() {
        return this.get('type').getIcon()
      },

      getName: function() {
        if (this.id === 'case') {
          return i18n('Case')
        }

        if (this.get('name')) {
          return this.get('name')
        }

        if (this.get('type')) {
          return i18n('Unnamed __type__', {
            type: this.get('type').getName(),
          })
        }

        return i18n('Deleted field')
      },

      hasName: function() {
        return !!this.get('name')
      },

      hasDefaultValue: function() {
        return (
          !_.isUndefined(this.get('defaultValue')) &&
          !_.isNull(this.get('defaultValue'))
        )
      },

      canToggleList: function() {
        if (this.get('nonConfigurable')) {
          return false
        }

        var Binding = require('processes/models/Binding').default
        var Field = require('formdefinitions/models/Field')
        var Activity = require('activities/models/Activity')

        var isList = this.get('type').isList()
        return _.every(this.getReferences(), ({ from }) => {
          const parent = from.parent || from.collection.parent
          const keyInParent = from.parent
            ? from.keyInParent
            : from.collection.keyInParent

          if (!(from instanceof Binding)) return false
          if (!_.isEmpty(from.get('fields'))) return false

          if (parent instanceof Activity) {
            const inputDescriptor = parent
              .get('type')
              .get('inputDescriptors')
              .get(keyInParent)
            return (
              inputDescriptor &&
              (isList || inputDescriptor.get('type').isList())
            )
          }

          if (parent instanceof Field) {
            return true
          }

          return false
        })
      },

      convertToList: function() {
        if (this.get('type').isList()) {
          throw new Error(
            'Only atomic type variable can be converted to a list'
          )
        }

        var hasDefaultValue = this.hasDefaultValue() && this.get('defaultValue')
        var defaultValue
        if (hasDefaultValue) {
          // silently unset the default value
          // this is important for reference and object type variables
          // as otherwise backbone-rel would try to set the new value on the
          // existing relatedObject instance
          defaultValue = this.get('defaultValue')
          this.set('defaultValue', null, { silent: true })
        }
        this.set({
          type: new VariableType({
            name: 'list',
            elementType: this.get('type'),
          }),
          defaultValue: hasDefaultValue ? [defaultValue] : undefined,
        })
      },

      convertToElementType: function() {
        if (!this.get('type').isList()) {
          throw new Error(
            'Only list types variables can be converted to a their element type'
          )
        }

        var hasDefaultValue = this.hasDefaultValue()
        var defaultValue
        if (hasDefaultValue) {
          // silently unset the default value
          // this is important for reference and object type variables
          // as otherwise backbone-rel would try to set the new value on the
          // existing relatedObject instance
          defaultValue = this.get('defaultValue')
          if (!_.isArray(defaultValue)) {
            defaultValue = defaultValue.models
          }
          this.set('defaultValue', null, { silent: true })
        }
        this.set({
          type: this.get('type').get('elementType'),
          defaultValue: hasDefaultValue
            ? _.first(defaultValue) || null
            : undefined,
        })
      },
    })
  ),
  'Variable'
)



// WEBPACK FOOTER //
// ./src/processes/models/Variable.js