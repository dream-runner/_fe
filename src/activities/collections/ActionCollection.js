import ProcessConstituentCollection from 'processes/collections/ProcessConstituentCollection'
import Action from 'activities/models/Action'

module.exports = ProcessConstituentCollection.extend({
  model: Action,

  initListeners: function() {
    this.each(activity => {
      activity.initListeners()
    })

    this.on('add', activity => {
      activity.initListeners()
    })
  },
})



// WEBPACK FOOTER //
// ./src/activities/collections/ActionCollection.js