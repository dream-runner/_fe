import { EventUtils } from 'commons-utils'
import { models as commonsModels } from 'commons'
const { BaseModel } = commonsModels
import _ from 'lodash'

import { VariableUtils } from '../utils'

var uniqueIdCounter = 0

/**
     * An abstract base class for all models that are saved as part of a process document
     */
module.exports = BaseModel.extend({
  autoAssignId: true,

  _process: null,

  constructor: function() {
    this.on(
      'attach',
      (model, process) => {
        if (this.autoAssignId && this.isNew()) {
          this._assignNewId()
        }
      },
      this
    )

    var onAttach = this.propagateToEmbeddings.bind(this, 'attach')
    var onDetach = this.propagateToEmbeddings.bind(this, 'detach')

    this.on('attach', onAttach)
    this.on('detach', onDetach)

    var result = BaseModel.prototype.constructor.apply(this, arguments)

    return result
  },

  propagateToEmbeddings: function(eventName, model, process, options) {
    _.each(
      _.keys(this.embeddings),
      key => {
        var value = this.get(key)
        if (value) {
          value._process = this._process
          value.trigger(eventName, value, process, options)
        }
      },
      this
    )
  },

  /**
         * Override set to trigger attach events on attached models after full set is completed
         */
  set: function(key, val, options) {
    var process = this.getProcess()

    if (process) {
      var eventListeners = []

      var triggerAttachAndDetach = (model, subconstituent, opts) => {
        var keyInParent = _.find(_.keys(model.embeddings), key => {
          return model.get(key) === subconstituent
        })
        var previous = model.previous(keyInParent)
        if (previous) {
          previous.trigger('detach', previous, process, opts)
        }

        if (subconstituent) {
          subconstituent.trigger('attach', subconstituent, process, opts)
        }
      }

      _.each(
        this.embeddings,
        (val, key) => {
          eventListeners.push(
            EventUtils.eachOnce(
              this,
              ['change:' + key, 'change'],
              triggerAttachAndDetach
            )
          )
        },
        this
      )
    }

    var result = BaseModel.prototype.set.apply(this, arguments)

    if (process) {
      _.invoke(eventListeners, 'off')
    }

    return result
  },

  // Returns the process instance containing this instance
  getProcess: function() {
    var parent = this.parent || this.collection
    return this._process || (parent && parent.getProcess())
    // apparently there are situations where this._process is not properly set, probably because of some silent set operations
    // therefore, fall back by looking for the process at the parent collection/model
  },

  // Always inline all embeddings
  inlineJSON: function() {
    return _.keys(this.embeddings)
  },

  // Override to proxy to the owning process object's #debouncedSave method
  save: function(key, val, options) {
    if (key == null || typeof key === 'object') {
      options = val
    }

    var process = this.getProcess()
    if (!process) {
      console.warn('Tried to save a detached process constituent')

      return
    }

    return process.debouncedSave()
  },

  // Override to not make a DELETE request, but save the whole process
  destroy: function(options) {
    var process = this.getProcess()
    this.stopListening()
    this.destroyed = true
    this.trigger('destroy', this, this.collection, options)
    if (process) {
      process.debouncedSave()
    }
  },

  // Override BaseModel's create to restore normal save behavior
  create: function() {
    throw new Error('#create is not supported for process constituent')
  },

  fetch: function() {
    throw new Error('Tried to fetch a process constituent.')
  },

  url: function() {
    throw new Error('Tried to get the URL of a process constituent.')
  },

  _createId: function() {
    return VariableUtils.provideId()
  },

  // Generates a unique ID for this model, constructed using:
  // - a 4-byte value representing the seconds since the Unix epoch
  // - a counter initialized with 0 when this module is loaded
  _assignNewId: function() {
    this.set(this.idAttribute || 'id', this._createId())
  },

  // Handle backbone-rel "embedded" event, which is triggered whenever this
  // model instance is assigned to an new parent model
  _handleEmbedded: function(model, parent, keyInParent) {},
})



// WEBPACK FOOTER //
// ./src/processes/models/ProcessConstituent.js