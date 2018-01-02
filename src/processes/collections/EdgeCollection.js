import ProcessConstituentCollection from 'processes/collections/ProcessConstituentCollection'
import Edge from 'processes/models/diagram/Edge'

module.exports = ProcessConstituentCollection.extend({
  model: Edge,

  init: function(transitions, canvas) {
    transitions.each(transition => {
      var edge = new Edge({ id: `shape-${transition.id}` })
      edge.init(transition, canvas)

      this.add(edge)
    }, this)
  },

  addConnection: function(transition, canvas) {
    this.init(new ProcessConstituentCollection([transition]), canvas)

    return this.last()
  },
})



// WEBPACK FOOTER //
// ./src/processes/collections/EdgeCollection.js