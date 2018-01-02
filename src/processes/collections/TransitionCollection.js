import ProcessConstituentCollection from 'processes/collections/ProcessConstituentCollection'
import Transition from 'processes/models/Transition'

module.exports = ProcessConstituentCollection.extend({
  model: Transition,

  initListeners: function() {
    this.each(transition => {
      transition.initListeners()
    })

    this.on('add', transition => {
      transition.initListeners()
    })
  },
})



// WEBPACK FOOTER //
// ./src/processes/collections/TransitionCollection.js