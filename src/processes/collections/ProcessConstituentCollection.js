import { collections as commonsCollections } from 'commons'
const { BaseCollection } = commonsCollections

/**
     * An abstract base class for all collections that are saved as part of a process document
     */
module.exports = BaseCollection.extend({
  _process: null,

  constructor: function() {
    this.on(
      'attach',
      (collection, process, options) => {
        this.each(item => {
          item._process = process
          item.trigger('attach', item, process, options)
        })

        this.on(
          'add',
          (model, collection, options) => {
            model._process = process
            model.trigger('attach', model, process, options)
          },
          this
        )

        this.on(
          'reset',
          (collection, options) => {
            _.each(options.previousModels, item => {
              item._process = null
              item.trigger('detach', item, process, options)
            })

            this.each(item => {
              item._process = process
              item.trigger('attach', item, process, options)
            })
          },
          this
        )

        this.on('remove', (model, collection, options) => {
          model._process = null
          model.trigger('detach', model, process, options)
        })
      },
      this
    )

    this.on('detach', (collection, process, options) => {
      this.each(item => {
        item._process = null
        item.trigger('detach', item, process, options)
      })
    })

    return BaseCollection.prototype.constructor.apply(this, arguments)
  },

  _onModelEvent: function(event) {
    if (event === 'attach' || event === 'detach') {
      return
    }
    BaseCollection.prototype._onModelEvent.apply(this, arguments)
  },

  // Returns the process instance containing this collection
  getProcess: function() {
    return this._process || (this.parent && this.parent.getProcess())
    // apparently there are situations where this._process is not properly set, probably because of some silent set operations
    // therefore, fall back by looking for the process at the parent
  },

  fetch: function() {
    throw new Error('Tried to fetch a process constituent collection.')
  },

  url: function() {
    throw new Error('Tried to get the URL of a process constituent collection.')
  },
})



// WEBPACK FOOTER //
// ./src/processes/collections/ProcessConstituentCollection.js