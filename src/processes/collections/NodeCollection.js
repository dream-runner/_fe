import _ from 'underscore'
import ProcessConstituentCollection from 'processes/collections/ProcessConstituentCollection'

var Node

module.exports = ProcessConstituentCollection.extend({
  constructor: function() {
    Node = require('processes/models/diagram/Node')

    this.model = Node

    ProcessConstituentCollection.prototype.constructor.apply(this, arguments)
  },

  load: function(children) {
    _.each(
      children,
      child => {
        var node = this.get(child.id)

        if (!node) {
          node = new Node({ id: `shape-${child.id}` })
          this.add(node)
        }

        node.load(child)
      },
      this
    )
  },
})



// WEBPACK FOOTER //
// ./src/processes/collections/NodeCollection.js