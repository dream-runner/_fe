import UniqueModel from 'uniquemodel'
import Activity from 'activities/models/Activity'

module.exports = UniqueModel(
  Activity.extend({
    defaults: {
      type: 'manual',
    },
  }),
  'Trigger'
)



// WEBPACK FOOTER //
// ./src/activities/models/Trigger.js