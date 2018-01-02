import i18n from 'i18n'
import { some, isString, isArray, isPlainObject } from 'lodash'
import ProcessConstituentCollection from 'processes/collections/ProcessConstituentCollection'
import Variable from 'processes/models/Variable'

const someDeep = (obj, predicate) =>
  some(obj, predicate) ||
  some(
    obj,
    item => (isArray(item) || isPlainObject(item)) && someDeep(item, predicate)
  )

var VariableCollection = ProcessConstituentCollection.extend({
  model: Variable,

  initialize: function() {
    // check for model === this to not handle each propagated item event
    this.on('save', model => model === this && this.removeUnused())
    this.on(
      'attach',
      (model, process) =>
        model === this && process.on('prepublish', this.removeUnused, this)
    )
    this.on(
      'detach',
      (model, process) =>
        model === this && process.off('prepublish', this.removeUnused, this)
    )

    // start fresh with the case variable
    this.ensureCaseVariable()

    return ProcessConstituentCollection.prototype.initialize.apply(
      this,
      arguments
    )
  },

  reset: function(models, options) {
    // on reset, make sure the case variable is included
    const allModels = _.union(
      [
        new Variable({
          id: 'case',
          name: i18n('Case'),
          type: { name: 'caseId' },
        }),
      ],
      models
    )
    return ProcessConstituentCollection.prototype.reset.call(
      this,
      allModels,
      options
    )
  },

  _removeModels: function(models, options) {
    // never remove case variable
    return ProcessConstituentCollection.prototype._removeModels.call(
      this,
      _.filter(models, model => model.id !== 'case'),
      options
    )
  },

  ensureCaseVariable: function() {
    let caseVariable = this.get('case')

    if (!caseVariable) {
      caseVariable = new Variable({
        name: i18n('Case'),
        type: { name: 'caseId' },
      })

      this.add(caseVariable)
    }
  },

  // Garbage collect variables with a ref count of 0
  removeUnused: function() {
    var process = this.getProcess()
    if (!process) {
      throw new Error(
        'Cannot garbage collect in a detached variable collection.'
      )
    }

    // var shouldSkip = constituent => {
    //     return constituent.skipVariableReferences === true;
    // };

    // Deeply traverse all process embeddings and check each for references to this
    // variable
    let unreferencedVariableIds = this.pluck('id')

    unreferencedVariableIds = _.without(unreferencedVariableIds, 'case')

    const { variables, caseColumns, ...restOfTheProcess } = process.toJSON()

    unreferencedVariableIds = _.filter(
      unreferencedVariableIds,
      id =>
        !someDeep(
          restOfTheProcess,
          value =>
            isString(value) &&
            (value === id || value.substring(0, id.length + 1) === id + '.')
        )
    )

    // process.forEachConstituent(constituent => {
    //     var keys, key, i, l;

    //     // scan references of the constituent
    //     keys = _.keys(constituent.references);
    //     for(i=0, l=keys.length; i<l; ++i) {
    //         key = keys[i];

    //         var referencee = constituent.get(key);
    //         if(referencee instanceof VariableCollection) {
    //             unreferencedVariableIds = _.difference(unreferencedVariableIds, referencee.pluck("id"));
    //         } else if(referencee instanceof Variable) {
    //             unreferencedVariableIds = _.without(unreferencedVariableIds, referencee.id);
    //         }
    //     }
    // }, this, shouldSkip);

    this.remove(unreferencedVariableIds)
  },

  toJSON: function() {
    // don't send the case variable to the server
    return _.filter(
      ProcessConstituentCollection.prototype.toJSON.apply(this, arguments),
      ({ id }) => id !== 'case'
    )
  },

  parse: function() {
    const result = ProcessConstituentCollection.prototype.parse.apply(
      this,
      arguments
    )
    return [
      {
        id: 'case',
        name: i18n('Case'),
        type: { name: 'caseId' },
      },
      ...result,
    ]
  },
})

module.exports = VariableCollection



// WEBPACK FOOTER //
// ./src/processes/collections/VariableCollection.js