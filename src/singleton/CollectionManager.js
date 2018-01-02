import _ from 'underscore'
import { utils } from 'commons'

var Queue = utils.HttpUtils.loadQueue()

class CollectionManager {
  constructor() {
    this.collections = {}
  }

  register(key, Collection, options = {}) {
    if (this.collections[key]) {
      return
    }

    var instance = new Collection(null, { reset: true, ...options })

    this.collections[key] = instance

    Queue.load(instance, options.params)
  }

  load(clb) {
    Queue.work(clb)
  }

  get(key) {
    return this.collections[key]
  }

  fetch(name, clb) {
    let { [key]: collection } = this.collections

    if (!collection) {
      _.defer(clb)

      return
    }

    collection.once('sync error', clb)
    collection.fetch()
  }

  reset() {
    _.each(this.collections, collection => collection.reset())
  }
}

export default new CollectionManager()



// WEBPACK FOOTER //
// ./src/singleton/CollectionManager.js